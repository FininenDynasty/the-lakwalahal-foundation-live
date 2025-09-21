#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Lakwalahal Foundation Website
Tests all backend endpoints for functionality, validation, and error handling
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Get backend URL from environment
BACKEND_URL = "https://care-foundation.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = {
            "contact_api": {"passed": 0, "failed": 0, "errors": []},
            "newsletter_api": {"passed": 0, "failed": 0, "errors": []},
            "admin_endpoints": {"passed": 0, "failed": 0, "errors": []},
            "general": {"passed": 0, "failed": 0, "errors": []}
        }
        self.test_data = {
            "valid_emails": [
                "test.user@example.com",
                "foundation.supporter@gmail.com", 
                "volunteer.help@yahoo.com"
            ],
            "invalid_emails": [
                "invalid-email",
                "@example.com",
                "test@",
                "test..test@example.com"
            ]
        }

    def log_result(self, category, test_name, success, error_msg=None):
        """Log test results"""
        if success:
            self.results[category]["passed"] += 1
            print(f"✅ {test_name}")
        else:
            self.results[category]["failed"] += 1
            self.results[category]["errors"].append(f"{test_name}: {error_msg}")
            print(f"❌ {test_name}: {error_msg}")

    def test_api_root(self):
        """Test the root API endpoint"""
        print("\n🔍 Testing API Root Endpoint...")
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Lakwalahal Foundation API" in data["message"]:
                    self.log_result("general", "API Root Endpoint", True)
                else:
                    self.log_result("general", "API Root Endpoint", False, "Unexpected response format")
            else:
                self.log_result("general", "API Root Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("general", "API Root Endpoint", False, str(e))

    def test_contact_form_valid_submission(self):
        """Test valid contact form submissions"""
        print("\n🔍 Testing Contact Form - Valid Submissions...")
        
        test_cases = [
            {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "+1-555-0123",
                "subject": "General Inquiry",
                "message": "I would like to learn more about your foundation's work.",
                "interest": "support"
            },
            {
                "name": "Jane Smith",
                "email": "jane.smith@gmail.com",
                "subject": "Volunteer Opportunity",
                "message": "I'm interested in volunteering for your programs.",
                "interest": "volunteer"
            },
            {
                "name": "Bob Wilson",
                "email": "bob.wilson@yahoo.com",
                "phone": "555-9876",
                "subject": "Partnership Inquiry",
                "message": "Our organization would like to explore partnership opportunities.",
                "interest": "partnership"
            }
        ]

        for i, test_case in enumerate(test_cases):
            try:
                response = requests.post(f"{BACKEND_URL}/contact", json=test_case, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and "id" in data:
                        self.log_result("contact_api", f"Valid Contact Submission {i+1}", True)
                    else:
                        self.log_result("contact_api", f"Valid Contact Submission {i+1}", False, "Missing success or id in response")
                else:
                    self.log_result("contact_api", f"Valid Contact Submission {i+1}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("contact_api", f"Valid Contact Submission {i+1}", False, str(e))

    def test_contact_form_validation(self):
        """Test contact form validation"""
        print("\n🔍 Testing Contact Form - Validation...")
        
        invalid_cases = [
            {
                "data": {"email": "invalid-email", "subject": "Test", "message": "Test"},
                "test_name": "Invalid Email Format"
            },
            {
                "data": {"name": "", "email": "test@example.com", "subject": "Test", "message": "Test"},
                "test_name": "Empty Name"
            },
            {
                "data": {"name": "Test", "email": "test@example.com", "subject": "", "message": "Test"},
                "test_name": "Empty Subject"
            },
            {
                "data": {"name": "Test", "email": "test@example.com", "subject": "Test", "message": ""},
                "test_name": "Empty Message"
            },
            {
                "data": {"name": "A" * 101, "email": "test@example.com", "subject": "Test", "message": "Test"},
                "test_name": "Name Too Long"
            },
            {
                "data": {"name": "Test", "email": "test@example.com", "subject": "A" * 201, "message": "Test"},
                "test_name": "Subject Too Long"
            },
            {
                "data": {"name": "Test", "email": "test@example.com", "subject": "Test", "message": "A" * 2001},
                "test_name": "Message Too Long"
            }
        ]

        for case in invalid_cases:
            try:
                response = requests.post(f"{BACKEND_URL}/contact", json=case["data"], timeout=10)
                if response.status_code == 422:  # Validation error expected
                    self.log_result("contact_api", f"Contact Validation - {case['test_name']}", True)
                else:
                    self.log_result("contact_api", f"Contact Validation - {case['test_name']}", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result("contact_api", f"Contact Validation - {case['test_name']}", False, str(e))

    def test_newsletter_valid_subscription(self):
        """Test valid newsletter subscriptions"""
        print("\n🔍 Testing Newsletter - Valid Subscriptions...")
        
        for i, email in enumerate(self.test_data["valid_emails"]):
            try:
                response = requests.post(f"{BACKEND_URL}/newsletter", json={"email": email}, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        self.log_result("newsletter_api", f"Valid Newsletter Subscription {i+1}", True)
                    else:
                        self.log_result("newsletter_api", f"Valid Newsletter Subscription {i+1}", False, "Missing success in response")
                else:
                    self.log_result("newsletter_api", f"Valid Newsletter Subscription {i+1}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_result("newsletter_api", f"Valid Newsletter Subscription {i+1}", False, str(e))

    def test_newsletter_duplicate_handling(self):
        """Test newsletter duplicate email handling"""
        print("\n🔍 Testing Newsletter - Duplicate Handling...")
        
        test_email = "duplicate.test@example.com"
        
        # First subscription
        try:
            response1 = requests.post(f"{BACKEND_URL}/newsletter", json={"email": test_email}, timeout=10)
            if response1.status_code == 200:
                # Second subscription (duplicate)
                response2 = requests.post(f"{BACKEND_URL}/newsletter", json={"email": test_email}, timeout=10)
                if response2.status_code == 200:
                    data = response2.json()
                    if data.get("success") and "already part" in data.get("message", "").lower():
                        self.log_result("newsletter_api", "Newsletter Duplicate Handling", True)
                    else:
                        self.log_result("newsletter_api", "Newsletter Duplicate Handling", False, "Duplicate not handled properly")
                else:
                    self.log_result("newsletter_api", "Newsletter Duplicate Handling", False, f"Second request status: {response2.status_code}")
            else:
                self.log_result("newsletter_api", "Newsletter Duplicate Handling", False, f"First request status: {response1.status_code}")
        except Exception as e:
            self.log_result("newsletter_api", "Newsletter Duplicate Handling", False, str(e))

    def test_newsletter_validation(self):
        """Test newsletter email validation"""
        print("\n🔍 Testing Newsletter - Email Validation...")
        
        for i, invalid_email in enumerate(self.test_data["invalid_emails"]):
            try:
                response = requests.post(f"{BACKEND_URL}/newsletter", json={"email": invalid_email}, timeout=10)
                if response.status_code == 422:  # Validation error expected
                    self.log_result("newsletter_api", f"Newsletter Email Validation {i+1}", True)
                else:
                    self.log_result("newsletter_api", f"Newsletter Email Validation {i+1}", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result("newsletter_api", f"Newsletter Email Validation {i+1}", False, str(e))

    def test_admin_endpoints(self):
        """Test admin endpoints"""
        print("\n🔍 Testing Admin Endpoints...")
        
        # Test contact submissions endpoint
        try:
            response = requests.get(f"{BACKEND_URL}/contact-submissions", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "success" in data and "submissions" in data:
                    self.log_result("admin_endpoints", "Contact Submissions Endpoint", True)
                else:
                    self.log_result("admin_endpoints", "Contact Submissions Endpoint", False, "Unexpected response format")
            else:
                self.log_result("admin_endpoints", "Contact Submissions Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("admin_endpoints", "Contact Submissions Endpoint", False, str(e))

        # Test newsletter subscribers endpoint
        try:
            response = requests.get(f"{BACKEND_URL}/newsletter-subscribers", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "success" in data and "subscribers" in data:
                    self.log_result("admin_endpoints", "Newsletter Subscribers Endpoint", True)
                else:
                    self.log_result("admin_endpoints", "Newsletter Subscribers Endpoint", False, "Unexpected response format")
            else:
                self.log_result("admin_endpoints", "Newsletter Subscribers Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("admin_endpoints", "Newsletter Subscribers Endpoint", False, str(e))

    def test_cors_configuration(self):
        """Test CORS configuration"""
        print("\n🔍 Testing CORS Configuration...")
        
        try:
            # Test preflight request
            headers = {
                'Origin': 'https://care-foundation.preview.emergentagent.com',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            response = requests.options(f"{BACKEND_URL}/contact", headers=headers, timeout=10)
            
            if response.status_code in [200, 204]:
                cors_headers = response.headers
                if 'Access-Control-Allow-Origin' in cors_headers:
                    self.log_result("general", "CORS Configuration", True)
                else:
                    self.log_result("general", "CORS Configuration", False, "Missing CORS headers")
            else:
                self.log_result("general", "CORS Configuration", False, f"Preflight status: {response.status_code}")
        except Exception as e:
            self.log_result("general", "CORS Configuration", False, str(e))

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive Backend API Testing...")
        print(f"🎯 Testing Backend URL: {BACKEND_URL}")
        print("=" * 60)
        
        # Run all test categories
        self.test_api_root()
        self.test_contact_form_valid_submission()
        self.test_contact_form_validation()
        self.test_newsletter_valid_subscription()
        self.test_newsletter_duplicate_handling()
        self.test_newsletter_validation()
        self.test_admin_endpoints()
        self.test_cors_configuration()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.results.items():
            passed = results["passed"]
            failed = results["failed"]
            total_passed += passed
            total_failed += failed
            
            status = "✅ PASS" if failed == 0 else "❌ FAIL"
            print(f"{category.upper().replace('_', ' ')}: {status} ({passed} passed, {failed} failed)")
            
            if results["errors"]:
                for error in results["errors"]:
                    print(f"  ❌ {error}")
        
        print("-" * 60)
        overall_status = "✅ ALL TESTS PASSED" if total_failed == 0 else f"❌ {total_failed} TESTS FAILED"
        print(f"OVERALL: {overall_status} ({total_passed} passed, {total_failed} failed)")
        print("=" * 60)
        
        return total_failed == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)