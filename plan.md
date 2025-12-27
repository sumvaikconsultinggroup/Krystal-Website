# Krystal Magic World — Architectural Luxury Website & Lead Engine (React + FastAPI + MongoDB)

## 1) Objectives (North Star)
- Craft a premium, minimal, editorial website that positions Krystal as a high-end architectural partner in Gurugram + Delhi NCR.
- Drive qualified leads via beautiful public pages and frictionless forms: Get Quote, Book Site Visit, WhatsApp.
- Build on React + FastAPI + MongoDB (current environment). TailwindCSS + Framer Motion for UI/motion; react-router-dom for routing; react-helmet-async for SEO.
- Prepare foundation for future Admin CMS (custom dashboard) without blocking public launch.

## 2) Architecture Snapshot
- Frontend: React (SPA), TypeScript-ready structure, TailwindCSS, Framer Motion, react-router-dom, react-helmet-async.
- Backend: FastAPI, MongoDB, Pydantic models; All API routes prefixed with /api. Bind 0.0.0.0:8001 (supervisor manages).
- Data: MongoDB collections (leads, pages, products, projects, blog, faqs, downloads, testimonials, cities, redirects). Seed initial content for public pages.
- Assets: Placeholder photography from Unsplash; Provided logo (cyan/blue “KRYSTAL uPVC Door & Windows”).
- SEO: JSON-LD (Organization, LocalBusiness, Product, FAQ, Breadcrumb), sitemap.xml from backend, robots.txt.
- CTAs: WhatsApp placeholder link, phone/email, multi-step forms stored as Leads with statuses.

## 3) Phases

### Phase 1 — Core POC (Decision: Skipped for this Level)
Rationale: This is Level 2 complexity (CRUD + forms, no external OAuth/payments). We proceed directly to app build. To de-risk, we do a mini validation while building:
- Health and DB connectivity check: /api/health returns mongo status; create Leads collection.
- Lead endpoints in isolation: POST /api/leads (Get Quote / Site Visit); GET /api/leads/:id to verify persistence.
- Static content seeding utilities for initial public content (not MOCKED, treated as initial data import).

User Stories (Sanity, to validate core during build):
1) As a visitor, I can submit the Get Quote form and receive a friendly success state.
2) As a visitor, I can submit the Book Site Visit form and see a confirmation.
3) As a visitor, clicking WhatsApp CTA opens a chat to the placeholder number.
4) As an operator, I can verify the new lead saved in MongoDB with status=New.
5) As a visitor, I see a healthy site (no console errors; /api/health OK).

Deliverables:
- /api/health, /api/leads (POST), basic schema; DB connected; initial content import scaffold.
- Minimal Home page with hero, CTA buttons wired to forms (non-final UI acceptable for validation only).

### Phase 2 — Full Public Website (Priority)
Goal: Deliver complete public marketing site with premium UX, lead flows, and SEO.

Frontend (Pages & Routes)
- Global: Mega menu + footer with structured links, sticky mobile CTA bar.
- Home: Full-bleed hero, trust strip, product gateways (Windows/Doors/Aluminium toggle), feature grid, Design Studio teaser, Process timeline, Projects carousel, Testimonials, FAQ preview, final CTA.
- Company: About, Infrastructure, Quality & Standards, Our Process, Careers.
- Products: Windows landing (Casement, Sliding, Tilt & Turn, Fixed, Top Hung, French, Bay toggle), Doors landing (Sliding, Casement, Bi-fold, Lift & Slide toggle), Aluminium (toggle section).
- Product Detail Template: Hero, use-cases, benefits, configurations, glass/hardware options, tech specs table, gallery, FAQs, related products.
- Design Studio: Colours & Finishes (filterable swatches), Glass Options, Hardware & Accessories, Inspirations gallery.
- Solutions: For Homeowners, For Architects & Designers, For Builders & Commercial.
- Projects: Listing with filters (city, product type, project type) + Case Study template.
- Resources: Blog listing + post template, FAQs/KB (search + categories), Downloads (PDFs).
- Partner With Us: Dealer/Channel Partner, Architect Program.
- Contact: Multi-step lead form, WhatsApp click, map embed, dynamic service coverage list.
- SEO Service Area: /upvc-windows-in-{city}, /upvc-doors-in-{city} (driven by Cities collection).

Frontend (Design System)
- Typography: Serif for headlines (e.g., Playfair/Libre Baskerville), modern sans for body (e.g., Inter). Stone/white/charcoal palette.
- Components: Buttons (primary/secondary/ghost), inputs/selects, multi-step form, cards (product/project/blog), accordion FAQ, tabs, CTA banner, logo strip.
- Motion: Gentle fade/slide on scroll, subtle parallax, micro-interactions (hover zoom 2–3%, underline reveal, button lift). No loud gradients/glows.

