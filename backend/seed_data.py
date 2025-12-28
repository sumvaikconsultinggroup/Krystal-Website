from models import (
    Product, ProductSpec, Project, BlogPost, FAQ, Testimonial, City,
    ColorFinish, GlassOption, Hardware, Download, GlobalSettings, ContactInfo
)

# High-quality images for uPVC windows and doors - Premium architectural photography
IMAGES = {
    "hero": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    "hero_2": "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    # Premium Window Images - User provided images
    "casement_window": "https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/h35z2via_Casement.png",  # User provided Casement
    "sliding_window": "https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/yj34d8qa_Sliding.png",  # User provided Sliding
    "tilt_turn_window": "https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/ruuzup5o_Tilt%20and%20Turn.png",  # User provided Tilt & Turn
    "fixed_window": "https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/kalvevar_Fixed.png",  # User provided Fixed
    "top_hung_window": "https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/yi6vpufb_Top%20Hund%20Ventilator.png",  # User provided Top Hung
    "french_window": "https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/dsy4xd9o_French.png",  # User provided French
    # Door Images
    "doors_1": "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    "doors_2": "https://images.unsplash.com/photo-1525570665650-76bb26af503d?w=800&q=80",
    # Interior/Villa
    "interior_1": "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    "interior_2": "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    "villa_1": "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    "villa_2": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    "commercial_1": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    "glass_1": "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    "glass_2": "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    "texture_wood": "https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=400&q=80",
    "texture_white": "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=400&q=80",
    "hardware_1": "https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=400&q=80",
    "team_1": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    "factory_1": "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
}

