"""Comprehensive Design Studio Data - Accurate uPVC Industry Standards"""

from models import ColorFinish, GlassOption, Hardware

# ============================================================================
# COMPREHENSIVE COLOR FINISHES - 40+ Options like Industry Leaders
# ============================================================================

# uPVC Profile/Window images showing actual finishes
# Using solid color backgrounds and real uPVC window/profile images
TEXTURE_IMAGES = {
    # Solid colors - using uPVC profile/window images
    "white": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",  # White window
    "cream": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80",  # Cream/warm interior
    "grey": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",   # Grey modern window
    # Wood textures - actual wood grain pattern images
    "oak": "https://images.unsplash.com/photo-1558618047-f4b511ab9204?w=400&q=80",       # Oak wood texture
    "walnut": "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?w=400&q=80", # Walnut wood grain
    "mahogany": "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&q=80", # Mahogany texture
    "teak": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",      # Teak wood
    # Dark colors
    "anthracite": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80", # Dark grey building
    "black": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",  # Black framed windows
}

COLOR_FINISHES_COMPREHENSIVE = [
    # SOLID COLORS (Most Popular)
    ColorFinish(id="color-brilliant-white", name="Brilliant White", code="#FFFFFF", category="solid", 
                image=TEXTURE_IMAGES["white"], is_popular=True, 
                description="Classic pure white - the most popular choice for modern homes. Clean, bright, and timeless."),
    ColorFinish(id="color-cream-white", name="Cream White", code="#FFFEF0", category="solid", 
                image=TEXTURE_IMAGES["cream"],
                description="Soft warm white with subtle cream undertone. Elegant and sophisticated."),
    ColorFinish(id="color-ivory", name="Ivory", code="#FFFFF0", category="solid", 
                image=TEXTURE_IMAGES["cream"],
                description="Warm off-white shade. Perfect for traditional and colonial architecture."),
    ColorFinish(id="color-champagne", name="Champagne", code="#F7E7CE", category="solid", 
                image=TEXTURE_IMAGES["cream"],
                description="Luxurious champagne gold undertone. Adds warmth to contemporary spaces."),
    ColorFinish(id="color-anthracite-grey", name="Anthracite Grey", code="#383E42", category="solid", 
                image=TEXTURE_IMAGES["anthracite"], is_popular=True,
                description="Deep charcoal grey - a modern classic. Bold and sophisticated."),
    ColorFinish(id="color-slate-grey", name="Slate Grey", code="#708090", category="solid", 
                image=TEXTURE_IMAGES["grey"],
                description="Medium grey with blue undertone. Industrial chic aesthetic."),
    ColorFinish(id="color-agate-grey", name="Agate Grey", code="#B5B5B5", category="solid", 
                image=TEXTURE_IMAGES["grey"],
                description="Light silver grey. Subtle and refined."),
    ColorFinish(id="color-quartz-grey", name="Quartz Grey", code="#6C6C6C", category="solid", 
                image=TEXTURE_IMAGES["grey"],
                description="Neutral mid-grey. Versatile for any architecture style."),
    ColorFinish(id="color-jet-black", name="Jet Black", code="#0A0A0A", category="solid", 
                image=TEXTURE_IMAGES["black"], is_popular=True,
                description="Premium black finish. Makes a bold architectural statement."),
    ColorFinish(id="color-smooth-black", name="Smooth Black", code="#1C1C1C", category="solid", 
                image=TEXTURE_IMAGES["black"],
                description="Deep black with smooth satin texture. Ultra-modern appeal."),
    ColorFinish(id="color-dark-green", name="Racing Green", code="#0B3D0B", category="solid", 
                image=TEXTURE_IMAGES["black"],
                description="Classic British racing green. Heritage and elegance."),
    ColorFinish(id="color-navy-blue", name="Steel Blue", code="#4682B4", category="solid", 
                image=TEXTURE_IMAGES["grey"],
                description="Deep steel blue. Coastal and nautical inspired."),
    
    # WOODGRAIN TEXTURES - Natural Look
    ColorFinish(id="color-golden-oak", name="Golden Oak", code="#B5651D", category="wood_texture", 
                image=TEXTURE_IMAGES["oak"], is_popular=True,
                description="Classic golden oak woodgrain. Warm honey tones with visible grain pattern."),
    ColorFinish(id="color-irish-oak", name="Irish Oak", code="#A0522D", category="wood_texture", 
                image=TEXTURE_IMAGES["oak"],
                description="Lighter oak with reddish undertones. Natural and inviting."),
    ColorFinish(id="color-natural-oak", name="Natural Oak", code="#C4A76D", category="wood_texture", 
                image=TEXTURE_IMAGES["oak"],
                description="Light natural oak. Scandinavian-inspired minimalism."),
    ColorFinish(id="color-rustic-oak", name="Rustic Oak", code="#8B7355", category="wood_texture", 
                image=TEXTURE_IMAGES["oak"],
                description="Weathered oak with character marks. Farmhouse aesthetic."),
    ColorFinish(id="color-winchester-oak", name="Winchester Oak", code="#6B4423", category="wood_texture", 
                image=TEXTURE_IMAGES["walnut"],
                description="Deep amber oak. Rich and traditional."),
    ColorFinish(id="color-walnut", name="Walnut", code="#5D4037", category="wood_texture", 
                image=TEXTURE_IMAGES["walnut"], is_popular=True,
                description="Dark chocolate walnut. Luxurious and timeless."),
    ColorFinish(id="color-dark-walnut", name="Dark Walnut", code="#3E2723", category="wood_texture", 
                image=TEXTURE_IMAGES["walnut"],
                description="Extra-dark walnut finish. Dramatic and opulent."),
    ColorFinish(id="color-mahogany", name="Mahogany", code="#4E0000", category="wood_texture", 
                image=TEXTURE_IMAGES["mahogany"],
                description="Rich red-brown mahogany. Classic colonial elegance."),
    ColorFinish(id="color-rosewood", name="Rosewood", code="#65000B", category="wood_texture", 
                image=TEXTURE_IMAGES["mahogany"],
                description="Deep rose-tinted wood. Exotic and sophisticated."),
    ColorFinish(id="color-cherry", name="Cherry", code="#7B3F00", category="wood_texture", 
                image=TEXTURE_IMAGES["mahogany"],
                description="Warm cherry wood tones. Classic American style."),
    ColorFinish(id="color-teak", name="Teak", code="#6E4C1E", category="wood_texture", 
                image=TEXTURE_IMAGES["teak"],
                description="Classic teak woodgrain. Tropical warmth and durability look."),
    ColorFinish(id="color-sheesham", name="Sheesham", code="#8B4513", category="wood_texture", 
                image=TEXTURE_IMAGES["teak"],
                description="Indian rosewood pattern. Traditional Indian homes."),
    ColorFinish(id="color-grey-oak", name="Grey Oak", code="#808069", category="wood_texture", 
                image=TEXTURE_IMAGES["grey"],
                description="Weathered grey oak. Contemporary rustic."),
    ColorFinish(id="color-white-oak", name="White Oak", code="#D2B48C", category="wood_texture", 
                image=TEXTURE_IMAGES["oak"],
                description="Pale blonde oak. Light and airy Scandinavian feel."),
    
    # METALLIC & SPECIAL FINISHES
    ColorFinish(id="color-brushed-aluminium", name="Brushed Aluminium", code="#A8A9AD", category="metallic", 
                image=TEXTURE_IMAGES["grey"],
                description="Industrial brushed metal look. Ultra-modern commercial aesthetic."),
    ColorFinish(id="color-silver", name="Silver Grey", code="#C0C0C0", category="metallic", 
                image=TEXTURE_IMAGES["grey"],
                description="Clean silver metallic. High-tech contemporary."),
    ColorFinish(id="color-bronze", name="Bronze", code="#CD7F32", category="metallic", 
                image=TEXTURE_IMAGES["teak"],
                description="Warm bronze metallic. Traditional meets modern."),
    ColorFinish(id="color-copper", name="Copper", code="#B87333", category="metallic", 
                image=TEXTURE_IMAGES["teak"],
                description="Antique copper finish. Artisanal character."),
    
    # DUAL-COLOR OPTIONS
    ColorFinish(id="color-white-grey", name="White/Grey Dual", code="#FFFFFF", category="dual_color", 
                image=TEXTURE_IMAGES["white"],
                description="White interior, Anthracite Grey exterior. Best of both worlds."),
    ColorFinish(id="color-white-oak", name="White/Oak Dual", code="#FFFFFF", category="dual_color", 
                image=TEXTURE_IMAGES["white"],
                description="White interior, Golden Oak exterior. Classic combination."),
    ColorFinish(id="color-white-black", name="White/Black Dual", code="#FFFFFF", category="dual_color", 
                image=TEXTURE_IMAGES["white"],
                description="White interior, Black exterior. Modern contrast."),
]