Backend (APIs)
- Leads: POST /api/leads (create), GET /api/leads/:id, GET /api/leads (list for future admin), PATCH /api/leads/:id (status updates reserved for Admin later), CSV export endpoint.
- Content Read APIs: GET endpoints for pages, products, product types, projects, blog/posts, faqs, downloads, testimonials, cities (public read-only for website). Seed initial documents.
- Cities: GET /api/cities; used to render SEO service area pages; return FAQs + project snippets per city when present.
- Redirects: GET for redirects (for future implementation).
- SEO: GET /api/sitemap.xml (generated), serve robots.txt; JSON-LD rendered on frontend.

Data Model (initial)
- Lead {name, phone, email, city, type: quote|site_visit, message, source, status, created_at}
- ProductType, Product, Project, BlogPost, FAQ, Download, Testimonial, City {name, slug, related data}
- GlobalSettings {logo, brand colors, typography, contacts, whatsapp_number}

SEO & Performance
- Per-route meta via react-helmet-async; OpenGraph + Twitter tags; canonical links.
- JSON-LD schemas: Organization + LocalBusiness (sitewide), Product (product pages), FAQ (FAQ blocks), Breadcrumb (content pages).
- Backend sitemap.xml aggregator for all dynamic routes (products, posts, cities). Cache + daily refresh.
- Image handling: responsive <img> with sizes, WebP preferred if available; tasteful lazy loading.

User Stories (UX-focused, at least 12)
1) As a visitor, I can discover products via the mega menu and reach a specific product detail in 2 clicks.
2) As a visitor, I can compare window types on the landing page and choose the right one by benefits.
3) As a visitor, I can browse Inspirations gallery and hover for a subtle zoom without jank.
4) As a visitor, I can filter Projects by city and product type to see relevant case studies.
5) As a visitor, I can read a blog post with clean typography and a sticky share/CTA.
6) As a visitor, I can expand FAQ accordions and see schema-valid FAQ content.
7) As a visitor, I can open a product’s specs table and download a brochure (PDF) from Downloads.
8) As a visitor, I can submit a multi-step Contact form (progress indicator) and get a clear success message.
9) As a visitor on mobile, I always have a sticky CTA bar to Get Quote or WhatsApp.
10) As a visitor, I can open a service-area page (/upvc-windows-in-gurugram) with localized FAQs/testimonials.
11) As a visitor, I can see trust badges and timeline of the process, conveying quality and reliability.
12) As an operator, I can export leads to CSV from the backend endpoint for offline processing.

Testing (Phase 2)
- Use testing_agent_v3 for end-to-end: routing, forms, API calls, image displays, loading/error states, SEO tags presence, sitemap reachability. Skip camera/drag-drop.

Deliverables (Phase 2)
- Fully styled public website with all pages/sections above; responsive; no console errors.
- Working lead flows: Get Quote, Site Visit, Contact (multi-step) saving to Mongo.
- WhatsApp CTA placeholders wired; phone/email click-to-call/mailto.
- SEO: Helmet tags, JSON-LD blocks, backend sitemap.xml + robots.txt.
- Initial seeded content in Mongo (not mocked—real seed scripts with proper fields and Unsplash placeholders).

## 4) Implementation Steps (Concise)
1) Backend scaffolding: models (Lead + content), /api/health, /api/leads (POST/GET), seeders; JSON serialization helpers.
2) Frontend base: Tailwind + Framer Motion setup; typography + palette; layout (Header/MegaMenu/Footer/StickyCTA).
3) Home page + CTAs hooked to lead modal/multi-step form.
4) Company, Products (landing + detail), Design Studio, Solutions, Projects (filters + detail), Resources (blog/faq/downloads), Partner, Contact.
5) SEO service-area dynamic routes; fetch city data + related FAQs/testimonials/projects.
6) SEO: react-helmet-async, JSON-LD utils, backend sitemap.xml + robots.txt.
7) Polish: animations, hover states, accessibility (ARIA, focus), performance pass.
8) Testing via testing_agent_v3; fix issues; retest until clean.

## 5) Next Actions (Immediately After Plan Approval)
- Generate design guidelines via design_agent and install dependencies (tailwindcss, framer-motion, react-helmet-async, react-router-dom).
- Implement backend Lead model + endpoints and seeders.
- Build Header/Mega Menu/Footer, Home hero, and lead forms; wire to /api/leads.
- Add initial content seeds for key pages and Unsplash images.

## 6) Success Criteria
- Pixel-perfect premium feel: editorial grid, restrained palette, large photography, gentle motion; no garish effects.
- All public pages implemented; navigation seamless; responsive; fast.
- Lead flows operational with visible confirmation and data persisted.
- WhatsApp CTA functional (placeholder number).
- SEO-ready: per-page meta, JSON-LD schemas, sitemap.xml reachable, canonical links.
- Zero critical issues in testing_agent_v3 report; minor issues fixed before delivery.

## 7) Backlog (Post-Launch / Phase 3+)
- Full Admin CMS: roles (Admin/Editor/Sales), visual page builder, media library, redirects manager, leads inbox UI.
- S3-compatible media storage + image optimization pipeline.
- Email notification rules for new leads; role-based dashboards.