# Products - Windows
WINDOWS_PRODUCTS = [
    Product(
        id="prod-casement-window",
        slug="casement-windows",
        name="Casement Windows",
        category="windows",
        product_type="casement",
        short_description="Classic side-hinged windows with excellent ventilation and unobstructed views.",
        description="Our casement windows combine timeless design with modern uPVC technology. Opening outward on side hinges, they provide maximum ventilation and easy cleaning. The multi-point locking system ensures superior security while the premium weathersealing delivers exceptional acoustic and thermal performance.",
        hero_image=IMAGES["casement_window"],
        gallery=[IMAGES["casement_window"], IMAGES["interior_1"], IMAGES["glass_1"]],
        features=["Multi-point locking system", "90° opening capability", "Easy-clean hinges", "Friction stays for controlled opening", "Child-safe restrictors available"],
        benefits=["Superior ventilation", "Unobstructed views", "Easy maintenance", "Enhanced security", "Weather resistant"],
        use_cases=["Living rooms", "Bedrooms", "Study rooms", "Home offices"],
        specs=[
            ProductSpec(label="Frame Depth", value="60mm - 70mm"),
            ProductSpec(label="Glass Options", value="Single/Double/Triple glazed"),
            ProductSpec(label="U-Value", value="As low as 1.4 W/m²K"),
            ProductSpec(label="Sound Reduction", value="Up to 42 dB"),
            ProductSpec(label="Max Size", value="1200mm x 1500mm per sash"),
        ],
        related_products=["prod-sliding-window", "prod-tilt-turn-window"],
        is_featured=True,
        order=1
    ),
    Product(
        id="prod-sliding-window",
        slug="sliding-windows",
        name="Sliding Windows",
        category="windows",
        product_type="sliding",
        short_description="Space-saving horizontal sliding windows ideal for modern apartments and balconies.",
        description="Sliding windows glide horizontally on smooth roller tracks, making them perfect for areas where space is at a premium. Our uPVC sliding windows feature precision-engineered rollers for effortless operation, interlock design for enhanced security, and superior weathersealing for comfort in all seasons.",
        hero_image=IMAGES["sliding_window"],
        gallery=[IMAGES["sliding_window"], IMAGES["interior_2"], IMAGES["villa_1"]],
        features=["Smooth roller mechanism", "Interlock design", "Multi-track options", "Mosquito mesh compatible", "Anti-lift blocks"],
        benefits=["Space efficient", "Easy operation", "Modern aesthetics", "Excellent for balconies", "Low maintenance"],
        use_cases=["Balconies", "Apartments", "High-rise buildings", "Compact spaces"],
        specs=[
            ProductSpec(label="Frame Depth", value="60mm - 80mm"),
            ProductSpec(label="Track Options", value="2-track, 3-track, 4-track"),
            ProductSpec(label="Glass Thickness", value="5mm - 24mm"),
            ProductSpec(label="Sound Reduction", value="Up to 38 dB"),
            ProductSpec(label="Max Panel Size", value="1500mm x 2400mm"),
        ],
        related_products=["prod-casement-window", "prod-fixed-window"],
        is_featured=True,
        order=2
    ),
    Product(
        id="prod-tilt-turn-window",
        slug="tilt-turn-windows",
        name="Tilt & Turn Windows",
        category="windows",
        product_type="tilt_turn",
        short_description="Versatile European-style windows with dual opening modes for ventilation and cleaning.",
        description="Tilt and turn windows offer the ultimate in flexibility. Tilt inward from the top for secure ventilation, or turn fully inward for easy cleaning and maximum airflow. The sophisticated German-engineered hardware ensures smooth operation and outstanding security.",
        hero_image=IMAGES["tilt_turn_window"],
        gallery=[IMAGES["tilt_turn_window"], IMAGES["interior_1"], IMAGES["glass_2"]],
        features=["Dual-mode operation", "German hardware", "Inward opening", "Multi-point locking", "Night vent position"],
        benefits=["Secure ventilation", "Easy cleaning from inside", "European design", "Child-safe vent mode", "Superior sealing"],
        use_cases=["High-rise apartments", "Bedrooms", "Children's rooms", "Offices"],
        specs=[
            ProductSpec(label="Frame Depth", value="70mm - 82mm"),
            ProductSpec(label="Hardware", value="Roto/Siegenia/GU"),
            ProductSpec(label="U-Value", value="As low as 1.2 W/m²K"),
            ProductSpec(label="Sound Reduction", value="Up to 45 dB"),
            ProductSpec(label="Security", value="RC2 rated available"),
        ],
        related_products=["prod-casement-window", "prod-fixed-window"],
        is_featured=True,
        order=3
    ),
    Product(
        id="prod-fixed-window",
        slug="fixed-windows",
        name="Fixed Windows",
        category="windows",
        product_type="fixed",
        short_description="Non-opening windows for maximum light and uninterrupted views.",
        description="Fixed windows are designed to maximize natural light and provide panoramic views without any frame obstructions. Perfect for areas where ventilation is not required, they offer superior thermal and acoustic insulation with clean, minimal aesthetics.",
        hero_image=IMAGES["fixed_window"],
        gallery=[IMAGES["fixed_window"], IMAGES["villa_2"], IMAGES["commercial_1"]],
        features=["Frameless look options", "Large glass areas", "Structural glazing available", "Custom shapes", "Energy efficient"],
        benefits=["Maximum light", "Unobstructed views", "Best insulation", "Minimal frames", "Architectural flexibility"],
        use_cases=["Picture windows", "Stairwells", "Commercial facades", "Feature walls"],
        specs=[
            ProductSpec(label="Frame Depth", value="60mm - 70mm"),
            ProductSpec(label="Max Size", value="2500mm x 3000mm"),
            ProductSpec(label="Glass Options", value="Up to 44mm triple glazed"),
            ProductSpec(label="U-Value", value="As low as 1.0 W/m²K"),
            ProductSpec(label="Sound Reduction", value="Up to 48 dB"),
        ],
        related_products=["prod-casement-window", "prod-french-window"],
        order=4
    ),
    Product(
        id="prod-top-hung-window",
        slug="top-hung-windows",
        name="Top Hung / Ventilator Windows",
        category="windows",
        product_type="top_hung",
        short_description="Compact awning-style windows perfect for ventilation in kitchens and bathrooms.",
        description="Top hung windows open outward from the bottom, hinged at the top. This design allows ventilation even during light rain while maintaining privacy. Ideal for kitchens, bathrooms, and utility areas where space and moisture management are priorities.",
        hero_image=IMAGES["top_hung_window"],
        gallery=[IMAGES["top_hung_window"], IMAGES["casement_window"]],
        features=["Rain-resistant ventilation", "Compact design", "Friction stays", "Easy operation", "Privacy focused"],
        benefits=["Ventilate during rain", "Space efficient", "Privacy maintained", "Moisture control", "Easy cleaning"],
        use_cases=["Kitchens", "Bathrooms", "Utility rooms", "Garages"],
        specs=[
            ProductSpec(label="Frame Depth", value="60mm"),
            ProductSpec(label="Opening Angle", value="Up to 60°"),
            ProductSpec(label="Glass Options", value="Frosted/Clear/Tinted"),
            ProductSpec(label="Max Size", value="1200mm x 600mm"),
        ],
        related_products=["prod-casement-window", "prod-fixed-window"],
        order=5
    ),
    Product(
        id="prod-french-window",
        slug="french-windows",
        name="French Windows",
        category="windows",
        product_type="french",
        short_description="Floor-to-ceiling double windows creating seamless indoor-outdoor transitions.",
        description="French windows bring elegance and grandeur to any space. These floor-to-ceiling double windows open outward or inward, creating a seamless connection between indoor and outdoor spaces. Perfect for gardens, balconies, and terraces.",
        hero_image=IMAGES["french_window"],
        gallery=[IMAGES["french_window"], IMAGES["villa_2"], IMAGES["doors_1"]],
        features=["Full-height design", "Double sash opening", "Flush threshold options", "Integrated blinds available", "Premium hardware"],
        benefits=["Abundant natural light", "Elegant aesthetics", "Garden access", "Maximizes views", "Adds value to property"],
        use_cases=["Living rooms", "Master bedrooms", "Garden rooms", "Balconies"],
        specs=[
            ProductSpec(label="Frame Depth", value="70mm - 82mm"),
            ProductSpec(label="Max Height", value="2700mm"),
            ProductSpec(label="Glass Options", value="Double/Triple glazed"),
            ProductSpec(label="Threshold", value="Standard/Low/Flush"),
            ProductSpec(label="Security", value="Multi-point locking"),
        ],
        related_products=["prod-sliding-door", "prod-casement-window"],
        is_featured=True,
        order=6
    ),
]