# ============================================================================
# COMPREHENSIVE GLASS OPTIONS with Full Technical Specifications
# ============================================================================

GLASS_OPTIONS_COMPREHENSIVE = [
    # BASIC GLASS TYPES
    GlassOption(
        id="glass-clear-float",
        name="Clear Float Glass",
        description="Standard transparent glass for maximum light transmission and clear views. The foundation of all glazing solutions.",
        thickness="4mm / 5mm / 6mm / 8mm / 10mm / 12mm",
        u_value="5.8 W/m²K (single)",
        light_transmission="89%",
        sound_reduction="26-30 dB",
        benefits=["Maximum natural light", "Crystal clear views", "Cost effective", "Available in all sizes"],
        best_for=["Interior partitions", "Mild climates", "Budget projects"],
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ),
    GlassOption(
        id="glass-tinted",
        name="Tinted / Body-Tinted Glass",
        description="Glass with color added during manufacturing for solar control and privacy. Available in bronze, grey, green, and blue.",
        thickness="4mm / 5mm / 6mm / 8mm",
        u_value="5.5 W/m²K (single)",
        light_transmission="45-70% (varies by tint)",
        sound_reduction="27-31 dB",
        benefits=["Reduces solar heat gain", "Glare reduction", "Privacy enhancement", "Aesthetic options"],
        best_for=["West/South facing windows", "Commercial buildings", "Privacy needs"],
        image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
    ),
    GlassOption(
        id="glass-reflective",
        name="Reflective Glass",
        description="Metallic coating on glass surface creates mirror-like exterior. Excellent solar control for hot climates.",
        thickness="5mm / 6mm / 8mm",
        u_value="5.3 W/m²K (single)",
        light_transmission="20-45%",
        sound_reduction="28-32 dB",
        benefits=["Maximum solar rejection", "Daytime privacy", "Reduced AC costs", "Modern appearance"],
        best_for=["Commercial facades", "South/West exposure", "Hot climates"],
        image="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"
    ),
    
    # DOUBLE GLAZED UNITS (DGU)
    GlassOption(
        id="glass-dgu-standard",
        name="Double Glazed Unit (DGU)",
        description="Two panes of glass with air-filled gap. The standard for energy-efficient windows. Dramatically improves insulation.",
        thickness="24mm (4+16+4) / 28mm (5+18+5)",
        u_value="2.8 W/m²K",
        light_transmission="81%",
        sound_reduction="30-35 dB",
        benefits=["50% better insulation than single glass", "Reduced condensation", "Lower energy bills", "Improved comfort"],
        best_for=["All residential windows", "Bedrooms", "Living areas"],
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    ),
    GlassOption(
        id="glass-dgu-argon",
        name="Argon-Filled DGU",
        description="Double glazed unit filled with argon gas instead of air. Argon is denser, providing better insulation than air-filled units.",
        thickness="24mm (4+16+4) / 28mm (5+18+5)",
        u_value="2.5 W/m²K",
        light_transmission="81%",
        sound_reduction="31-36 dB",
        benefits=["15% better than air-filled DGU", "Lower U-value", "Professional grade", "Long-lasting seal"],
        best_for=["Premium residences", "Energy-efficient homes", "Green building projects"],
        image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
    ),
    GlassOption(
        id="glass-lowe",
        name="Low-E Glass (Low Emissivity)",
        description="Microscopic metallic coating that reflects heat while allowing light through. Essential for energy-efficient windows.",
        thickness="Available in DGU: 24mm / 28mm / 32mm",
        u_value="1.6 - 1.1 W/m²K (in DGU)",
        light_transmission="72-78%",
        sound_reduction="31-36 dB",
        benefits=["Reflects heat back inside in winter", "Reflects solar heat in summer", "Blocks 99% UV", "Protects furnishings"],
        best_for=["All climates", "Large glazed areas", "Energy-conscious homeowners"],
        image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    ),
    GlassOption(
        id="glass-triple",
        name="Triple Glazed Unit",
        description="Three panes with two insulating gaps. The ultimate in thermal performance for extreme climates and passive houses.",
        thickness="36mm (4+10+4+10+4) / 44mm",
        u_value="0.8 - 1.0 W/m²K",
        light_transmission="68-72%",
        sound_reduction="38-45 dB",
        benefits=["Maximum insulation", "Near-elimination of cold spots", "Superior noise reduction", "Condensation-free"],
        best_for=["Cold climates", "Passive houses", "Near airports/highways"],
        image="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"
    ),
    
    # SAFETY & ACOUSTIC GLASS
    GlassOption(
        id="glass-laminated",
        name="Laminated Safety Glass",
        description="Two glass panes bonded with PVB interlayer. If broken, glass fragments stick to the film. Essential for safety and security.",
        thickness="6.38mm (3+0.38+3) / 8.38mm / 10.38mm / 12.76mm",
        u_value="5.6 W/m²K (single) / Can be used in DGU",
        light_transmission="87%",
        sound_reduction="35-40 dB",
        benefits=["Holds together if shattered", "Burglar resistant", "Blocks 99% UV", "Excellent sound insulation"],
        best_for=["Ground floor windows", "Overhead glazing", "Schools & public buildings"],
        image="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
    ),
    GlassOption(
        id="glass-toughened",
        name="Toughened / Tempered Glass",
        description="Heat-treated glass that is 4-5x stronger than regular glass. Shatters into small, less dangerous pieces.",
        thickness="5mm / 6mm / 8mm / 10mm / 12mm",
        u_value="5.8 W/m²K (single)",
        light_transmission="89%",
        sound_reduction="26-30 dB",
        benefits=["4x stronger than float glass", "Safe breakage pattern", "Thermal stress resistant", "Scratch resistant"],
        best_for=["Large panes", "Doors", "Areas prone to impact"],
        image="https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80"
    ),
    GlassOption(
        id="glass-acoustic",
        name="Acoustic Laminated Glass",
        description="Special PVB interlayer optimized for sound dampening. The go-to solution for noise-sensitive environments.",
        thickness="8.8mm / 10.8mm / 12.8mm / Used in DGU",
        u_value="5.5 W/m²K (single)",
        light_transmission="86%",
        sound_reduction="40-47 dB",
        benefits=["Maximum noise reduction", "Blocks traffic, aircraft noise", "All safety benefits of laminated", "Clear appearance"],
        best_for=["Near highways", "Airport areas", "Urban environments", "Home theaters"],
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
    ),
    
    # SPECIALTY GLASS
    GlassOption(
        id="glass-frosted",
        name="Frosted / Obscure Glass",
        description="Acid-etched or sandblasted glass that diffuses light while obscuring views. Available in various opacity levels.",
        thickness="4mm / 5mm / 6mm / Can be used in DGU",
        u_value="5.8 W/m²K (single)",
        light_transmission="85% (varies by opacity)",
        sound_reduction="26-30 dB",
        benefits=["Privacy without blocking light", "Soft diffused lighting", "Elegant appearance", "Multiple patterns"],
        best_for=["Bathrooms", "Front doors", "Office partitions", "Bedrooms"],
        image="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80"
    ),
    GlassOption(
        id="glass-self-cleaning",
        name="Self-Cleaning Glass",
        description="Special coating that breaks down dirt using sunlight and washes clean with rainwater. Reduces maintenance.",
        thickness="4mm / 5mm / 6mm / Can be used in DGU",
        u_value="5.8 W/m²K (single)",
        light_transmission="87%",
        sound_reduction="26-30 dB",
        benefits=["Dirt breaks down naturally", "Reduces cleaning frequency", "Environmentally friendly", "Long-lasting coating"],
        best_for=["Skylights", "Conservatories", "Hard-to-reach windows"],
        image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80"
    ),
]

