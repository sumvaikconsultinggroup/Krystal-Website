import requests
import sys
from datetime import datetime
import json

class KrystalAPITester:
    def __init__(self, base_url="https://arch-windows.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.lead_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                self.failed_tests.append({
                    'name': name,
                    'endpoint': endpoint,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'endpoint': endpoint,
                'error': str(e)
            })
            return False, {}

    def test_health_endpoints(self):
        """Test health and root endpoints"""
        print("\n" + "="*60)
        print("TESTING HEALTH & ROOT ENDPOINTS")
        print("="*60)
        
        self.run_test("Root Endpoint", "GET", "", 200)
        self.run_test("Health Check", "GET", "health", 200)

    def test_lead_endpoints(self):
        """Test lead creation and retrieval"""
        print("\n" + "="*60)
        print("TESTING LEAD ENDPOINTS")
        print("="*60)
        
        # Create a lead
        lead_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "phone": "+919876543210",
            "email": "test@example.com",
            "city": "Gurugram",
            "lead_type": "quote",
            "project_type": "residential",
            "measurements": "5 windows, 2 doors",
            "preferences": "Noise reduction priority",
            "message": "Test lead from automated testing"
        }
        
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "leads",
            200,
            data=lead_data
        )
        
        if success and 'id' in response:
            self.lead_id = response['id']
            print(f"   Lead ID: {self.lead_id}")
            
            # Get all leads
            self.run_test("Get All Leads", "GET", "leads", 200)
            
            # Get specific lead
            self.run_test("Get Lead by ID", "GET", f"leads/{self.lead_id}", 200)
            
            # Update lead
            update_data = {"status": "contacted"}
            self.run_test("Update Lead", "PATCH", f"leads/{self.lead_id}", 200, data=update_data)

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {len(self.failed_tests)}")
        if self.tests_run > 0:
            print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"\n  - {test['name']}")
                print(f"    Endpoint: {test.get('endpoint', 'N/A')}")
                if 'error' in test:
                    print(f"    Error: {test['error']}")
                else:
                    print(f"    Expected: {test.get('expected')}, Got: {test.get('actual')}")
                    if 'response' in test:
                        print(f"    Response: {test['response']}")

def main():
    print("="*60)
    print("KRYSTAL MAGIC WORLD - API TESTING")
    print("="*60)
    print(f"Base URL: https://arch-windows.preview.emergentagent.com/api")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = KrystalAPITester()
    
    # Run all tests
    tester.test_health_endpoints()
    tester.test_lead_endpoints()
    
    # Print summary
    tester.print_summary()
    
    # Return exit code
    return 0 if len(tester.failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