# Products - Doors
DOORS_PRODUCTS = [
    Product(
        id="prod-sliding-door",
        slug="sliding-doors",
        name="Sliding Doors",
        category="doors",
        product_type="sliding",
        short_description="Elegant sliding doors for seamless indoor-outdoor living and space optimization.",
        description="Our uPVC sliding doors transform living spaces by creating expansive openings to gardens, patios, and balconies. The precision-engineered roller system ensures effortless operation even for large panels, while the interlock design provides exceptional security and weathersealing.",
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/hlb363b7_Sliding.png",
        gallery=["https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/hlb363b7_Sliding.png", IMAGES["villa_1"], IMAGES["interior_1"]],
        features=["Heavy-duty rollers", "Multi-point locking", "Low threshold options", "Mosquito mesh tracks", "Anti-lift security"],
        benefits=["Space saving", "Panoramic views", "Easy operation", "Wheelchair accessible", "Modern aesthetics"],
        use_cases=["Patio access", "Balconies", "Pool areas", "Living rooms"],
        specs=[
            ProductSpec(label="Frame Depth", value="60mm - 100mm"),
            ProductSpec(label="Track Options", value="2/3/4 panel"),
            ProductSpec(label="Max Panel Weight", value="Up to 200kg"),
            ProductSpec(label="Glass Thickness", value="Up to 28mm"),
            ProductSpec(label="Threshold Height", value="20mm/15mm/Flush"),
        ],
        related_products=["prod-bifold-door", "prod-lift-slide-door"],
        is_featured=True,
        order=1
    ),
    Product(
        id="prod-casement-door",
        slug="casement-doors",
        name="Casement Doors",
        category="doors",
        product_type="casement",
        short_description="Traditional hinged doors with modern performance for entrances and interiors.",
        description="Casement doors offer classic styling with contemporary uPVC performance. Available in single or double configurations, they feature robust multi-point locking, premium hinges, and excellent weathersealing. Perfect for main entrances, French doors, and utility access.",
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/jc3yl4ck_Casement.png",
        gallery=["https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/jc3yl4ck_Casement.png", IMAGES["interior_2"], IMAGES["villa_2"]],
        features=["Multi-point locking", "Adjustable hinges", "Reinforced frames", "Panic hardware options", "Glazed/Solid panels"],
        benefits=["Classic aesthetics", "High security", "Durable construction", "Easy maintenance", "Versatile designs"],
        use_cases=["Main entrances", "Back doors", "Utility rooms", "Interior doors"],
        specs=[
            ProductSpec(label="Frame Depth", value="70mm - 82mm"),
            ProductSpec(label="Max Size", value="1200mm x 2400mm per leaf"),
            ProductSpec(label="Security", value="PAS 24 available"),
            ProductSpec(label="Hardware", value="Hoppe/Yale/GU"),
            ProductSpec(label="Fire Rating", value="30 min available"),
        ],
        related_products=["prod-sliding-door", "prod-french-window"],
        is_featured=True,
        order=2
    ),
    Product(
        id="prod-bifold-door",
        slug="bifold-doors",
        name="Bi-fold / Slide & Fold Doors",
        category="doors",
        product_type="bifold",
        short_description="Folding door systems that open up entire walls for dramatic indoor-outdoor connection.",
        description="Bi-fold doors create the ultimate open-plan living experience. Multiple panels fold and slide to one or both sides, opening up entire walls to connect interior spaces with gardens and terraces. Available in configurations from 2 to 7 panels.",
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/bute2vzt_bifold.png",
        gallery=["https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/bute2vzt_bifold.png", IMAGES["villa_1"], IMAGES["doors_1"]],
        features=["Multiple configurations", "Slim sightlines", "Flush tracks", "Top-hung options", "Traffic door function"],
        benefits=["Maximum opening", "Dramatic transformation", "Flexible configurations", "Premium aesthetics", "Property value boost"],
        use_cases=["Living to garden", "Dining areas", "Kitchen extensions", "Entertainment spaces"],
        specs=[
            ProductSpec(label="Frame Depth", value="70mm - 90mm"),
            ProductSpec(label="Configurations", value="2-7 panels"),
            ProductSpec(label="Max Opening", value="Up to 6000mm"),
            ProductSpec(label="Sightline", value="From 135mm"),
            ProductSpec(label="Threshold", value="Low/Rebated/Flush"),
        ],
        related_products=["prod-sliding-door", "prod-lift-slide-door"],
        is_featured=True,
        order=3
    ),
    Product(
        id="prod-lift-slide-door",
        slug="lift-slide-doors",
        name="Lift & Slide Doors",
        category="doors",
        product_type="lift_slide",
        short_description="Premium sliding doors with lift mechanism for ultra-smooth operation of large panels.",
        description="Lift and slide doors represent the pinnacle of sliding door technology. A simple handle turn lifts the door off its seals, allowing even massive panels to glide effortlessly. When closed, the door settles into compression seals for exceptional weather and acoustic performance.",
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/5gv3gt1i_Lift%20and%20slide.png",
        gallery=["https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/5gv3gt1i_Lift%20and%20slide.png", IMAGES["villa_1"], IMAGES["commercial_1"]],
        features=["Lift mechanism", "Extra-large panels", "Compression seals", "Slim profiles", "Motorization option"],
        benefits=["Effortless operation", "Maximum glass area", "Superior insulation", "Architectural statement", "Luxury feel"],
        use_cases=["Grand living spaces", "Luxury villas", "Premium apartments", "Penthouses"],
        specs=[
            ProductSpec(label="Frame Depth", value="90mm - 120mm"),
            ProductSpec(label="Max Panel Size", value="3000mm x 3000mm"),
            ProductSpec(label="Max Panel Weight", value="Up to 400kg"),
            ProductSpec(label="U-Value", value="As low as 1.1 W/m²K"),
            ProductSpec(label="Sound Reduction", value="Up to 47 dB"),
        ],
        related_products=["prod-bifold-door", "prod-sliding-door"],
        order=4
    ),
]

