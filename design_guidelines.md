{
  "brand": {
    "name": "Krystal Magic World",
    "tagline": "Architectural Luxury uPVC Doors & Windows",
    "established": 2012,
    "location": "Gurugram, Haryana (Delhi NCR)",
    "logo_url": "https://customer-assets.emergentagent.com/job_upvc-specialists/artifacts/2c6u16fh_logo%20png%20%284%29.jpg",
    "attributes": ["architectural", "luxury", "refined", "precise", "quiet confidence"]
  },
  "inspiration_references": {
    "notes": "Editorial grid, abundant white space, large photography, subtle motion, minimal iconography. Full-bleed project imagery with calm transitions and magazine-like rhythm.",
    "sources": [
      {
        "title": "Architectural web design – editorial, parallax, image-first",
        "url": "https://htmlburger.com/blog/architectural-web-design/"
      },
      {
        "title": "Architecture website examples – clean, minimal, portfolio focus",
        "url": "https://www.subframe.com/tips/architecture-website-design-examples"
      },
      {
        "title": "SiteInspire – Architecture category (grid and minimal patterns)",
        "url": "https://www.siteinspire.com/websites/category/architecture"
      },
      {
        "title": "Prominance uPVC – premium positioning cues (India)",
        "url": "https://prominance.com/upvc-windows-upvc-doors-india/"
      }
    ]
  },
  "design_personality": {
    "tone": "Architectural Luxury",
    "keywords": ["editorial", "restrained", "airy", "structured", "precise", "materiality"],
    "do": [
      "Use generous white space and thin dividers",
      "Employ full-bleed photography with minimal overlays",
      "Keep motion gentle: fade/slide with subtle parallax (2–6%)",
      "Use cyan as a crisp accent only; core UI in stone/white/charcoal",
      "Micro-interactions: 2–3% image zoom on hover, underline-reveal on links"
    ],
    "dont": [
      "No loud gradients, neon colors, heavy shadows or glows",
      "Avoid crowded cards and excessive borders",
      "No techy neural patterns; prioritize architectural calm"
    ]
  },
  "typography": {
    "fonts": {
      "display_serif": {
        "name": "Playfair Display",
        "usage": "H1–H2, large pull quotes, hero headlines"
      },
      "sans_body": {
        "name": "Inter",
        "usage": "Body, UI, navigation, small headings"
      }
    },
    "embedding": {
      "google_fonts": "<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">"
    },
    "tailwind_usage": {
      "h1": "font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight",
      "h2": "font-serif text-base md:text-lg leading-tight",
      "body": "font-sans text-sm md:text-base leading-7",
      "small": "font-sans text-xs text-muted-foreground"
    },
    "pairing_rules": [
      "Use Playfair Display only for major headlines or hero sublines.",
      "All UI labels, nav, buttons, and paragraphs in Inter for clarity.",
      "Letterspacing tight (-0.01em to -0.02em) for headlines; normal for body."
    ]
  },
  "color_system": {
    "tokens_note": "Define HSL tokens in :root and let Tailwind consume via CSS variables.",
    "palette": {
      "stone_white": "#F7F7F5",
      "porcelain": "#F3F4F2",
      "charcoal": "#222222",
      "graphite": "#2E2E2E",
      "soft_grey": "#E6E6E3",
      "krystal_cyan": "#00A8CC",
      "accent_teal": "#0EA5A7",
      "success": "#2E7D32",
      "warning": "#B26A00",
      "destructive": "#B3261E"
    },
    "css_custom_properties": "@layer base{ :root{ --background: 60 8% 97%; /* stone_white */ --foreground: 0 0% 13%; /* charcoal */ --card: 0 0% 100%; --card-foreground: 0 0% 13%; --popover: 0 0% 100%; --popover-foreground: 0 0% 13%; --primary: 0 0% 13%; /* charcoal for primary text/button default */ --primary-foreground: 0 0% 100%; --secondary: 150 6% 95%; /* porcelain */ --secondary-foreground: 0 0% 13%; --accent: 191 100% 41%; /* krystal_cyan for accents */ --accent-foreground: 0 0% 100%; --muted: 60 5% 91%; --muted-foreground: 0 0% 45%; --border: 60 6% 88%; --input: 60 6% 88%; --ring: 191 100% 41%; --destructive: 3 71% 42%; --destructive-foreground: 0 0% 98%; --success: 123 45% 34%; --warning: 38 100% 35%; --radius: 0.6rem; } .dark{ --background: 0 0% 3.9%; --foreground: 0 0% 98%; --card: 0 0% 7%; --card-foreground: 0 0% 98%; --popover: 0 0% 7%; --popover-foreground: 0 0% 98%; --primary: 0 0% 98%; --primary-foreground: 0 0% 9%; --secondary: 0 0% 14.9%; --secondary-foreground: 0 0% 98%; --muted: 0 0% 14.9%; --muted-foreground: 0 0% 63.9%; --accent: 191 100% 56%; --accent-foreground: 0 0% 12%; --border: 0 0% 14.9%; --input: 0 0% 14.9%; --ring: 191 100% 56%; --destructive: 3 71% 42%; --destructive-foreground: 0 0% 98%; --success: 123 45% 48%; --warning: 38 100% 50%; --radius: 0.6rem; } }",
    "usage": [
      "Backgrounds remain stone/porcelain; use charcoal for typography.",
      "Cyan used for accents: links hover, small dividers, subtle highlights, and CTA borders/fills.",
      "Avoid saturated gradients; if used, keep very light (e.g., porcelain → stone) and < 20% viewport."
    ]
  },
  "shadows_radius_textures": {
    "radius": {
      "xs": "0.25rem",
      "sm": "0.4rem",
      "md": "0.6rem",
      "lg": "0.8rem",
      "btn": "0.6rem"
    },
    "shadows": {
      "card": "0 1px 2px rgba(18,18,18,0.06), 0 6px 18px rgba(0,0,0,0.05)",
      "elevated": "0 10px 30px rgba(0,0,0,0.08)",
      "button": "0 6px 18px rgba(0,0,0,0.08)"
    },
    "textures": {
      "noise_css": "background-image: radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px); background-size: 4px 4px;"
    }
  },
  "layout_grid": {
    "container": "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8",
    "columns": {
      "mobile": 4,
      "tablet": 8,
      "desktop": 12
    },
    "grid_classes": {
      "two_col": "grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-10",
      "aside_main": "md:col-span-5 md:pr-8 lg:pr-12",
      "main": "md:col-span-7"
    },
    "dividers": "border-t border-border",
    "section_spacing": "py-12 sm:py-16 lg:py-24"
  },
  "buttons": {
    "style_family": "Luxury / Elegant",
    "variants": [
      {
        "name": "primary",
        "base_classes": "data-[testid]-placeholder bg-primary text-primary-foreground hover:bg-primary/90 shadow",
        "notes": "Default charcoal fill for strong contrast; use for primary actions like Get Quote"
      },
      {
        "name": "accent",
        "base_classes": "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]/90 shadow",
        "notes": "Cyan accent when emphasizing brand actions like Book Site Visit"
      },
      {
        "name": "ghost",
        "base_classes": "border border-border bg-transparent hover:bg-secondary text-foreground",
        "notes": "For secondary actions; minimal footprint"
      }
    ],
    "sizes": {
      "sm": "h-9 px-4 text-sm",
      "md": "h-11 px-6 text-sm",
      "lg": "h-12 px-7 text-base"
    },
    "motion": "transition-colors duration-200 ease-out will-change:transform",
    "focus": "outline-none ring-1 ring-[hsl(var(--ring))] ring-offset-2 ring-offset-background"
  },
  "components": {
    "mega_menu": {
      "description": "Architectural mega menu with split columns, thin dividers, subtle fade/slide",
      "base": "Use ./components/ui/navigation-menu for desktop; ./components/ui/sheet for mobile drawer",
      "layout": [
        "Col 1: Products (Windows: Casement, Sliding, Tilt & Turn; Doors: Slide & Fold, Lift & Slide)",
        "Col 2: Design Studio (Colours & Finishes, Glass Options, Hardware)",
        "Col 3: Projects (Residential, Villas, Commercial) + Resources (Blog, FAQs, Downloads)",
        "Col 4: CTA block with Get Quote, Book Site Visit, WhatsApp"
      ],
      "micro_interactions": "Hover underline reveal on links; parent category slight 1px bottom border grow on hover",
      "data_testids": ["nav-products-link", "nav-design-studio-link", "nav-projects-link", "nav-resources-link", "nav-cta-get-quote-button"]
    },
    "hero_section": {
      "description": "Full-bleed hero with editorial copy, minimal overlay, cyan accent underline",
      "tailwind": "relative overflow-hidden bg-white",
      "motion": "Background image parallax translate-y-[2%_to_6%] on scroll; content fade/slide up 20px",
      "cta_group": "Use Button from ./components/ui/button as primary + accent",
      "example_markup": "<section class=\"relative\" data-testid=\"home-hero\"> <img src=\"/hero.jpg\" alt=\"uPVC facade\" class=\"absolute inset-0 h-full w-full object-cover\" /> <div class=\"relative z-10 container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-24\"> <h1 class=\"font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1]\">Quiet luxury in every frame.</h1> <p class=\"mt-6 max-w-xl text-sm md:text-base text-muted-foreground\">Engineered uPVC doors & windows since 2012 for Delhi NCR’s finest homes.</p> <div class=\"mt-8 flex flex-wrap gap-3\"> <button class=\"btn-primary\" data-testid=\"get-quote-button\">Get Quote</button> <button class=\"btn-accent\" data-testid=\"book-site-visit-button\">Book Site Visit</button> </div> </div> </section>"
    },
    "trust_strip": {
      "description": "Row of badges: Years, Warranty, Certifications, Noise/Heat metrics",
      "base": "Use ./components/ui/tooltip for metric explanations",
      "layout": "grid grid-cols-2 sm:grid-cols-4 gap-6 items-center text-center py-10 border-t border-b",
      "data_testids": ["trust-years", "trust-warranty", "trust-certifications", "trust-metrics"]
    },
    "product_card": {
      "base": "Use ./components/ui/card",
      "image_ratio": "./components/ui/aspect-ratio",
      "hover": "scale-105 image zoom (2–3%), border darken 2%",
      "tailwind": "group rounded-lg border bg-card hover:shadow transition-colors",
      "data_testids": ["product-card", "product-card-title", "product-card-cta"]
    },
    "project_card": {
      "base": "Use ./components/ui/card + ./components/ui/carousel for galleries",
      "tailwind": "rounded-lg overflow-hidden bg-card border hover:shadow",
      "micro_interactions": "Image zoom 2% + caption slide-up",
      "data_testids": ["project-card", "project-location", "project-read-case-study-link"]
    },
    "blog_card": {
      "base": "./components/ui/card",
      "tailwind": "rounded-lg bg-card border hover:bg-secondary transition-colors",
      "data_testids": ["blog-card", "blog-card-title", "blog-card-read-button"]
    },
    "accordion_faq": {
      "base": "./components/ui/accordion",
      "usage": "Resources > FAQ and Home FAQ",
      "data_testids": ["faq-accordion", "faq-item"]
    },
    "tabs": {
      "base": "./components/ui/tabs",
      "usage": "Design Studio (Colours, Glass, Hardware)",
      "data_testids": ["design-studio-tabs"]
    },
    "multi_step_form": {
      "base": "./components/ui/form, ./components/ui/input, ./components/ui/select, ./components/ui/radio-group, ./components/ui/textarea, ./components/ui/progress",
      "pattern": "3–4 steps: Project Type → Measurements → Preferences → Contact",
      "motion": "Step transition fade/slide-left 24px",
      "data_testids": ["lead-form", "lead-form-next-button", "lead-form-prev-button", "lead-form-submit-button"]
    },
    "sticky_mobile_cta": {
      "description": "Fixed bar with 3 actions: Get Quote, WhatsApp, Call",
      "tailwind": "fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t shadow-md md:hidden",
      "data_testids": ["sticky-cta-bar", "sticky-cta-quote-button", "sticky-cta-whatsapp-link", "sticky-cta-call-link"]
    },
    "footer": {
      "base": "./components/ui/separator for thin lines",
      "layout": "grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 pb-16 border-t",
      "notes": "Structured links, address, contact, quick CTAs",
      "data_testids": ["footer-links", "footer-contact", "footer-cta"]
    }
  },
  "pages": {
    "home": [
      "Hero (full-bleed) with 2 CTAs",
      "Trust strip (metrics/certs)",
      "Product gateways (Windows/Doors) in two-column editorial grid",
      "Feature grid (Energy, Acoustic, Weather, Security) with minimal icons",
      "Process timeline (1–4) using ./components/ui/steps or ./separator + cards",
      "Testimonials carousel (./components/ui/carousel + ./components/ui/avatar)",
      "FAQ accordion",
      "CTA banner"
    ],
    "about": [
      "Brand narrative with editorial imagery",
      "Milestones since 2012 (./components/ui/timeline pattern using separators)",
      "Manufacturing & QC credentials",
      "Leadership quotes (Playfair Display)"
    ],
    "products": [
      "Windows/Doors landing with category filters (./components/ui/tabs)",
      "Product detail template: hero image, specs table (./components/ui/table), finishes tabs, CTA"
    ],
    "design_studio": [
      "Tabs: Colours & Finishes, Glass, Hardware",
      "Swatch grid (./components/ui/tooltip for labels)",
      "Guidance content blocks with imagery"
    ],
    "projects": [
      "Case studies listing grid (./components/ui/card)",
      "Detail page: hero carousel, challenge/solution/outcome blocks, testimonial, gallery"
    ],
    "resources": [
      "Blog, FAQs, Downloads (brochure) with ./components/ui/accordion and ./components/ui/card"
    ],
    "contact": [
      "Multi-step lead form with progress",
      "Contact info, map embed, WhatsApp CTA"
    ]
  },
  "motion_micro_interactions": {
    "libraries": ["framer-motion"],
    "install": "npm i framer-motion",
    "principles": [
      "Entrance: fade-up 20px, duration 420ms, ease-out",
      "Hover: image zoom 1.02–1.03, shadow increase subtly",
      "Parallax: translate-y 2–6% for hero media only",
      "Page transitions: cross-fade between routes 200–300ms"
    ],
    "code_snippets_js": {
      "fade_in_on_view": "import { motion } from 'framer-motion'; export default function Section({children}){ return (<motion.section initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{ once:true, amount:0.3 }} transition={{duration:0.42, ease:'easeOut'}}>{children}</motion.section>); }",
      "parallax_basic": "import { useScroll, useTransform, motion } from 'framer-motion'; import { useRef } from 'react'; export function ParallaxHero({src, alt}){ const ref = useRef(null); const {scrollYProgress} = useScroll({ target: ref, offset: ['start start','end start'] }); const y = useTransform(scrollYProgress, [0,1],[0, -40]); return (<div ref={ref} className=\"relative h-[70vh] overflow-hidden\"><motion.img style={{y}} src={src} alt={alt} className=\"absolute inset-0 h-full w-full object-cover\" /></div>); }"
    }
  },
  "accessibility": {
    "contrast": "Maintain WCAG AA: charcoal text on stone backgrounds; cyan accent only where text contrast >= 4.5:1",
    "focus": "Visible focus rings using --ring; ensure all interactive elements have focus states",
    "reduced_motion": "Respect prefers-reduced-motion: disable parallax and reduce durations",
    "keyboard_nav": "All menus, tabs, accordion keyboard operable",
    "aria": "Use aria-expanded, aria-controls for accordion/tabs; alt text for all imagery"
  },
  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include a data-testid attribute (kebab-case, role-oriented).",
    "examples": [
      "data-testid=\"get-quote-button\"",
      "data-testid=\"nav-products-link\"",
      "data-testid=\"lead-form-submit-button\"",
      "data-testid=\"project-card\"",
      "data-testid=\"faq-accordion\""
    ]
  },
  "images_urls": [
    {
      "url": "https://customer-assets.emergentagent.com/job_upvc-specialists/artifacts/2c6u16fh_logo%20png%20%284%29.jpg",
      "category": "brand",
      "description": "Official logo for header and footer"
    },
    {
      "url": "https://images.unsplash.com/photo-1756666915088-002ef950502c?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "hero",
      "description": "Modern white building with large glass windows"
    },
    {
      "url": "https://images.unsplash.com/photo-1712799430351-8baa17927177?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "gateway",
      "description": "Contemporary villa with expansive glazing"
    },
    {
      "url": "https://images.unsplash.com/photo-1716124095942-c6ff3ad0541c?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "product_detail",
      "description": "Close-up glass corner window against sky"
    },
    {
      "url": "https://images.unsplash.com/photo-1695209495576-db2a4788c802?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "design_studio",
      "description": "Geometric facade pattern with windows"
    },
    {
      "url": "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg",
      "category": "projects-listing",
      "description": "Premium residence with landscape lawn"
    },
    {
      "url": "https://images.pexels.com/photos/8134820/pexels-photo-8134820.jpeg",
      "category": "case-study-detail",
      "description": "Modern bungalow exterior"
    }
  ],
  "component_path": {
    "button": "./components/ui/button",
    "card": "./components/ui/card",
    "accordion": "./components/ui/accordion",
    "tabs": "./components/ui/tabs",
    "carousel": "./components/ui/carousel",
    "navigation_menu": "./components/ui/navigation-menu",
    "sheet": "./components/ui/sheet",
    "tooltip": "./components/ui/tooltip",
    "table": "./components/ui/table",
    "form": "./components/ui/form",
    "input": "./components/ui/input",
    "select": "./components/ui/select",
    "radio_group": "./components/ui/radio-group",
    "textarea": "./components/ui/textarea",
    "progress": "./components/ui/progress",
    "avatar": "./components/ui/avatar",
    "separator": "./components/ui/separator",
    "calendar": "./components/ui/calendar",
    "sonner_toast": "./components/ui/sonner"
  },
  "page_scaffolds_js": {
    "mega_menu_js": "import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from './components/ui/navigation-menu'; export default function MegaMenu(){ return (<nav className=\"hidden md:block\" data-testid=\"site-mega-menu\"><NavigationMenu><NavigationMenuList> <NavigationMenuItem> <NavigationMenuTrigger data-testid=\"nav-products-link\">Products</NavigationMenuTrigger> <NavigationMenuContent><div className=\"grid grid-cols-2 gap-8 p-6 w-[560px]\"> <ul className=\"space-y-2\"><li><a href=\"/products/windows\" className=\"hover:underline\">Windows</a></li><li><a href=\"/products/doors\" className=\"hover:underline\">Doors</a></li></ul> <ul className=\"space-y-2\"><li><a href=\"/design-studio\" className=\"hover:underline\">Design Studio</a></li><li><a href=\"/projects\" className=\"hover:underline\">Projects</a></li></ul> </div></NavigationMenuContent> </NavigationMenuItem></NavigationMenuList></NavigationMenu></nav>); }",
    "multi_step_form_js": "import React, {useState} from 'react'; import { Button } from './components/ui/button'; import { Input } from './components/ui/input'; import { Textarea } from './components/ui/textarea'; import { Progress } from './components/ui/progress'; export default function LeadForm(){ const [step, setStep] = useState(1); const next=()=>setStep((s)=>Math.min(s+1,4)); const prev=()=>setStep((s)=>Math.max(s-1,1)); const pct = (step/4)*100; return (<div className=\"max-w-xl\" data-testid=\"lead-form\"> <Progress value={pct} className=\"mb-6\" /> {step===1 && (<div><h3 className=\"font-serif text-lg\">Project Type</h3><div className=\"mt-4 grid gap-4\"><Input placeholder=\"Residential / Commercial\" data-testid=\"lead-form-project-type\"/></div></div>)} {step===2 && (<div><h3 className=\"font-serif text-lg\">Measurements</h3><div className=\"mt-4 grid gap-4\"><Input placeholder=\"Approx. openings\" data-testid=\"lead-form-measurements\"/></div></div>)} {step===3 && (<div><h3 className=\"font-serif text-lg\">Preferences</h3><div className=\"mt-4 grid gap-4\"><Textarea placeholder=\"Noise, thermal, security priorities\" data-testid=\"lead-form-preferences\"/></div></div>)} {step===4 && (<div><h3 className=\"font-serif text-lg\">Contact</h3><div className=\"mt-4 grid gap-4\"><Input placeholder=\"Name\" data-testid=\"lead-form-name\"/><Input placeholder=\"Phone\" data-testid=\"lead-form-phone\"/><Input placeholder=\"Email\" data-testid=\"lead-form-email\"/></div></div>)} <div className=\"mt-6 flex gap-3\"> {step>1 && <Button onClick={prev} variant=\"ghost\" data-testid=\"lead-form-prev-button\">Back</Button>} {step<4 ? <Button onClick={next} data-testid=\"lead-form-next-button\">Next</Button> : <Button data-testid=\"lead-form-submit-button\">Submit</Button>} </div></div>); }",
    "sticky_cta_js": "export default function StickyCTA(){ return (<div className=\"fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t shadow-md md:hidden\" data-testid=\"sticky-cta-bar\"> <div className=\"mx-auto max-w-[1200px] px-4 py-3 grid grid-cols-3 gap-3\"> <a href=\"#quote\" className=\"text-center font-medium\" data-testid=\"sticky-cta-quote-button\">Get Quote</a> <a href=\"https://wa.me/91XXXXXXXXXX\" className=\"text-center font-medium text-[hsl(var(--accent))]\" data-testid=\"sticky-cta-whatsapp-link\">WhatsApp</a> <a href=\"tel:+91XXXXXXXXXX\" className=\"text-center font-medium\" data-testid=\"sticky-cta-call-link\">Call</a> </div></div>); }"
  },
  "icons": {
    "library": "lucide-react",
    "note": "Use simple line icons; avoid emoji."
  },
  "forms_and_toasts": {
    "validation": "Handle client validation gently with inline helper text using ./components/ui/form",
    "toasts": "Use sonner (./components/ui/sonner) for submission success/error"
  },
  "images_art_direction": {
    "style": "Daylight, clean angles, large panes, neutral palettes, minimal styling",
    "treatment": "Full-bleed or bento grid; avoid overlays; use soft vignette 2% max when needed",
    "alt_text_rule": "Describe material, light, and view, e.g., 'Corner uPVC glazing with garden view'"
  },
  "gradients_textures_rule": {
    "allowed": "Only for large hero backgrounds or section separators; porcelain→stone vertical 2-color max, coverage <20% viewport",
    "prohibited": "No dark/saturated gradient combos and never on text or small UI elements"
  },
  "libraries": {
    "primary": ["shadcn/ui (already in repo)", "Framer Motion"],
    "optional": ["Lenis (smooth scroll)", "LottieFiles for subtle line animations"],
    "install_cmds": ["npm i framer-motion", "npm i @studio-freight/lenis"]
  },
  "content_blocks_tailwind": {
    "feature_grid": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
    "process_timeline": "grid grid-cols-1 md:grid-cols-4 gap-6 items-start",
    "editorial_copy": "prose prose-neutral max-w-none prose-h2:font-serif prose-p:text-muted-foreground",
    "bento_gallery": "grid grid-cols-2 md:grid-cols-6 gap-3"
  },
  "instructions_to_main_agent": [
    "Update :root color tokens in /app/frontend/src/index.css to the values in color_system.css_custom_properties (replace cautiously).",
    "Load Google Fonts in index.html or root layout as provided.",
    "Structure pages per 'pages' with the layout_grid container and section spacing.",
    "Use shadcn components from component_path; never raw HTML widgets for dropdowns, calendar, toasts.",
    "Attach data-testid to all interactive and key informational elements.",
    "Implement motion using framer-motion snippets; respect prefers-reduced-motion.",
    "Use Button from ./components/ui/button; for accent CTA, pass className='bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]' or create a variant.",
    "For FAQs, use ./components/ui/accordion; for tabs in Design Studio, use ./components/ui/tabs.",
    "For forms, use multi_step_form_js scaffold; on submit, trigger sonner toast.",
    "Add StickyCTA on mobile only.",
    "Hero parallax limited to 2–6% translate. No heavy effects.",
    "Enforce gradient restriction rules and avoid purple/pink or neon.",
    "Spacing: Use 2–3x comfortable spacing; avoid cramped layouts.",
    "Icons via lucide-react; keep minimal line style."
  ],
  "acceptance_criteria": [
    "Visuals match Architectural Luxury tone (white/stone/charcoal with cyan accents)",
    "Mega menu functions on desktop and converts to sheet drawer on mobile",
    "Multi-step lead form works with progress and data-testids present",
    "Sticky mobile CTA bar visible and accessible",
    "All CTAs: Get Quote, Book Site Visit, WhatsApp, Call available",
    "Animations are subtle and respect reduced motion",
    "No prohibited gradients or neon usage"
  ],
  "note_on_files": "Project uses .js files (not .tsx). Ensure all scaffolds are in .js and named exports for components; pages default exports.",
  "general_ui_ux_design_guidelines_raw": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
