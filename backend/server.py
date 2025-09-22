from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
import hashlib
import jwt
import csv
import io
from datetime import datetime, timedelta
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Lakwalahal Foundation API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()
SECRET_KEY = "lakwalahal_foundation_admin_secret_2024"
ALGORITHM = "HS256"

# Admin credentials - In production, store these securely
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD_HASH = hashlib.sha256("LakwalahalAdmin2024!".encode()).hexdigest()
ADMIN_PASSWORD_PLAIN = "LakwalahalAdmin2024!"  # Will show this to user


# Enums
class InterestType(str, Enum):
    support = "support"
    volunteer = "volunteer"
    donate = "donate"
    partnership = "partnership"
    other = "other"

class ContactStatus(str, Enum):
    new = "new"
    in_progress = "in_progress"
    resolved = "resolved"

class SubscriberStatus(str, Enum):
    active = "active"
    unsubscribed = "unsubscribed"


# Define Models
class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)
    interest: Optional[InterestType] = None

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    interest: Optional[str] = None
    status: ContactStatus = ContactStatus.new
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscriberCreate(BaseModel):
    email: EmailStr

class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    status: SubscriberStatus = SubscriberStatus.active
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    unsubscribed_at: Optional[datetime] = None

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    token: Optional[str] = None
    message: str

class ContactSubmissionUpdate(BaseModel):
    status: ContactStatus


# Admin Authentication Functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username != ADMIN_USERNAME:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return username
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Lakwalahal Foundation API is running"}