ALL_PRODUCTS = WINDOWS_PRODUCTS + DOORS_PRODUCTS

# Projects/Case Studies
PROJECTS = [
    Project(
        id="proj-dlf-phase5",
        slug="dlf-phase-5-luxury-villa",
        title="DLF Phase 5 Luxury Villa",
        location="DLF Phase 5, Gurugram",
        city="Gurugram",
        project_type="villa",
        product_types=["casement", "sliding", "french"],
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/kfc4qvlx_freepik__create-a-image-of-a-premium-luxury-indian-1st-floo__15016.jpeg",
        gallery=["https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/kfc4qvlx_freepik__create-a-image-of-a-premium-luxury-indian-1st-floo__15016.jpeg", IMAGES["interior_1"], IMAGES["doors_1"]],
        challenge="The homeowners sought to reduce traffic noise from the adjacent main road while maintaining abundant natural light and unobstructed garden views.",
        solution="We installed triple-glazed casement windows throughout the living areas, French windows connecting to the landscaped garden, and premium sliding doors for the master bedroom balcony. All units featured our acoustic-grade sealing system.",
        outcome="Noise levels reduced by 85%. The homeowners reported significant improvement in sleep quality and overall comfort. Energy bills decreased by 30% due to superior thermal insulation.",
        testimonial="Krystal transformed our home. The noise reduction is remarkable—we forgot we live near a busy road. The quality and finish are outstanding.",
        testimonial_author="Mr. Rajesh Sharma, Homeowner",
        is_featured=True
    ),
    Project(
        id="proj-golf-course-apartment",
        slug="golf-course-road-penthouse",
        title="Golf Course Road Penthouse",
        location="Golf Course Road, Gurugram",
        city="Gurugram",
        project_type="residential",
        product_types=["sliding", "tilt_turn", "fixed"],
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/o6xu4094_Pent%20House.jpeg",
        gallery=["https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/o6xu4094_Pent%20House.jpeg", IMAGES["glass_1"], IMAGES["interior_2"]],
        challenge="A 4,500 sq ft penthouse requiring floor-to-ceiling glazing that could withstand high-rise wind loads while providing thermal comfort and dust protection.",
        solution="Custom-engineered lift & slide doors for the terrace, tilt & turn windows for controlled ventilation in bedrooms, and structural fixed glazing for the living room's panoramic city views.",
        outcome="Achieved U-value of 1.3 W/m²K across all glazing. Zero dust ingress reported. Annual air conditioning costs reduced by 40%.",
        testimonial="The engineering precision and attention to detail exceeded our expectations. Krystal's team handled the complex installation flawlessly.",
        testimonial_author="Ar. Priya Malhotra, Interior Designer",
        is_featured=True
    ),
    Project(
        id="proj-sohna-commercial",
        slug="sohna-road-office-complex",
        title="Sohna Road Office Complex",
        location="Sohna Road, Gurugram",
        city="Gurugram",
        project_type="commercial",
        product_types=["fixed", "casement", "sliding"],
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/45zdqx3l_Office.jpeg",
        gallery=["https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/45zdqx3l_Office.jpeg", IMAGES["commercial_1"]],
        challenge="A 15-floor office building requiring energy-efficient facade glazing that meets green building standards and provides consistent thermal comfort across all floors.",
        solution="Full facade solution with high-performance fixed glazing, strategically placed casement windows for natural ventilation in common areas, and automated sliding doors at entrance points.",
        outcome="Building achieved IGBC Gold certification. 45% reduction in HVAC energy consumption compared to similar buildings with conventional glazing.",
        is_featured=True
    ),
]