# ============================================================================
# COMPREHENSIVE HARDWARE with Technical Details
# ============================================================================

HARDWARE_COMPREHENSIVE = [
    # HANDLES
    Hardware(
        id="hw-hoppe-secustic",
        name="Hoppe Secustic Handle",
        category="handles",
        brand="Hoppe (Germany)",
        description="Premium German-engineered window handle with integrated security mechanism. Prevents unauthorized opening from outside.",
        features=["Secustic anti-jemmy device", "10-year warranty", "Tested to 100,000 cycles", "Multiple finishes"],
        finishes=["White", "Silver", "Titanium", "Black", "Gold"],
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
    ),
    Hardware(
        id="hw-roto-swing",
        name="Roto Swing Handle",
        category="handles",
        brand="Roto Frank (Germany)",
        description="Sleek contemporary handle for tilt & turn windows. Smooth 90° and 180° operation for tilt and turn modes.",
        features=["Ergonomic design", "Child-safe key lock option", "Corrosion resistant", "Quick-fit installation"],
        finishes=["White", "Silver", "Anthracite", "Stainless look"],
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
    ),
    Hardware(
        id="hw-siegenia-favorit",
        name="Siegenia Favorit Handle",
        category="handles",
        brand="Siegenia-Aubi (Germany)",
        description="Premium handle system with TBT (Tilt Before Turn) safety mechanism. Prevents accidental full opening.",
        features=["TBT safety mechanism", "Soft-close compatible", "DIN tested", "Elegant profile"],
        finishes=["White", "Brown", "Silver", "Titanium", "Satin chrome"],
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
    ),
    
    # LOCKING SYSTEMS
    Hardware(
        id="hw-gu-multilock",
        name="GU Multi-Point Lock System",
        category="locks",
        brand="GU (Germany)",
        description="Heavy-duty multi-point locking system with 3 to 5 locking points. Engages simultaneously for maximum security.",
        features=["3-5 point locking", "Anti-drill protection", "Corrosion resistant zinc", "Smooth mechanism"],
        finishes=["Silver", "Black"],
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80"
    ),
    Hardware(
        id="hw-roto-safe",
        name="Roto Safe Door Lock",
        category="locks",
        brand="Roto Frank (Germany)",
        description="RC2-certified security lock for entrance doors. Tested against burglary attempts per European standards.",
        features=["RC2 certified", "Mushroom cam bolts", "Anti-pick cylinder", "Keeps & strikers included"],
        finishes=["Silver", "Black"],
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80"
    ),
    Hardware(
        id="hw-yale-cylinder",
        name="Yale Euro Profile Cylinder",
        category="locks",
        brand="Yale (UK)",
        description="High-security euro cylinder with anti-snap, anti-pick, and anti-drill protection. Kitemarked and insurance approved.",
        features=["Anti-snap protection", "Anti-pick pins", "Anti-drill plate", "Key control system"],
        finishes=["Brass", "Nickel", "Chrome"],
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80"
    ),
    
    # HINGES & STAYS
    Hardware(
        id="hw-roto-nt-hinge",
        name="Roto NT Tilt & Turn Hinge",
        category="hinges",
        brand="Roto Frank (Germany)",
        description="Complete tilt and turn hardware system. Allows both tilt (ventilation) and turn (full opening) operation.",
        features=["Dual-mode operation", "Adjustable in 3 planes", "Up to 130kg sash weight", "Concealed option"],
        finishes=["Silver"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    Hardware(
        id="hw-friction-stay",
        name="Premium Friction Stay Hinge",
        category="hinges",
        brand="Various",
        description="Heavy-duty friction stays for casement windows. Hold sash securely at any opening angle up to 90°.",
        features=["Stainless steel construction", "Fire-exit egress option", "Restrictor variants", "Smooth operation"],
        finishes=["Silver", "White", "Black"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    Hardware(
        id="hw-child-restrictor",
        name="Child Safety Restrictor",
        category="hinges",
        brand="Various",
        description="Limits window opening to 100mm for child safety. Keyed override allows full opening when needed.",
        features=["100mm max opening", "Key override", "Fire safety compliant", "Easy retrofit"],
        finishes=["White", "Silver", "Brown"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    
    # SLIDING DOOR HARDWARE
    Hardware(
        id="hw-tandem-roller",
        name="Heavy-Duty Tandem Rollers",
        category="sliding",
        brand="Various",
        description="Precision tandem roller system for sliding windows and doors. Handles panels up to 200kg.",
        features=["200kg max weight", "PTFE coated wheels", "Adjustable height", "Smooth quiet operation"],
        finishes=["Silver"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    Hardware(
        id="hw-lift-slide-gear",
        name="Lift & Slide Hardware System",
        category="sliding",
        brand="Siegenia (Germany)",
        description="Premium lift-and-slide mechanism. Handle turns to lift panel off seals for effortless sliding of heavy doors.",
        features=["Up to 400kg panel weight", "Compression seal when closed", "Smooth lift mechanism", "Premium feel"],
        finishes=["Silver", "Stainless"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    
    # ACCESSORIES
    Hardware(
        id="hw-mesh-fiberglass",
        name="Fiberglass Insect Mesh",
        category="accessories",
        brand="Various",
        description="Standard fiberglass fly screen mesh. Fine weave keeps insects out while allowing air circulation.",
        features=["18x16 mesh size", "UV resistant", "Pet-proof option", "Easy replacement"],
        finishes=["Charcoal", "Grey", "Black"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    Hardware(
        id="hw-mesh-ss",
        name="Stainless Steel Security Mesh",
        category="accessories",
        brand="Various",
        description="Marine-grade 316 stainless steel mesh. Provides insect protection plus security against intruders.",
        features=["316 SS marine grade", "Cut & tear resistant", "Fire safe", "Clear visibility"],
        finishes=["Black", "Charcoal"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    Hardware(
        id="hw-mesh-pleated",
        name="Pleated Retractable Screen",
        category="accessories",
        brand="Various",
        description="Retractable pleated mesh that folds away when not in use. Elegant solution for doors and large windows.",
        features=["Retractable design", "No visible track", "Easy operation", "Custom sizes"],
        finishes=["White", "Brown", "Anthracite"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
    Hardware(
        id="hw-trickle-vent",
        name="Trickle Ventilator",
        category="accessories",
        brand="Various",
        description="Background ventilation without opening windows. Meets building regulations for ventilation requirements.",
        features=["5000mm² airflow", "Acoustic attenuated options", "Manual or auto control", "Weatherproof"],
        finishes=["White", "Brown", "Grey"],
        image="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"
    ),
]

# ============================================================================
# PROFILE SYSTEMS COMPARISON DATA
# ============================================================================

PROFILE_SYSTEMS = [
    {
        "id": "profile-60mm",
        "name": "60mm Classic System",
        "depth": "60mm",
        "chambers": 3,
        "u_value": "1.5 W/m²K",
        "sound_class": "Class 3 (30-35 dB)",
        "weather_rating": "600 Pa wind / 300 Pa water",
        "max_glass": "28mm",
        "steel_reinforcement": "1.5mm galvanized",
        "best_for": "Budget-conscious projects, mild climates",
        "features": ["3-chamber design", "Standard gasket system", "Cost-effective", "Wide range of colors"],
    },
    {
        "id": "profile-70mm",
        "name": "70mm Premium System",
        "depth": "70mm",
        "chambers": 5,
        "u_value": "1.2 W/m²K",
        "sound_class": "Class 4 (35-40 dB)",
        "weather_rating": "900 Pa wind / 450 Pa water",
        "max_glass": "40mm",
        "steel_reinforcement": "1.5mm galvanized",
        "best_for": "Most residential applications, recommended standard",
        "features": ["5-chamber design", "Double gasket sealing", "Excellent insulation", "Flush sash option"],
        "popular": True
    },
    {
        "id": "profile-82mm",
        "name": "82mm Passive House System",
        "depth": "82mm",
        "chambers": 6,
        "u_value": "0.95 W/m²K",
        "sound_class": "Class 5 (40-45 dB)",
        "weather_rating": "1200 Pa wind / 600 Pa water",
        "max_glass": "52mm",
        "steel_reinforcement": "2.0mm galvanized",
        "best_for": "Passive houses, extreme climates, maximum performance",
        "features": ["6-chamber design", "Triple gasket sealing", "Thermal break core", "Triple glazing ready"],
    },
]
