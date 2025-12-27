from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timezone
import json

from models import (
    Lead, LeadCreate, LeadUpdate,
    Product, Project, BlogPost, FAQ, Testimonial, City,
    ColorFinish, GlassOption, Hardware, Download, GlobalSettings
)
from seed_data import (
    ALL_PRODUCTS, PROJECTS, BLOG_POSTS, FAQS, TESTIMONIALS, CITIES,
    COLOR_FINISHES, GLASS_OPTIONS, HARDWARE_ITEMS, DOWNLOADS, GLOBAL_SETTINGS
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'krystal_db')]

# Create the main app
app = FastAPI(title="Krystal Magic World API", version="1.0.0")

# Create router with /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Serialization helper
def serialize_doc(doc: dict) -> dict:
    """Convert MongoDB document for JSON serialization"""
    if doc is None:
        return None
    result = dict(doc)
    if '_id' in result:
        del result['_id']
    for key, value in result.items():
        if isinstance(value, datetime):
            result[key] = value.isoformat()
    return result

# ===================== HEALTH & ROOT =====================
@api_router.get("/")
async def root():
    return {"message": "Krystal Magic World API", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    try:
        await db.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}

# ===================== LEADS =====================
@api_router.post("/leads", response_model=Lead)
async def create_lead(lead_data: LeadCreate):
    """Create a new lead from contact forms"""
    lead = Lead(**lead_data.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.leads.insert_one(doc)
    logger.info(f"New lead created: {lead.id} - {lead.lead_type}")
    return lead

@api_router.get("/leads")
async def get_leads(
    status: Optional[str] = None,
    lead_type: Optional[str] = None,
    limit: int = Query(default=100, le=500)
):
    """Get all leads with optional filters"""
    query = {}
    if status:
        query['status'] = status
    if lead_type:
        query['lead_type'] = lead_type
    
    cursor = db.leads.find(query, {"_id": 0}).sort("created_at", -1).limit(limit)
    leads = await cursor.to_list(length=limit)
    return [serialize_doc(lead) for lead in leads]

@api_router.get("/leads/{lead_id}")
async def get_lead(lead_id: str):
    """Get a single lead by ID"""
    lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return serialize_doc(lead)

@api_router.patch("/leads/{lead_id}")
async def update_lead(lead_id: str, update: LeadUpdate):
    """Update lead status"""
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    return {"message": "Lead updated", "id": lead_id}

# ===================== PRODUCTS =====================
@api_router.get("/products")
async def get_products(
    category: Optional[str] = None,
    product_type: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get all products with optional filters"""
    products = ALL_PRODUCTS
    
    if category:
        products = [p for p in products if p.category == category]
    if product_type:
        products = [p for p in products if p.product_type == product_type]
    if featured is not None:
        products = [p for p in products if p.is_featured == featured]
    
    return [p.model_dump() for p in sorted(products, key=lambda x: x.order)]

@api_router.get("/products/{slug}")
async def get_product(slug: str):
    """Get a single product by slug"""
    product = next((p for p in ALL_PRODUCTS if p.slug == slug), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product.model_dump()

# ===================== PROJECTS =====================
@api_router.get("/projects")
async def get_projects(
    city: Optional[str] = None,
    project_type: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get all projects with optional filters"""
    projects = PROJECTS
    
    if city:
        projects = [p for p in projects if p.city.lower() == city.lower()]
    if project_type:
        projects = [p for p in projects if p.project_type == project_type]
    if featured is not None:
        projects = [p for p in projects if p.is_featured == featured]
    
    return [p.model_dump() for p in projects]

@api_router.get("/projects/{slug}")
async def get_project(slug: str):
    """Get a single project by slug"""
    project = next((p for p in PROJECTS if p.slug == slug), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.model_dump()

# ===================== BLOG =====================
@api_router.get("/blog")
async def get_blog_posts(
    category: Optional[str] = None,
    limit: int = Query(default=10, le=50)
):
    """Get all blog posts"""
    posts = BLOG_POSTS
    
    if category:
        posts = [p for p in posts if p.category == category]
    
    return [p.model_dump() for p in posts[:limit]]

@api_router.get("/blog/{slug}")
async def get_blog_post(slug: str):
    """Get a single blog post by slug"""
    post = next((p for p in BLOG_POSTS if p.slug == slug), None)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post.model_dump()

# ===================== FAQS =====================
@api_router.get("/faqs")
async def get_faqs(
    category: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get all FAQs"""
    faqs = FAQS
    
    if category:
        faqs = [f for f in faqs if f.category == category]
    if featured is not None:
        faqs = [f for f in faqs if f.is_featured == featured]
    
    return [f.model_dump() for f in sorted(faqs, key=lambda x: x.order)]

# ===================== TESTIMONIALS =====================
@api_router.get("/testimonials")
async def get_testimonials(featured: Optional[bool] = None):
    """Get all testimonials"""
    testimonials = TESTIMONIALS
    
    if featured is not None:
        testimonials = [t for t in testimonials if t.is_featured == featured]
    
    return [t.model_dump() for t in testimonials]

# ===================== CITIES/SERVICE AREAS =====================
@api_router.get("/cities")
async def get_cities():
    """Get all service area cities"""
    return [c.model_dump() for c in CITIES if c.is_active]

@api_router.get("/cities/{slug}")
async def get_city(slug: str):
    """Get a single city by slug"""
    city = next((c for c in CITIES if c.slug == slug), None)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    
    # Get related data for this city
    city_data = city.model_dump()
    city_data['testimonials'] = [t.model_dump() for t in TESTIMONIALS if city.name in t.location]
    city_data['projects'] = [p.model_dump() for p in PROJECTS if p.city == city.name]
    city_data['faqs'] = [f.model_dump() for f in FAQS if f.is_featured][:5]
    
    return city_data

# ===================== DESIGN STUDIO =====================
@api_router.get("/design-studio/colors")
async def get_color_finishes(category: Optional[str] = None):
    """Get all color finishes"""
    colors = COLOR_FINISHES
    if category:
        colors = [c for c in colors if c.category == category]
    return [c.model_dump() for c in colors]

@api_router.get("/design-studio/glass")
async def get_glass_options():
    """Get all glass options"""
    return [g.model_dump() for g in GLASS_OPTIONS]

@api_router.get("/design-studio/hardware")
async def get_hardware(category: Optional[str] = None):
    """Get all hardware items"""
    hardware = HARDWARE_ITEMS
    if category:
        hardware = [h for h in hardware if h.category == category]
    return [h.model_dump() for h in hardware]

# ===================== DOWNLOADS =====================
@api_router.get("/downloads")
async def get_downloads(category: Optional[str] = None):
    """Get all downloadable resources"""
    downloads = DOWNLOADS
    if category:
        downloads = [d for d in downloads if d.category == category]
    return [d.model_dump() for d in downloads]

# ===================== SETTINGS =====================
@api_router.get("/settings")
async def get_settings():
    """Get global site settings"""
    return GLOBAL_SETTINGS.model_dump()

# ===================== SITEMAP =====================
@api_router.get("/sitemap.xml")
async def get_sitemap():
    """Generate XML sitemap for SEO"""
    base_url = "https://krystalmagicworld.com"
    
    urls = [
        (f"{base_url}/", "1.0", "weekly"),
        (f"{base_url}/about", "0.8", "monthly"),
        (f"{base_url}/products/windows", "0.9", "weekly"),
        (f"{base_url}/products/doors", "0.9", "weekly"),
        (f"{base_url}/design-studio", "0.8", "monthly"),
        (f"{base_url}/projects", "0.8", "weekly"),
        (f"{base_url}/blog", "0.8", "weekly"),
        (f"{base_url}/contact", "0.8", "monthly"),
    ]
    
    # Add product pages
    for product in ALL_PRODUCTS:
        urls.append((f"{base_url}/products/{product.slug}", "0.7", "monthly"))
    
    # Add project pages
    for project in PROJECTS:
        urls.append((f"{base_url}/projects/{project.slug}", "0.7", "monthly"))
    
    # Add blog posts
    for post in BLOG_POSTS:
        urls.append((f"{base_url}/blog/{post.slug}", "0.6", "monthly"))
    
    # Add city pages
    for city in CITIES:
        urls.append((f"{base_url}/upvc-windows-in-{city.slug}", "0.7", "monthly"))
        urls.append((f"{base_url}/upvc-doors-in-{city.slug}", "0.7", "monthly"))
    
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for url, priority, changefreq in urls:
        xml_content += f'''  <url>
    <loc>{url}</loc>
    <priority>{priority}</priority>
    <changefreq>{changefreq}</changefreq>
  </url>\n'''
    
    xml_content += '</urlset>'
    
    return Response(content=xml_content, media_type="application/xml")

# Include router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Krystal Magic World API starting...")
    # Create indexes
    await db.leads.create_index("id", unique=True)
    await db.leads.create_index("created_at")
    await db.leads.create_index("status")
    logger.info("Database indexes created")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