# Blog Posts
BLOG_POSTS = [
    BlogPost(
        id="blog-acoustic-comfort",
        slug="guide-to-acoustic-comfort-upvc-windows",
        title="Complete Guide to Acoustic Comfort with uPVC Windows",
        excerpt="Discover how uPVC windows can transform your noisy urban home into a peaceful sanctuary.",
        content="""Living in urban India means battling constant noise—from traffic, construction, and neighborhood activity. The good news? Modern uPVC windows can reduce noise by up to 45 dB, transforming your home into a peaceful retreat.

## Understanding Sound Insulation

Sound reduction in windows depends on three factors:

1. **Glass thickness and type**: Laminated acoustic glass performs best
2. **Air gap in double glazing**: Wider gaps absorb more sound
3. **Frame sealing quality**: Multi-chamber profiles with premium gaskets

## Which Windows Work Best?

For maximum acoustic performance, we recommend:

- **Tilt & Turn Windows**: Multi-point compression sealing
- **Triple Glazing**: Three panes with varying thicknesses
- **Laminated Glass**: PVB interlayer absorbs sound vibrations

## Real Results

Our clients in Gurugram typically experience:
- 35-42 dB noise reduction with standard double glazing
- 40-47 dB reduction with acoustic-spec laminated glass
- Near-silent interiors even on busy roads

## Installation Matters

Even the best windows fail if poorly installed. Ensure:
- Proper frame leveling and shimming
- Complete perimeter sealing
- No gaps between wall and frame

Ready to enjoy peaceful living? Contact Krystal for a noise assessment.""",
        category="acoustic",
        tags=["noise reduction", "acoustic glass", "urban living", "sleep quality"],
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/upquus9f_Acoustics.jpeg",
        read_time=6
    ),
    BlogPost(
        id="blog-energy-efficiency",
        slug="energy-efficient-windows-delhi-ncr",
        title="Energy Efficient Windows for Delhi NCR's Extreme Climate",
        excerpt="How the right windows can cut your AC bills by 40% while keeping your home comfortable year-round.",
        content="""Delhi NCR experiences extreme temperatures—from 45°C summers to near-freezing winters. Your windows play a crucial role in maintaining comfort and controlling energy costs.

## The U-Value Factor

U-value measures heat transfer through a window. Lower is better:
- Single glazed: U-value 5.0+ (very poor)
- Standard double glazed: U-value 2.8-3.0
- High-performance double glazed: U-value 1.4-1.6
- Triple glazed: U-value 0.8-1.2

## Solar Heat Gain

In hot climates, controlling solar heat gain is critical:

- **Low-E glass**: Reflects infrared radiation
- **Tinted glass**: Reduces visible light and heat
- **Reflective coatings**: Maximum heat rejection

## Recommended Configurations

**For South/West facing windows:**
- Double glazed with Low-E on surface 2
- Solar control tint
- Consider external shading

**For North/East facing:**
- Standard double glazing often sufficient
- Maximize natural light

## Cost Savings

Typical savings with energy-efficient uPVC windows:
- 30-40% reduction in AC costs
- Improved thermal comfort
- Reduced carbon footprint
- Government incentives may apply

Invest in quality windows—they pay for themselves within 3-5 years.""",
        category="energy",
        tags=["energy saving", "thermal insulation", "AC costs", "low-e glass"],
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/jwhyl7lq_Energy%20Homes.jpeg",
        read_time=5
    ),
    BlogPost(
        id="blog-maintenance-guide",
        slug="upvc-window-maintenance-guide",
        title="Complete uPVC Window Maintenance Guide",
        excerpt="Simple steps to keep your uPVC windows performing perfectly for decades.",
        content="""uPVC windows are designed for minimal maintenance, but a little care goes a long way in ensuring they perform optimally for 25+ years.

## Monthly Cleaning

**Frames:**
1. Wipe with damp cloth and mild soap
2. Never use abrasive cleaners or solvents
3. Clean drainage slots to prevent water buildup

**Glass:**
1. Use standard glass cleaner
2. Clean both sides for best clarity
3. Check for seal condensation (indicates failure)

## Quarterly Maintenance

**Hardware:**
- Apply light machine oil to hinges and locks
- Check handle operation—should be smooth
- Test multi-point locks engage fully

**Seals and Gaskets:**
- Inspect for cracking or shrinkage
- Clean with silicone spray (not petroleum-based)
- Replace if showing wear

## Annual Inspection

Schedule professional inspection for:
- Frame alignment and adjustment
- Hardware tension and security
- Seal integrity and weatherproofing
- Glass unit condition

## Warning Signs

Contact us if you notice:
- Condensation between glass panes
- Drafts around closed windows
- Difficulty opening or closing
- Visible seal damage

Proper maintenance protects your investment and ensures continued performance.""",
        category="maintenance",
        tags=["maintenance", "cleaning", "care guide", "longevity"],
        hero_image="https://customer-assets.emergentagent.com/job_upvc-elegance/artifacts/785jsiwm_Maintenance.jpeg",
        read_time=4
    ),
]

