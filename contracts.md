# Lakwalahal Foundation - Backend API Contracts

## Overview
This document outlines the API contracts needed to integrate the frontend with backend functionality.

## Current Mock Data in `mock.js`
- Foundation information (hero, about, programs, team, etc.)
- Contact information
- Events data
- Impact statistics

## API Endpoints to Implement

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`
**Purpose:** Handle contact form submissions from the main contact section

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "subject": "string (required)",
  "message": "string (required)",
  "interest": "string (optional)" // support, volunteer, donate, partnership, other
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you within 24 hours.",
  "id": "contact_submission_id"
}
```

### 2. Newsletter Signup
**Endpoint:** `POST /api/newsletter`
**Purpose:** Handle newsletter signup from footer

**Request Body:**
```json
{
  "email": "string (required, email format)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for joining our sacred circle! You'll receive updates and blessings soon."
}
```

### 3. Foundation Information
**Endpoint:** `GET /api/foundation`
**Purpose:** Retrieve foundation data (replacing mock data)

**Response:**
```json
{
  "hero": { ... },
  "about": { ... },
  "programs": [ ... ],
  "team": [ ... ],
  "impact": { ... },
  "events": [ ... ],
  "contact": { ... }
}
```

## Database Models

### ContactSubmission
- id: ObjectId
- name: String (required)
- email: String (required, email validation)
- phone: String (optional)
- subject: String (required)
- message: String (required)
- interest: String (enum: support, volunteer, donate, partnership, other)
- status: String (enum: new, in_progress, resolved) - default: new
- created_at: DateTime
- updated_at: DateTime

### NewsletterSubscriber
- id: ObjectId
- email: String (required, unique, email validation)
- status: String (enum: active, unsubscribed) - default: active
- subscribed_at: DateTime
- unsubscribed_at: DateTime (optional)

### FoundationData (Optional - for dynamic content management)
- id: ObjectId
- section: String (hero, about, programs, etc.)
- data: Object (JSON data for each section)
- updated_at: DateTime

## Frontend Integration Changes

### Remove Mock Data Usage
1. Replace `foundationData` imports with API calls to `/api/foundation`
2. Update Contact component to call `/api/contact` instead of mock alert
3. Update Footer newsletter signup to call `/api/newsletter`

### Error Handling
- Add loading states for form submissions
- Add success/error toast notifications
- Handle network errors gracefully

### Form Validation
- Client-side validation already implemented
- Server-side validation will be added in backend

## Implementation Priority
1. Contact form submission endpoint (highest priority)
2. Newsletter signup endpoint
3. Foundation data endpoint (can be added later for content management)

## Security Considerations
- Input validation and sanitization
- Rate limiting for form submissions
- Email format validation
- CORS properly configured