// Philips E-Commerce Master Information Architecture & Product Data

const PHILIPS_DATA = {
  // Information Architecture 6 Main Navigation Pillars
  mainNavigation: [
    {
      id: "home-appliances",
      name: "Home Appliances",
      icon: "fa-house",
      subcategories: [
        "Light",
        "Air Purifiers",
        "Air Fryers",
        "Kitchen Appliances",
        "Irons & Steamers",
        "Coffee Makers",
        "Vacuum Cleaners",
        "Water Solutions"
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: "fa-heart-pulse",
      subcategories: [
        "Health Monitors",
        "Personal Health",
        "Sleep & Respiratory",
        "Health Devices",
        "Therapy Devices",
        "Diagnostic Care",
        "Health Accessories",
        "Health Solutions"
      ]
    },
    {
      id: "personal-care",
      name: "Personal Care",
      icon: "fa-user-tie",
      subcategories: [
        "Men's Grooming",
        "Women's Grooming",
        "Oral Care",
        "Hair Care",
        "Skin Care",
        "Beauty",
        "Shavers",
        "Accessories"
      ]
    },
    {
      id: "support",
      name: "Support",
      icon: "fa-headset",
      subcategories: [
        "FAQs",
        "Contact Us",
        "Warranty",
        "Repairs",
        "Manuals",
        "Help Center",
        "Track Order",
        "Product Registration"
      ]
    },
    {
      id: "cart",
      name: "Cart",
      icon: "fa-cart-shopping",
      subcategories: [
        "Orders",
        "Wishlist",
        "Addresses",
        "Payments",
        "Promo Codes",
        "Order Summary",
        "Track Order",
        "Returns & Refunds"
      ]
    },
    {
      id: "profile",
      name: "Profile",
      icon: "fa-user",
      subcategories: [
        "Orders",
        "Wishlist",
        "Addresses",
        "Settings",
        "Account Details",
        "Notifications",
        "Saved Cards",
        "Logout"
      ]
    }
  ],

  // 16 Homepage Category Grid Items (Exact Order with Matching Studio Images)
  homepageCategories: [
    { name: "Light", icon: "fa-lightbulb", parent: "Home Appliances", image: "images/smart_led_bulb_1785486508575.jpg" },
    { name: "Air Purifiers", icon: "fa-wind", parent: "Home Appliances", image: "images/air_purifier_1785486550904.jpg" },
    { name: "Air Fryers", icon: "fa-utensils", parent: "Home Appliances", image: "images/air_fryer_1785486565523.jpg" },
    { name: "Kitchen Appliances", icon: "fa-blender", parent: "Home Appliances", image: "images/food_processor_1785486581783.jpg" },
    { name: "Irons & Steamers", icon: "fa-shirt", parent: "Home Appliances", image: "images/garment_steamer_1785486595850.jpg" },
    { name: "Coffee Makers", icon: "fa-mug-hot", parent: "Home Appliances", image: "images/espresso_machine_1785486609663.jpg" },
    { name: "Vacuum Cleaners", icon: "fa-broom", parent: "Home Appliances", image: "images/stick_vacuum_1785486622668.jpg" },
    { name: "Water Solutions", icon: "fa-glass-water", parent: "Home Appliances", image: "images/water_purifier_1785486637513.jpg" },
    { name: "Health Monitors", icon: "fa-notes-medical", parent: "Healthcare", image: "images/bp_monitor_1785486652645.jpg" },
    { name: "Personal Health", icon: "fa-heartbeat", parent: "Healthcare", image: "images/pulse_oximeter_1785486668779.jpg" },
    { name: "Men's Grooming", icon: "fa-user-ninja", parent: "Personal Care", image: "images/shaver_s9000_1785486684249.jpg" },
    { name: "Women's Grooming", icon: "fa-gem", parent: "Personal Care", image: "images/epilator_woman_1785486699058.jpg" },
    { name: "Oral Care", icon: "fa-tooth", parent: "Personal Care", image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80" },
    { name: "Hair Care", icon: "fa-scissors", parent: "Personal Care", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
    { name: "Skin Care", icon: "fa-spa", parent: "Personal Care", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80" },
    { name: "Shavers", icon: "fa-shield-halved", parent: "Personal Care", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80" }
  ],

  // Structured products array with 1:1 matching unique studio images for every product card
  products: [
    {
      id: "hue-smart-bulb-rgb",
      name: "Philips Hue Smart LED Bulb E27 Starter Kit",
      category: "Light",
      parentCategory: "Home Appliances",
      subcategory: "Light",
      price: 2499,
      originalPrice: 3499,
      discount: 28,
      rating: 4.8,
      reviewCount: 342,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "Best Seller",
      image: "images/smart_led_bulb_1785486508575.jpg",
      variants: [
        { name: "Single Bulb", price: 2499, originalPrice: 3499 },
        { name: "Starter Kit (3 Bulbs + Hue Bridge)", price: 8999, originalPrice: 11999 }
      ],
      shortDescription: "16 million colors, app scheduling, and voice control with Alexa & Google Assistant.",
      features: [
        "16 million colors & warm to cool white light shades",
        "Seamless synchronization with Spotify music, TV & movies",
        "Control up to 10 lights via Bluetooth or 50 with Hue Bridge",
        "Energy efficient 9W LED (equivalent to 60W traditional bulb)"
      ],
      specs: {
        "Subcategory": "Light",
        "Fitting": "E27 Standard Screw",
        "Wattage": "9 Watts (806 Lumens)",
        "Color Temp": "2000K - 6500K Hue RGB",
        "Warranty": "2 Years Official Warranty"
      }
    },
    {
      id: "air-purifier-3000i",
      name: "Philips Air Purifier Series 3000i Dual Scan",
      category: "Air Purifiers",
      parentCategory: "Home Appliances",
      subcategory: "Air Purifiers",
      price: 22999,
      originalPrice: 29999,
      discount: 23,
      rating: 4.8,
      reviewCount: 195,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "HEPA H13",
      image: "images/air_purifier_1785486550904.jpg",
      variants: [
        { name: "Large Room (Series 3000i)", price: 22999, originalPrice: 29999 }
      ],
      shortDescription: "Removes 99.97% of airborne viruses, allergens, and PM2.5 pollutants in under 6 minutes.",
      features: [
        "CADR of 520 m³/h cleans rooms up to 62 m²",
        "3-layer NanoProtect HEPA filter",
        "AeraSense Dual Scan real-time air quality display",
        "Ultra-quiet Sleep mode at 15 dB"
      ],
      specs: {
        "Subcategory": "Air Purifiers",
        "CADR": "520 m³/h",
        "Coverage": "Up to 62 m² / 667 sq. ft.",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "airfryer-xxl-digital",
      name: "Philips Airfryer XXL Smart Sensing HD9860/90",
      category: "Air Fryers",
      parentCategory: "Home Appliances",
      subcategory: "Air Fryers",
      price: 18999,
      originalPrice: 24999,
      discount: 24,
      rating: 4.9,
      reviewCount: 512,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "Smart Sensing",
      image: "images/air_fryer_1785486565523.jpg",
      variants: [
        { name: "4.1L Compact", price: 7999, originalPrice: 9999 },
        { name: "7.2L XXL Smart Sensing", price: 18999, originalPrice: 24999 }
      ],
      shortDescription: "Smart Sensing technology automatically adjusts time & temperature for crisp dishes with 90% less oil.",
      features: [
        "Smart Sensing Tech automatically adjusts time & temp",
        "Fat Removal technology separates excess fat",
        "XXL capacity fits a whole chicken",
        "NutriU app with 500+ recipes"
      ],
      specs: {
        "Subcategory": "Air Fryers",
        "Capacity": "7.2 Liters",
        "Power": "2225 Watts",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "kitchen-master-processor",
      name: "Philips Viva Collection Food Processor & Mixer Grinder",
      parentCategory: "Home Appliances",
      subcategory: "Kitchen Appliances",
      price: 8999,
      originalPrice: 11999,
      discount: 25,
      rating: 4.7,
      reviewCount: 215,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "PowerChop Tech",
      image: "images/food_processor_1785486581783.jpg",
      variants: [
        { name: "Processor + 4 Jars Kit", price: 8999, originalPrice: 11999 }
      ],
      shortDescription: "PowerChop technology combines blade shape and cutting angle for superior chopping results.",
      features: [
        "850W motor for powerful processing",
        "31+ functions for chopping, slicing, kneading & whipping",
        "Fast preparation with large feeding tube",
        "Color coded speed and accessories guide"
      ],
      specs: {
        "Subcategory": "Kitchen Appliances",
        "Motor": "850 Watts",
        "Bowl Capacity": "2.1 Litres",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "garment-steamer-series3000",
      name: "Philips EasyTouch Stand Garment Steamer",
      parentCategory: "Home Appliances",
      subcategory: "Irons & Steamers",
      price: 6499,
      originalPrice: 8499,
      discount: 23,
      rating: 4.7,
      reviewCount: 128,
      inStock: true,
      featured: false,
      bestSeller: false,
      badge: "Quick Crease Removal",
      image: "images/garment_steamer_1785486595850.jpg",
      variants: [
        { name: "Standard Steamer", price: 6499, originalPrice: 8499 }
      ],
      shortDescription: "De-wrinkles delicate garments and sanitizes fabrics with continuous powerful steam.",
      features: [
        "20% more powerful steam with 35g/min continuous output",
        "Integrated double adjustable pole",
        "1.4L detachable water tank",
        "Kills 99.9% of bacteria and dust mites"
      ],
      specs: {
        "Subcategory": "Irons & Steamers",
        "Tank Size": "1.4 Liters",
        "Steam Output": "35 g/min",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "barista-espresso-maker",
      name: "Philips LatteGo 5400 Fully Automatic Espresso Machine",
      parentCategory: "Home Appliances",
      subcategory: "Coffee Makers",
      price: 54999,
      originalPrice: 69999,
      discount: 21,
      rating: 4.9,
      reviewCount: 88,
      inStock: true,
      featured: true,
      bestSeller: false,
      badge: "LatteGo System",
      image: "images/espresso_machine_1785486609663.jpg",
      variants: [
        { name: "LatteGo 5400 Premium", price: 54999, originalPrice: 69999 }
      ],
      shortDescription: "Silky smooth milk froth with high-speed LatteGo system and 12 fresh bean coffee varieties.",
      features: [
        "12 delicious coffee varieties at your fingertips",
        "Fastest to clean milk system with 2 parts & no tubes",
        "TFT color touch display with 4 user profiles",
        "100% pure ceramic grinders for 20,000 cups"
      ],
      specs: {
        "Subcategory": "Coffee Makers",
        "Pressure": "15 Bar",
        "Milk System": "LatteGo 2-piece No-tube",
        "Warranty": "2 Years Global Warranty"
      }
    },
    {
      id: "speedpro-cordless-vacuum",
      name: "Philips SpeedPro Max Cordless Stick Vacuum Cleaner",
      parentCategory: "Home Appliances",
      subcategory: "Vacuum Cleaners",
      price: 24999,
      originalPrice: 32999,
      discount: 24,
      rating: 4.8,
      reviewCount: 174,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "360 Suction",
      image: "images/stick_vacuum_1785486622668.jpg",
      variants: [
        { name: "SpeedPro Max Cordless", price: 24999, originalPrice: 32999 }
      ],
      shortDescription: "360-degree suction nozzle captures dust and dirt faster with every stroke, forwards and backwards.",
      features: [
        "360° suction nozzle captures up to 99.7% of dust",
        "PowerBlade digital motor creates high airflow (>1000 L/min)",
        "Up to 65 minutes of Eco cleaning power",
        "Integrated handheld unit & crevice tool"
      ],
      specs: {
        "Subcategory": "Vacuum Cleaners",
        "Runtime": "65 Minutes Cordless",
        "Airflow": ">1000 L/min",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "aquashield-water-purifier",
      name: "Philips AquaShield UV Water Purifier Dispenser",
      parentCategory: "Home Appliances",
      subcategory: "Water Solutions",
      price: 14999,
      originalPrice: 18999,
      discount: 21,
      rating: 4.8,
      reviewCount: 142,
      inStock: true,
      featured: false,
      bestSeller: false,
      badge: "UV-LED Sterilization",
      image: "images/water_purifier_1785486637513.jpg",
      variants: [
        { name: "AquaShield UV Countertop", price: 14999, originalPrice: 18999 }
      ],
      shortDescription: "Instant heating technology with multi-stage RO & UV-LED purification for pure hot water in 3 seconds.",
      features: [
        "Instant heating system delivers hot water in 3 seconds",
        "Multi-stage Micro X-Clean filtration removes 99.9% bacteria",
        "UV-LED automatically sterilizes water tank every 1 hour",
        "6 preset temperatures (Ambient, 45°C, 55°C, 85°C, 95°C)"
      ],
      specs: {
        "Subcategory": "Water Solutions",
        "Heating Time": "3 Seconds",
        "Sterilization": "UV-LED Automatic Cycle",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "blood-pressure-monitor-smart",
      name: "Philips Smart Upper Arm Blood Pressure Monitor",
      parentCategory: "Healthcare",
      subcategory: "Health Monitors",
      price: 3999,
      originalPrice: 4999,
      discount: 20,
      rating: 4.8,
      reviewCount: 230,
      inStock: true,
      featured: true,
      bestSeller: false,
      badge: "Clinical Accuracy",
      image: "images/bp_monitor_1785486652645.jpg",
      variants: [
        { name: "Bluetooth Smart Monitor", price: 3999, originalPrice: 4999 }
      ],
      shortDescription: "Clinically validated blood pressure & heart rate readings synced directly to HealthSuite app.",
      features: [
        "Dual user tracking with 60 memories each",
        "Irregular heartbeat detection alarm",
        "Soft cuff fits arms 22cm to 42cm",
        "Large backlit LCD screen"
      ],
      specs: {
        "Subcategory": "Health Monitors",
        "Validation": "Clinical ESH Grade",
        "Sync": "Bluetooth HealthSuite App",
        "Warranty": "2 Years Replacement Warranty"
      }
    },
    {
      id: "oximeter-pulse-spot",
      name: "Philips HeartPulse Finger Pulse Oximeter Spot Check",
      parentCategory: "Healthcare",
      subcategory: "Personal Health",
      price: 2199,
      originalPrice: 2995,
      discount: 26,
      rating: 4.8,
      reviewCount: 410,
      inStock: true,
      featured: false,
      bestSeller: true,
      badge: "SpO2 Precision",
      image: "images/pulse_oximeter_1785486668779.jpg",
      variants: [
        { name: "Medical Oximeter", price: 2199, originalPrice: 2995 }
      ],
      shortDescription: "Hospital-grade SpO2 blood oxygen and pulse rate monitoring in 8 seconds.",
      features: [
        "Opto-electronic sensor accurate to ±2% SpO2 margin",
        "Dual-color OLED screen with 4 display directions",
        "Auto power-off after 8 seconds of inactivity",
        "Hypoallergenic medical silicone chamber"
      ],
      specs: {
        "Subcategory": "Personal Health",
        "Accuracy": "±2% SpO2",
        "Display": "OLED Multi-Directional",
        "Warranty": "2 Years Replacement Warranty"
      }
    },
    {
      id: "shaver-s9000-prestige",
      name: "Philips Shaver Series 9000 Prestige with SenseIQ",
      parentCategory: "Personal Care",
      subcategory: "Men's Grooming",
      price: 19999,
      originalPrice: 24999,
      discount: 20,
      rating: 4.9,
      reviewCount: 289,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "Flagship Shaver",
      image: "images/shaver_s9000_1785486684249.jpg",
      variants: [
        { name: "Standard Pack", price: 19999, originalPrice: 24999 },
        { name: "Prestige Kit (with Wireless Charging Pad)", price: 23999, originalPrice: 28999 }
      ],
      shortDescription: "Ultimate skin comfort & closeness with NanoTech dual precision blades and pressure guard sensors.",
      features: [
        "NanoTech Precision blades cut with 150,000 actions per min",
        "Hydro SkinGlide coating reduces friction by 50%",
        "Power Adapt Sensor reads beard density 500 times per second",
        "Qi Wireless Charging Pad included"
      ],
      specs: {
        "Subcategory": "Men's Grooming",
        "Blades": "NanoTech Precision",
        "Battery": "60 Mins Cordless",
        "Warranty": "2 Years Official Warranty"
      }
    },
    {
      id: "epilator-series-8000",
      name: "Philips Satinelle Advanced Cordless Epilator Series 8000",
      parentCategory: "Personal Care",
      subcategory: "Women's Grooming",
      price: 5999,
      originalPrice: 7999,
      discount: 25,
      rating: 4.7,
      reviewCount: 162,
      inStock: true,
      featured: true,
      bestSeller: false,
      badge: "Smooth Skin",
      image: "images/epilator_woman_1785486699058.jpg",
      variants: [
        { name: "Epilator + 5 Accessories Kit", price: 5999, originalPrice: 7999 }
      ],
      shortDescription: "Extra-wide epilator head with ceramic tweezers for gentle hair removal down to 0.5mm.",
      features: [
        "Ceramic tweezers firmly catch fine hairs down to 0.5mm",
        "Extra-wide epilation head covers 30% more skin per stroke",
        "Wet & Dry usage for gentle bath or shower routine",
        "Opti-light illuminates fine hairs for perfect results"
      ],
      specs: {
        "Subcategory": "Women's Grooming",
        "Tweezers": "Hypoallergenic Ceramic",
        "Runtime": "40 Minutes Cordless",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "sonicare-diamondclean-9000",
      name: "Philips Sonicare Electric Toothbrush",
      parentCategory: "Personal Care",
      subcategory: "Oral Care",
      price: 14999,
      originalPrice: 18999,
      discount: 21,
      rating: 4.9,
      reviewCount: 410,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "Dentist Recommended",
      image: "images/sonicare_toothbrush_1785513535597.jpg",
      variants: [
        { name: "Single Handle + Charging Glass", price: 14999, originalPrice: 18999 }
      ],
      shortDescription: "Removes up to 10x more plaque than a manual toothbrush with 62,000 bristle movements per minute.",
      features: [
        "Sonic technology pulses water between teeth",
        "4 Modes: Clean, White+, Gum Health, Deep Clean+",
        "Smart Pressure Sensor alerts if pressing too hard",
        "Glass Charging Cup & USB Travel Case"
      ],
      specs: {
        "Subcategory": "Oral Care",
        "Speed": "62,000 movements/min",
        "Battery": "14 Days",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "smart-hair-dryer",
      name: "Philips Smart Hair Dryer",
      parentCategory: "Personal Care",
      subcategory: "Hair Care",
      price: 12999,
      originalPrice: 15999,
      discount: 18,
      rating: 4.8,
      reviewCount: 96,
      inStock: true,
      featured: false,
      bestSeller: false,
      badge: "SenseIQ Hydration",
      image: "images/smart_hair_dryer_1785515720018.jpg",
      variants: [
        { name: "SenseIQ Dryer + 3 Nozzles", price: 12999, originalPrice: 15999 }
      ],
      shortDescription: "Senses hair temperature continuously and adapts airflow to lock in up to 95% of natural hair moisture.",
      features: [
        "SenseIQ infrared sensor reads hair temp 4,000 times per session",
        "Locks in up to 95% of hair's natural moisture",
        "2x Ionic conditioning for frizz-free shine",
        "Includes Styling Nozzle, Curl Diffuser & Scalp Massager"
      ],
      specs: {
        "Subcategory": "Hair Care",
        "Tech": "SenseIQ Infrared Hydration",
        "Power": "1800 Watts",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "facial-cleanser-visapure",
      name: "Philips VisaPure Advanced Facial Cleansing & Massage System",
      parentCategory: "Personal Care",
      subcategory: "Skin Care",
      price: 9999,
      originalPrice: 12999,
      discount: 23,
      rating: 4.7,
      reviewCount: 110,
      inStock: true,
      featured: false,
      bestSeller: false,
      badge: "Radiant Skin",
      image: "images/facial_cleanser_visapure_1785515741981.jpg",
      variants: [
        { name: "VisaPure Kit + 3 Heads", price: 9999, originalPrice: 12999 }
      ],
      shortDescription: "DualMotion technology combines rotation and vibration for deep cleansing and facial lymphatic massage.",
      features: [
        "10x more effective cleansing than manual washing",
        "Revitalizing Massage head boosts blood circulation",
        "Fresh Eye head cools tired eyes with 120 nano-vibrations/sec",
        "Intelligent Head Recognition auto-adjusts speed"
      ],
      specs: {
        "Subcategory": "Skin Care",
        "Tech": "DualMotion Rotation & Pulsation",
        "Waterproofing": "100% Waterproof",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "beard-trimmer-bt7000",
      name: "Philips Series 7000 Vacuum Beard Trimmer",
      parentCategory: "Personal Care",
      subcategory: "Shavers",
      price: 1999,
      originalPrice: 2995,
      discount: 33,
      rating: 4.6,
      reviewCount: 840,
      inStock: true,
      featured: false,
      bestSeller: true,
      badge: "Vacuum Clean",
      image: "images/beard_trimmer_bt7000_1785515767725.jpg",
      variants: [
        { name: "Vacuum Trimmer BT7501", price: 1999, originalPrice: 2995 }
      ],
      shortDescription: "Integrated vacuum system captures up to 90% of cut hairs for mess-free trimming.",
      features: [
        "DualCut self-sharpening stainless steel blades",
        "20 Lock-in length settings (0.5mm to 10mm)",
        "75 minutes cordless runtime after 1 hour charge",
        "Washable attachments"
      ],
      specs: {
        "Subcategory": "Shavers",
        "Length Settings": "0.5mm - 10mm",
        "Runtime": "75 Minutes",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "hue-gradient-lightstrip",
      name: "Philips Hue Play Gradient Ambiance Lightstrip 2M",
      parentCategory: "Home Appliances",
      subcategory: "Light",
      price: 9999,
      originalPrice: 12999,
      discount: 23,
      rating: 4.9,
      reviewCount: 188,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "Smart Sync",
      image: "images/gradient_lightstrip_1785486536065.jpg",
      variants: [
        { name: "2 Meter Base Kit", price: 9999, originalPrice: 12999 },
        { name: "1 Meter Extension", price: 3499, originalPrice: 4499 }
      ],
      shortDescription: "Blends multiple gradient colors simultaneously along a single flexible lightstrip.",
      features: [
        "Blends multiple colors simultaneously",
        "High quality silicone diffuser for continuous glow",
        "Extendable up to 10 meters",
        "Syncs with Hue Play HDMI Sync Box"
      ],
      specs: {
        "Subcategory": "Light",
        "Length": "2 Meters",
        "Brightness": "1800 Lumens",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "smart-ceiling-light",
      name: "Philips Smart Ceiling Light",
      parentCategory: "Home Appliances",
      subcategory: "Light",
      price: 4999,
      originalPrice: 6999,
      discount: 28,
      rating: 4.7,
      reviewCount: 145,
      inStock: true,
      featured: false,
      bestSeller: false,
      badge: "Smart Ambient",
      image: "images/smart_ceiling_light_1785513508900.jpg",
      variants: [
        { name: "White 24W Ceiling Lamp", price: 4999, originalPrice: 6999 }
      ],
      features: [
        "Dimmable warm white to cool daylight shades",
        "App & Wi-Fi control with schedule timers",
        "Ultra-thin sleek flush mount design",
        "EyeComfort technology reduces glare"
      ],
      specs: {
        "Subcategory": "Light",
        "Wattage": "24 Watts (2200 Lumens)",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "air-purifier-1000i",
      name: "Philips Compact Smart Air Purifier Series 1000i",
      parentCategory: "Home Appliances",
      subcategory: "Air Purifiers",
      price: 12999,
      originalPrice: 16999,
      discount: 23,
      rating: 4.7,
      reviewCount: 154,
      inStock: true,
      featured: false,
      bestSeller: true,
      badge: "NanoProtect HEPA",
      image: "images/philips_air_purifier_1000i_white.png",
      variants: [
        { name: "Medium Room 1000i", price: 12999, originalPrice: 16999 }
      ],
      shortDescription: "Compact HEPA air purifier with Air+ app smart scheduling and real-time color feedback ring.",
      features: [
        "Cleans rooms up to 38 m² efficiently",
        "3-layer HEPA filtration traps 99.97% allergens",
        "Smart Air+ app remote control & scheduling",
        "Ultra-quiet night sleep mode"
      ],
      specs: {
        "Subcategory": "Air Purifiers",
        "CADR": "300 m³/h",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "airfryer-xl-connected",
      name: "Philips Essential Airfryer XL Connected HD9280/90",
      parentCategory: "Home Appliances",
      subcategory: "Air Fryers",
      price: 11999,
      originalPrice: 14999,
      discount: 20,
      rating: 4.8,
      reviewCount: 380,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "Rapid Air Tech",
      image: "images/philips_airfryer_xl_connected.jpg",
      variants: [
        { name: "6.2L XL Capacity", price: 11999, originalPrice: 14999 }
      ],
      shortDescription: "Wi-Fi connected XL Airfryer with NutriU app integration for remote cooking monitoring.",
      features: [
        "Rapid Air Technology for crispy, healthy frying",
        "6.2 Litre capacity for up to 5 meal portions",
        "Touch screen with 7 presets",
        "Dishwasher safe removable parts"
      ],
      specs: {
        "Subcategory": "Air Fryers",
        "Capacity": "6.2 Litres",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "shaver-oneblade-face-body",
      name: "Philips OneBlade Face + Body Hybrid Styler",
      parentCategory: "Personal Care",
      subcategory: "Men's Grooming",
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      rating: 4.8,
      reviewCount: 920,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "Revolutionary Tech",
      image: "images/philips_oneblade.jpg",
      variants: [
        { name: "OneBlade Face + Body Kit", price: 2999, originalPrice: 3999 }
      ],
      shortDescription: "Trim, edge, and shave any length of hair on face and body without skin cuts.",
      features: [
        "Unique OneBlade technology cuts fast at 200x per sec",
        "Dual-sided blade for precise edging and lines",
        "Click-on skin guard for sensitive body areas",
        "Wet & dry rechargeable lithium-ion battery"
      ],
      specs: {
        "Subcategory": "Men's Grooming",
        "Runtime": "60 Minutes",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "sonicare-power-flosser",
      name: "Philips Sonicare Power Flosser 3000 Cordless",
      parentCategory: "Personal Care",
      subcategory: "Oral Care",
      price: 6999,
      originalPrice: 8999,
      discount: 22,
      rating: 4.8,
      reviewCount: 175,
      inStock: true,
      featured: false,
      bestSeller: true,
      badge: "Quad Stream Tech",
      image: "images/philips_sonicare_flosser.jpg",
      variants: [
        { name: "Power Flosser 3000", price: 6999, originalPrice: 8999 }
      ],
      shortDescription: "Quad Stream X-shaped water stream cleans 180% more effectively than string floss.",
      features: [
        "Quad Stream technology covers more surface area",
        "Pulse Wave technology guides from tooth to tooth",
        "2 flossing modes & 3 intensity settings",
        "Fast USB-C charging cable"
      ],
      specs: {
        "Subcategory": "Oral Care",
        "Modes": "2 Flossing Modes",
        "Warranty": "2 Years Warranty"
      }
    },
    {
      id: "lumea-ipl-hair-removal",
      name: "Philips Lumea Advanced IPL Hair Removal Device",
      parentCategory: "Personal Care",
      subcategory: "Women's Grooming",
      price: 24999,
      originalPrice: 31999,
      discount: 22,
      rating: 4.9,
      reviewCount: 210,
      inStock: true,
      featured: true,
      bestSeller: true,
      badge: "IPL Salon Tech",
      image: "images/philips_lumea_ipl.jpg",
      variants: [
        { name: "Lumea Advanced + 3 Attachments", price: 24999, originalPrice: 31999 }
      ],
      shortDescription: "Long-lasting hair reduction at home with SenseIQ skin tone sensor technology.",
      features: [
        "Up to 92% hair reduction after just 3 treatments",
        "SmartSkin sensor recommends optimal light setting",
        "Special attachments for body, face, and bikini line",
        "Free Lumea IPL app for personalized treatment guidance"
      ],
      specs: {
        "Subcategory": "Women's Grooming",
        "Flashes": "250,000 Flashes",
        "Warranty": "2 Years Warranty"
      }
    }
  ],

  reviews: [
    {
      author: "Sarah Mitchell",
      meta: "Smart Home Enthusiast",
      avatar: "S",
      color: "#0057B8",
      date: "Verified Review",
      text: "The Philips Smart Lighting completely transformed my living room. The setup was quick, the lighting quality is outstanding, and controlling everything from my phone is incredibly convenient."
    },
    {
      author: "David Carter",
      meta: "Homeowner",
      avatar: "D",
      color: "#00AEEF",
      textColor: "#071B3D",
      date: "Verified Review",
      text: "I purchased the Philips Air Purifier and Smart LED Bulbs together. Both products exceeded my expectations in quality, performance, and design. Highly recommended."
    },
    {
      author: "Emily Johnson",
      meta: "Interior Designer",
      avatar: "E",
      color: "#8B5CF6",
      date: "Verified Review",
      text: "The lighting creates the perfect ambience for every room. Philips products combine elegant design with smart technology, making them ideal for modern homes."
    },
    {
      author: "Michael Brown",
      meta: "Verified Customer",
      avatar: "M",
      color: "#071B3D",
      date: "Verified Review",
      text: "The website made it very easy to compare products and place my order. Fast delivery, excellent customer support, and premium product quality."
    },
    {
      author: "Sophia Williams",
      meta: "Tech Professional",
      avatar: "S",
      color: "#10B981",
      date: "Verified Review",
      text: "From smart lighting to personal care products, Philips has become my go-to brand. The products are reliable, beautifully designed, and work seamlessly together."
    },
    {
      author: "Alex Rivera",
      meta: "Smart Home Designer",
      avatar: "A",
      color: "#F59E0B",
      textColor: "#FFFFFF",
      date: "Verified Review",
      text: "The build quality and seamless app integration of Philips Hue lights are unmatched. Creating custom lighting scenes for movie nights and dining is effortless."
    }
  ],

  faqs: [
    {
      q: "How does the website category navigation work?",
      a: "Our website is organized into 6 main pillars: Home Appliances, Healthcare, Personal Care, Support, Cart, and Profile. Each main pillar features exactly 8 subcategories accessible via mega menus or category filters."
    },
    {
      q: "What products are listed under Home Appliances?",
      a: "Home Appliances contains 8 subcategories: 1. Light, 2. Air Purifiers, 3. Air Fryers, 4. Kitchen Appliances, 5. Irons & Steamers, 6. Coffee Makers, 7. Vacuum Cleaners, and 8. Water Solutions."
    },
    {
      q: "Where can I find Philips Hue Smart Lights?",
      a: "Light is the first subcategory under Home Appliances! You can also click 'Light' directly in the Shop by Category grid on the homepage."
    },
    {
      q: "What warranty comes with official purchases?",
      a: "All official purchases include 2 Years Global Warranty. You can register your product serial number under Support > Product Registration to activate doorstep warranty coverage."
    }
  ]
};