# FAQs
FAQS = [
    FAQ(id="faq-1", question="What is uPVC and why is it better than aluminium?", answer="uPVC (unplasticized Polyvinyl Chloride) is a rigid, durable plastic that doesn't conduct heat or cold like aluminium. This means uPVC windows provide 3x better thermal insulation, reduce condensation, and offer superior acoustic performance. They're also maintenance-free, never need painting, and won't corrode.", category="general", order=1, is_featured=True),
    FAQ(id="faq-2", question="How long do uPVC windows last?", answer="Quality uPVC windows from reputable manufacturers like Krystal last 25-30 years with proper care. The frames don't rot, rust, or deteriorate from UV exposure. Hardware may need servicing or replacement after 10-15 years depending on usage.", category="general", order=2, is_featured=True),
    FAQ(id="faq-3", question="What is the cost of uPVC windows per square foot?", answer="uPVC window prices in Delhi NCR typically range from ₹450-850 per square foot depending on the profile system, glass type, and hardware selected. Premium European profiles with triple glazing and German hardware will be at the higher end, while standard double-glazed units are more economical.", category="general", order=3, is_featured=True),
    FAQ(id="faq-4", question="Do you provide installation services?", answer="Yes, Krystal provides complete turnkey solutions including precise site measurement, custom fabrication, professional installation, and after-sales service. Our trained installation teams ensure perfect fitting, proper sealing, and optimal performance of every window and door.", category="installation", order=4),
    FAQ(id="faq-5", question="What warranty do you offer?", answer="We provide comprehensive warranty coverage: 10 years on uPVC profiles against discoloration and warping, 5 years on hardware, and 5 years on sealed glass units. Installation workmanship is guaranteed for 2 years. Extended warranty options are available.", category="general", order=5, is_featured=True),
    FAQ(id="faq-6", question="Can uPVC windows be customized in different colors?", answer="Absolutely! While white is standard, we offer 50+ laminate finishes including wood grains (oak, walnut, mahogany), solid colors (grey, black, cream), and metallic options. Laminate finishes are applied during manufacturing and are highly durable.", category="windows", order=6),
    FAQ(id="faq-7", question="How much noise can uPVC windows reduce?", answer="Standard double-glazed uPVC windows reduce noise by 30-35 dB. With acoustic laminated glass and proper sealing, noise reduction can reach 42-47 dB—enough to make a busy road sound like a quiet library. We recommend site assessment for specific recommendations.", category="windows", order=7, is_featured=True),
    FAQ(id="faq-8", question="Are uPVC windows safe and secure?", answer="Yes, uPVC windows with multi-point locking systems exceed standard security requirements. The robust frame construction, reinforced with galvanized steel where needed, resists forced entry. We offer upgraded security hardware and PAS 24 certified options for enhanced protection.", category="windows", order=8),
    FAQ(id="faq-9", question="How do I clean and maintain uPVC windows?", answer="uPVC is virtually maintenance-free. Simply wipe frames with a damp cloth and mild soap. Avoid abrasive cleaners. Lubricate hinges and locks annually with light machine oil. Clean drainage holes to prevent water buildup. That's it—no painting or special treatments needed.", category="maintenance", order=9),
    FAQ(id="faq-10", question="What areas do you service?", answer="We serve all of Delhi NCR including Gurugram, Delhi, Noida, Greater Noida, Faridabad, and Ghaziabad. Our manufacturing facility in Gurugram enables quick delivery across the region. Site visits and installations are available throughout our service area.", category="general", order=10),
]

