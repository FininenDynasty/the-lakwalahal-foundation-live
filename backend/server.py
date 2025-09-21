from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime
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
