from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import uuid

# Helper to generate IDs
def generate_id() -> str:
    return str(uuid.uuid4())

def now_utc() -> datetime:
    return datetime.now(timezone.utc)

# Lead Models
class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    city: Optional[str] = None
    lead_type: str = "quote"  # quote, site_visit, contact
    project_type: Optional[str] = None
    measurements: Optional[str] = None
    preferences: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = "website"

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    name: str
    phone: str
    email: Optional[str] = None
    city: Optional[str] = None
    lead_type: str = "quote"
    project_type: Optional[str] = None
    measurements: Optional[str] = None
    preferences: Optional[str] = None
    message: Optional[str] = None
    source: str = "website"
    status: str = "new"  # new, contacted, site_visit_scheduled, quoted, won, lost
    created_at: datetime = Field(default_factory=now_utc)
    updated_at: datetime = Field(default_factory=now_utc)

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

# Product Models
class ProductSpec(BaseModel):
    label: str
    value: str

class ProductVariant(BaseModel):
    name: str
    image: Optional[str] = None
    description: Optional[str] = None

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    slug: str
    name: str
    category: str  # windows, doors, aluminium
    product_type: str  # casement, sliding, etc.
    short_description: str
    description: str
    hero_image: str
    gallery: List[str] = []
    features: List[str] = []
    benefits: List[str] = []
    use_cases: List[str] = []
    specs: List[ProductSpec] = []
    variants: List[ProductVariant] = []
    related_products: List[str] = []
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    is_featured: bool = False
    order: int = 0
    created_at: datetime = Field(default_factory=now_utc)

# Project Models
class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    slug: str
    title: str
    location: str
    city: str
    project_type: str  # residential, commercial, villa
    product_types: List[str] = []
    hero_image: str
    gallery: List[str] = []
    challenge: str
    solution: str
    outcome: str
    testimonial: Optional[str] = None
    testimonial_author: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    is_featured: bool = False
    created_at: datetime = Field(default_factory=now_utc)

# Blog Models
class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    slug: str
    title: str
    excerpt: str
    content: str
    category: str  # acoustic, energy, maintenance, design
    tags: List[str] = []
    hero_image: str
    author: str = "Krystal Team"
    read_time: int = 5
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    is_published: bool = True
    created_at: datetime = Field(default_factory=now_utc)

# FAQ Models
class FAQ(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    question: str
    answer: str
    category: str  # general, windows, doors, installation, maintenance
    order: int = 0
    is_featured: bool = False

# Testimonial Models
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    name: str
    role: str  # homeowner, architect, builder
    company: Optional[str] = None
    location: str
    content: str
    rating: int = 5
    image: Optional[str] = None
    project_id: Optional[str] = None
    is_featured: bool = False

# City/Service Area Models
class City(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    name: str
    slug: str
    state: str = "Haryana"
    description: str
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    is_active: bool = True

# Design Studio Models
class ColorFinish(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    name: str
    code: str
    category: str  # laminate, wood_texture, solid
    image: str
    is_popular: bool = False

class GlassOption(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    name: str
    description: str
    benefits: List[str] = []
    image: str

class Hardware(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    name: str
    category: str  # handles, hinges, locks, accessories
    description: str
    image: str

# Download/Resource Models
class Download(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=generate_id)
    title: str
    description: str
    category: str  # brochure, care_guide, warranty, certification
    file_url: str
    file_type: str = "pdf"
    file_size: Optional[str] = None

# Global Settings
class ContactInfo(BaseModel):
    phone: str = "+91 98765 43210"
    whatsapp: str = "+91 98765 43210"
    email: str = "info@krystalmagicworld.com"
    address: str = "Sector 18, Gurugram, Haryana 122015"

class GlobalSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "global"
    company_name: str = "Krystal Magic World"
    tagline: str = "Architectural Luxury uPVC Doors & Windows"
    logo_url: str = "https://customer-assets.emergentagent.com/job_upvc-specialists/artifacts/2c6u16fh_logo%20png%20%284%29.jpg"
    established_year: int = 2012
    contact: ContactInfo = ContactInfo()