# Testimonials
TESTIMONIALS = [
    Testimonial(id="test-1", name="Rajesh Sharma", role="homeowner", location="DLF Phase 5, Gurugram", content="Krystal transformed our home. The noise reduction is remarkable—we forgot we live near a busy road. The quality and finish are outstanding. Highly recommend their casement windows.", rating=5, is_featured=True),
    Testimonial(id="test-2", name="Ar. Priya Malhotra", role="architect", company="Studio Priya", location="Golf Course Road, Gurugram", content="As an architect, I'm particular about quality and precision. Krystal delivers on both. Their lift & slide doors are exceptional—smooth operation, slim profiles, perfect installation.", rating=5, is_featured=True),
    Testimonial(id="test-3", name="Vikram Kapoor", role="builder", company="Kapoor Constructions", location="Sohna Road, Gurugram", content="We've partnered with Krystal for three projects now. Consistent quality, on-time delivery, and excellent after-sales support. Their team understands commercial project requirements.", rating=5, is_featured=True),
    Testimonial(id="test-4", name="Meera Gupta", role="homeowner", location="Sector 57, Gurugram", content="Our AC bills dropped by almost 40% after installing Krystal's double-glazed windows. The summer heat stays out, and winter warmth stays in. Best investment we've made.", rating=5, is_featured=True),
    Testimonial(id="test-5", name="Dr. Sanjay Mehta", role="homeowner", location="DLF Phase 2, Gurugram", content="Excellent product and professional service. The tilt & turn windows are perfect for our bedroom—secure ventilation without opening fully. Very happy with our choice.", rating=5),
]

# Cities/Service Areas
CITIES = [
    City(id="city-gurugram", name="Gurugram", slug="gurugram", state="Haryana", description="Our home base—we know Gurugram's architectural landscape intimately. From DLF phases to Golf Course Road, Sohna Road to New Gurugram, we've transformed thousands of homes with premium uPVC solutions."),
    City(id="city-delhi", name="Delhi", slug="delhi", state="Delhi", description="Serving all of Delhi from South Delhi's elegant homes to North Delhi's vibrant neighborhoods. Our uPVC windows provide the noise reduction and thermal comfort Delhi homes need."),
    City(id="city-noida", name="Noida", slug="noida", state="Uttar Pradesh", description="From Noida's high-rise apartments to sector bungalows, we provide tailored uPVC solutions. Our sliding windows and doors are particularly popular for balcony applications."),
    City(id="city-faridabad", name="Faridabad", slug="faridabad", state="Haryana", description="Quality uPVC windows and doors for Faridabad homes. We understand the local climate and architectural preferences, delivering solutions that perform year-round."),
    City(id="city-ghaziabad", name="Ghaziabad", slug="ghaziabad", state="Uttar Pradesh", description="Serving Ghaziabad with premium uPVC products. Our acoustic solutions are especially valued given the area's urban density and noise challenges."),
]