@api_router.post("/contact")
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Handle contact form submissions"""
    try:
        # Create contact submission object
        submission = ContactSubmission(**contact_data.dict())
        
        # Insert into database
        result = await db.contact_submissions.insert_one(submission.dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Thank you for your message! We will get back to you within 24 hours.",
                "id": submission.id
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact submission")
            
    except Exception as e:
        logging.error(f"Error saving contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/newsletter")
async def subscribe_newsletter(subscriber_data: NewsletterSubscriberCreate):
    """Handle newsletter subscriptions"""
    try:
        # Check if email already exists
        existing = await db.newsletter_subscribers.find_one({"email": subscriber_data.email})
        
        if existing:
            if existing.get("status") == "unsubscribed":
                # Reactivate subscription
                await db.newsletter_subscribers.update_one(
                    {"email": subscriber_data.email},
                    {
                        "$set": {
                            "status": "active",
                            "subscribed_at": datetime.utcnow(),
                            "unsubscribed_at": None
                        }
                    }
                )
                return {
                    "success": True,
                    "message": "Welcome back to our sacred circle! Your subscription has been reactivated."
                }
            else:
                return {
                    "success": True,
                    "message": "You're already part of our sacred circle! Thank you for your continued support."
                }
        
        # Create new subscription
        subscriber = NewsletterSubscriber(**subscriber_data.dict())
        result = await db.newsletter_subscribers.insert_one(subscriber.dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Thank you for joining our sacred circle! You'll receive updates and blessings soon."
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save newsletter subscription")
            
    except Exception as e:
        logging.error(f"Error saving newsletter subscription: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact-submissions")
async def get_contact_submissions(limit: int = 50, status: Optional[ContactStatus] = None):
    """Get contact submissions (admin endpoint)"""
    try:
        query = {}
        if status:
            query["status"] = status
            
        submissions = await db.contact_submissions.find(query).sort("created_at", -1).limit(limit).to_list(limit)
        
        # Convert ObjectId to string for JSON serialization
        for submission in submissions:
            if '_id' in submission:
                submission['_id'] = str(submission['_id'])
        
        return {
            "success": True,
            "submissions": submissions,
            "count": len(submissions)
        }
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/newsletter-subscribers")
async def get_newsletter_subscribers(limit: int = 100):
    """Get newsletter subscribers (admin endpoint)"""
    try:
        subscribers = await db.newsletter_subscribers.find({"status": "active"}).sort("subscribed_at", -1).limit(limit).to_list(limit)
        
        # Convert ObjectId to string for JSON serialization
        for subscriber in subscribers:
            if '_id' in subscriber:
                subscriber['_id'] = str(subscriber['_id'])
        
        return {
            "success": True,
            "subscribers": subscribers,
            "count": len(subscribers)
        }
    except Exception as e:
        logging.error(f"Error fetching newsletter subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Legacy endpoints (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Admin Authentication Endpoints
@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(login_data: AdminLogin):
    """Admin login endpoint"""
    password_hash = hashlib.sha256(login_data.password.encode()).hexdigest()
    
    if login_data.username == ADMIN_USERNAME and password_hash == ADMIN_PASSWORD_HASH:
        access_token = create_access_token(data={"sub": login_data.username})
        return AdminLoginResponse(
            success=True,
            token=access_token,
            message="Login successful"
        )
    else:
        return AdminLoginResponse(
            success=False,
            message="Invalid credentials"
        )

@api_router.get("/admin/verify")
async def verify_admin(current_user: str = Depends(verify_admin_token)):
    """Verify admin token"""
    return {"success": True, "user": current_user}

# Admin Dashboard Endpoints
@api_router.get("/admin/dashboard")
async def get_admin_dashboard(current_user: str = Depends(verify_admin_token)):
    """Get dashboard statistics"""
    try:
        # Get counts
        total_contacts = await db.contact_submissions.count_documents({})
        new_contacts = await db.contact_submissions.count_documents({"status": "new"})
        total_subscribers = await db.newsletter_subscribers.count_documents({"status": "active"})
        
        # Get recent contacts
        recent_contacts = await db.contact_submissions.find().sort("created_at", -1).limit(5).to_list(5)
        for contact in recent_contacts:
            if '_id' in contact:
                contact['_id'] = str(contact['_id'])
        
        # Get recent subscribers
        recent_subscribers = await db.newsletter_subscribers.find({"status": "active"}).sort("subscribed_at", -1).limit(5).to_list(5)
        for subscriber in recent_subscribers:
            if '_id' in subscriber:
                subscriber['_id'] = str(subscriber['_id'])
        
        return {
            "success": True,
            "stats": {
                "total_contacts": total_contacts,
                "new_contacts": new_contacts,
                "total_subscribers": total_subscribers
            },
            "recent_contacts": recent_contacts,
            "recent_subscribers": recent_subscribers
        }
    except Exception as e:
        logging.error(f"Error fetching dashboard data: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/admin/contact-submissions")
async def get_admin_contact_submissions(
    current_user: str = Depends(verify_admin_token),
    limit: int = 100,
    status: Optional[ContactStatus] = None,
    search: Optional[str] = None
):
    """Get contact submissions with filtering (admin endpoint)"""
    try:
        query = {}
        if status:
            query["status"] = status
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"subject": {"$regex": search, "$options": "i"}}
            ]
            
        submissions = await db.contact_submissions.find(query).sort("created_at", -1).limit(limit).to_list(limit)
        
        # Convert ObjectId to string for JSON serialization
        for submission in submissions:
            if '_id' in submission:
                submission['_id'] = str(submission['_id'])
        
        return {
            "success": True,
            "submissions": submissions,
            "count": len(submissions)
        }
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/contact-submissions/{submission_id}")
async def update_contact_submission(
    submission_id: str,
    update_data: ContactSubmissionUpdate,
    current_user: str = Depends(verify_admin_token)
):
    """Update contact submission status"""
    try:
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": update_data.status, "updated_at": datetime.utcnow()}}
        )
        
        if result.modified_count > 0:
            return {"success": True, "message": "Submission updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Submission not found")
    except Exception as e:
        logging.error(f"Error updating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/admin/newsletter-subscribers")
async def get_admin_newsletter_subscribers(
    current_user: str = Depends(verify_admin_token),
    limit: int = 100,
    search: Optional[str] = None
):
    """Get newsletter subscribers with filtering (admin endpoint)"""
    try:
        query = {"status": "active"}
        if search:
            query["email"] = {"$regex": search, "$options": "i"}
            
        subscribers = await db.newsletter_subscribers.find(query).sort("subscribed_at", -1).limit(limit).to_list(limit)
        
        # Convert ObjectId to string for JSON serialization
        for subscriber in subscribers:
            if '_id' in subscriber:
                subscriber['_id'] = str(subscriber['_id'])
        
        return {
            "success": True,
            "subscribers": subscribers,
            "count": len(subscribers)
        }
    except Exception as e:
        logging.error(f"Error fetching newsletter subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/admin/export/contacts")
async def export_contacts_csv(current_user: str = Depends(verify_admin_token)):
    """Export contact submissions to CSV"""
    try:
        submissions = await db.contact_submissions.find().sort("created_at", -1).to_list(1000)
        
        # Create CSV
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write header
        writer.writerow(['Name', 'Email', 'Phone', 'Subject', 'Message', 'Interest', 'Status', 'Created At'])
        
        # Write data
        for submission in submissions:
            writer.writerow([
                submission.get('name', ''),
                submission.get('email', ''),
                submission.get('phone', ''),
                submission.get('subject', ''),
                submission.get('message', ''),
                submission.get('interest', ''),
                submission.get('status', ''),
                submission.get('created_at', '')
            ])
        
        output.seek(0)
        
        return StreamingResponse(
            io.BytesIO(output.getvalue().encode()),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=contact_submissions.csv"}
        )
    except Exception as e:
        logging.error(f"Error exporting contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/admin/export/subscribers")
async def export_subscribers_csv(current_user: str = Depends(verify_admin_token)):
    """Export newsletter subscribers to CSV"""
    try:
        subscribers = await db.newsletter_subscribers.find({"status": "active"}).sort("subscribed_at", -1).to_list(1000)
        
        # Create CSV
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write header
        writer.writerow(['Email', 'Status', 'Subscribed At'])
        
        # Write data
        for subscriber in subscribers:
            writer.writerow([
                subscriber.get('email', ''),
                subscriber.get('status', ''),
                subscriber.get('subscribed_at', '')
            ])
        
        output.seek(0)
        
        return StreamingResponse(
            io.BytesIO(output.getvalue().encode()),
            media_type="text/csv",  
            headers={"Content-Disposition": "attachment; filename=newsletter_subscribers.csv"}
        )
    except Exception as e:
        logging.error(f"Error exporting subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
