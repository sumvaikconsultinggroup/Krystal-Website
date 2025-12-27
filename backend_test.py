import requests
import sys
from datetime import datetime
import json

class KrystalAPITester:
    def __init__(self, base_url="https://luxury-upvc.preview.emergentagent.com/api"):
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

    def test_product_endpoints(self):
        """Test product endpoints"""
        print("\n" + "="*60)
        print("TESTING PRODUCT ENDPOINTS")
        print("="*60)
        
        # Get all products
        success, products = self.run_test("Get All Products", "GET", "products", 200)
        
        if success and products:
            print(f"   Found {len(products)} products")
            
            # Test filters
            self.run_test("Get Windows Products", "GET", "products", 200, params={"category": "windows"})
            self.run_test("Get Doors Products", "GET", "products", 200, params={"category": "doors"})
            self.run_test("Get Featured Products", "GET", "products", 200, params={"featured": "true"})
            
            # Get specific product
            if products:
                product_slug = products[0].get('slug')
                if product_slug:
                    self.run_test(f"Get Product Detail ({product_slug})", "GET", f"products/{product_slug}", 200)

    def test_project_endpoints(self):
        """Test project endpoints"""
        print("\n" + "="*60)
        print("TESTING PROJECT ENDPOINTS")
        print("="*60)
        
        # Get all projects
        success, projects = self.run_test("Get All Projects", "GET", "projects", 200)
        
        if success and projects:
            print(f"   Found {len(projects)} projects")
            
            # Test filters
            self.run_test("Get Featured Projects", "GET", "projects", 200, params={"featured": "true"})
            
            # Get specific project
            if projects:
                project_slug = projects[0].get('slug')
                if project_slug:
                    self.run_test(f"Get Project Detail ({project_slug})", "GET", f"projects/{project_slug}", 200)

    def test_blog_endpoints(self):
        """Test blog endpoints"""
        print("\n" + "="*60)
        print("TESTING BLOG ENDPOINTS")
        print("="*60)
        
        # Get all blog posts
        success, posts = self.run_test("Get All Blog Posts", "GET", "blog", 200)
        
        if success and posts:
            print(f"   Found {len(posts)} blog posts")
            
            # Get specific blog post
            if posts:
                post_slug = posts[0].get('slug')
                if post_slug:
                    self.run_test(f"Get Blog Post Detail ({post_slug})", "GET", f"blog/{post_slug}", 200)

    def test_faq_endpoints(self):
        """Test FAQ endpoints"""
        print("\n" + "="*60)
        print("TESTING FAQ ENDPOINTS")
        print("="*60)
        
        # Get all FAQs
        success, faqs = self.run_test("Get All FAQs", "GET", "faqs", 200)
        
        if success and faqs:
            print(f"   Found {len(faqs)} FAQs")
            
            # Test filters
            self.run_test("Get Featured FAQs", "GET", "faqs", 200, params={"featured": "true"})

    def test_testimonial_endpoints(self):
        """Test testimonial endpoints"""
        print("\n" + "="*60)
        print("TESTING TESTIMONIAL ENDPOINTS")
        print("="*60)
        
        success, testimonials = self.run_test("Get All Testimonials", "GET", "testimonials", 200)
        
        if success and testimonials:
            print(f"   Found {len(testimonials)} testimonials")

    def test_city_endpoints(self):
        """Test city/service area endpoints"""
        print("\n" + "="*60)
        print("TESTING CITY/SERVICE AREA ENDPOINTS")
        print("="*60)
        
        # Get all cities
        success, cities = self.run_test("Get All Cities", "GET", "cities", 200)
        
        if success and cities:
            print(f"   Found {len(cities)} cities")
            
            # Get specific city
            if cities:
                city_slug = cities[0].get('slug')
                if city_slug:
                    self.run_test(f"Get City Detail ({city_slug})", "GET", f"cities/{city_slug}", 200)

    def test_design_studio_endpoints(self):
        """Test design studio endpoints"""
        print("\n" + "="*60)
        print("TESTING DESIGN STUDIO ENDPOINTS")
        print("="*60)
        
        self.run_test("Get Color Finishes", "GET", "design-studio/colors", 200)
        self.run_test("Get Glass Options", "GET", "design-studio/glass", 200)
        self.run_test("Get Hardware Items", "GET", "design-studio/hardware", 200)

    def test_other_endpoints(self):
        """Test other endpoints"""
        print("\n" + "="*60)
        print("TESTING OTHER ENDPOINTS")
        print("="*60)
        
        self.run_test("Get Downloads", "GET", "downloads", 200)
        self.run_test("Get Settings", "GET", "settings", 200)
        self.run_test("Get Sitemap", "GET", "sitemap.xml", 200)

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {len(self.failed_tests)}")
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
    print(f"Base URL: https://luxury-upvc.preview.emergentagent.com/api")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = KrystalAPITester()
    
    # Run all tests
    tester.test_health_endpoints()
    tester.test_lead_endpoints()
    tester.test_product_endpoints()
    tester.test_project_endpoints()
    tester.test_blog_endpoints()
    tester.test_faq_endpoints()
    tester.test_testimonial_endpoints()
    tester.test_city_endpoints()
    tester.test_design_studio_endpoints()
    tester.test_other_endpoints()
    
    # Print summary
    tester.print_summary()
    
    # Return exit code
    return 0 if len(tester.failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