# Design Studio Items
COLOR_FINISHES = [
    ColorFinish(id="color-white", name="Brilliant White", code="#FFFFFF", category="solid", image=IMAGES["texture_white"], is_popular=True),
    ColorFinish(id="color-cream", name="Cream", code="#FFFDD0", category="solid", image=IMAGES["texture_white"]),
    ColorFinish(id="color-grey", name="Anthracite Grey", code="#383E42", category="solid", image=IMAGES["texture_white"], is_popular=True),
    ColorFinish(id="color-oak", name="Golden Oak", code="#B5651D", category="wood_texture", image=IMAGES["texture_wood"], is_popular=True),
    ColorFinish(id="color-walnut", name="Walnut", code="#5D4037", category="wood_texture", image=IMAGES["texture_wood"]),
    ColorFinish(id="color-mahogany", name="Mahogany", code="#4E0000", category="wood_texture", image=IMAGES["texture_wood"]),
]

GLASS_OPTIONS = [
    GlassOption(id="glass-clear", name="Clear Float Glass", description="Standard transparent glass for maximum light transmission.", benefits=["Maximum natural light", "Clear views", "Cost effective"], image=IMAGES["glass_1"]),
    GlassOption(id="glass-tinted", name="Tinted Glass", description="Solar control tinted glass reduces heat and glare.", benefits=["Reduces solar heat", "Glare reduction", "Privacy enhancement"], image=IMAGES["glass_1"]),
    GlassOption(id="glass-lowe", name="Low-E Glass", description="Low emissivity coating reflects heat while allowing light.", benefits=["Superior insulation", "UV protection", "Energy savings"], image=IMAGES["glass_2"]),
    GlassOption(id="glass-laminated", name="Laminated Glass", description="PVB interlayer provides safety, security, and acoustic benefits.", benefits=["Safety if broken", "Noise reduction", "UV blocking"], image=IMAGES["glass_2"]),
    GlassOption(id="glass-frosted", name="Frosted/Obscure Glass", description="Privacy glass that allows light but obscures view.", benefits=["Privacy", "Soft light", "Decorative"], image=IMAGES["glass_1"]),
]

HARDWARE_ITEMS = [
    Hardware(id="hw-handles", name="Premium Handles", category="handles", description="Ergonomic handles from Hoppe, Roto, and Siegenia in various finishes.", image=IMAGES["hardware_1"]),
    Hardware(id="hw-hinges", name="Adjustable Hinges", category="hinges", description="3D adjustable hinges for perfect alignment and smooth operation.", image=IMAGES["hardware_1"]),
    Hardware(id="hw-locks", name="Multi-point Locks", category="locks", description="Security multi-point locking systems engaging at multiple points.", image=IMAGES["hardware_1"]),
    Hardware(id="hw-mesh", name="Mosquito Mesh", category="accessories", description="Integrated fly screens in various mesh types—fiberglass, SS, and pleated.", image=IMAGES["hardware_1"]),
]

DOWNLOADS = [
    Download(id="dl-brochure", title="Krystal Product Brochure", description="Complete catalog of our uPVC windows and doors with specifications.", category="brochure", file_url="#", file_size="4.2 MB"),
    Download(id="dl-care", title="Care & Maintenance Guide", description="Tips for keeping your uPVC products in perfect condition.", category="care_guide", file_url="#", file_size="1.1 MB"),
    Download(id="dl-warranty", title="Warranty Policy Document", description="Detailed terms and conditions of our product warranties.", category="warranty", file_url="#", file_size="520 KB"),
    Download(id="dl-cert", title="Quality Certifications", description="ISO and quality certifications for our manufacturing processes.", category="certification", file_url="#", file_size="2.3 MB"),
]

GLOBAL_SETTINGS = GlobalSettings(
    contact=ContactInfo(
        phone="+91 9220905087",
        whatsapp="+91 9599614440",
        email="sales@krystalmagicworld.com",
        address="403, 4th Floor, Greenwood Plaza, Sector-45, Near HSBC Building, Gurgaon - 122003 (Haryana)"
    )
)
