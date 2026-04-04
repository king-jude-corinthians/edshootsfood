export const SITE = {
  name: "EdShootsFood",
  title: "EdShootsFood — Premium Food Photography",
  description:
    "Premium food photography for brands, restaurants, and campaigns. We capture food like art.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  instagram: "https://www.instagram.com/edshootsfood",
  email: "hello@edshootsfood.com",
  whatsapp: "+2348089591880",
  whatsappMessage: "Hi! I'm interested in booking a food photography session.",
};

export const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    id: "food-photography",
    title: "Food Photography",
    description:
      "Stunning food images that make every dish look irresistible. Perfect for menus, websites, and marketing.",
    icon: "utensils",
  },
  {
    id: "product-shoots",
    title: "Product Shoots",
    description:
      "Clean, professional product photography for packaging, e-commerce, and brand campaigns.",
    icon: "camera",
  },
  {
    id: "social-media",
    title: "Social Media Content",
    description:
      "Scroll-stopping visuals optimized for Instagram, TikTok, and all social platforms.",
    icon: "image",
  },
  {
    id: "brand-campaigns",
    title: "Brand Campaign Shoots",
    description:
      "Full creative direction from concept to final delivery. We tell your culinary story.",
    icon: "sparkles",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Ezekwe transformed our menu into a visual masterpiece. Our online orders increased by 40% after updating our food photography.",
    name: "Sarah Chen",
    company: "Sakura Kitchen",
    role: "Owner",
    rating: 5,
  },
  {
    quote:
      "The attention to detail is unreal. Every dish looks exactly how it tastes — absolutely divine. Best investment we made.",
    name: "Marcus Williams",
    company: "Urban Grill Co.",
    role: "Head Chef",
    rating: 5,
  },
  {
    quote:
      "Working with Ed was seamless. He understood our brand immediately and delivered photos that elevated our entire identity.",
    name: "Amara Osei",
    company: "Afro Fusion Bistro",
    role: "Founder",
    rating: 5,
  },
  {
    quote:
      "Our social media engagement tripled after the brand campaign shoot. The content is timeless and keeps performing.",
    name: "James Rodriguez",
    company: "La Mesa",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote:
      "Professional, creative, and incredibly talented. Ezekwe doesn't just take photos — he tells stories through food.",
    name: "Lisa Park",
    company: "Seoul Bites",
    role: "Co-Founder",
    rating: 5,
  },
  {
    quote:
      "The monthly content package has been a game-changer for our restaurant. Consistent quality that our audience loves.",
    name: "David Thompson",
    company: "The Rustic Table",
    role: "Owner",
    rating: 5,
  },
] as const;

export const PORTFOLIO_ITEMS = [
  // Restaurants — click opens gallery
  {
    id: "1",
    title: "Whispers",
    category: "Restaurants",
    image: "/images/portfolio/restaurants/whispers/cover.jpg",
    aspect: "tall",
    gallery: [
      "/images/portfolio/restaurants/whispers/1.jpg",
      "/images/portfolio/restaurants/whispers/2.jpg",
      "/images/portfolio/restaurants/whispers/3.jpg",
      "/images/portfolio/restaurants/whispers/4.jpg",
      "/images/portfolio/restaurants/whispers/5.jpg",
      "/images/portfolio/restaurants/whispers/6.jpg",
    ],
  },
  {
    id: "4",
    title: "Rebar",
    category: "Restaurants",
    image: "/images/portfolio/restaurants/rebar/cover.jpg",
    aspect: "tall",
    gallery: [
      "/images/portfolio/restaurants/rebar/1.jpg",
      "/images/portfolio/restaurants/rebar/2.jpg",
      "/images/portfolio/restaurants/rebar/3.jpg",
      "/images/portfolio/restaurants/rebar/4.jpg",
      "/images/portfolio/restaurants/rebar/5.jpg",
      "/images/portfolio/restaurants/rebar/6.jpg",
    ],
  },
  {
    id: "6",
    title: "Court 5",
    category: "Restaurants",
    image: "/images/portfolio/restaurants/court5/cover.jpg",
    aspect: "square",
    gallery: [
      "/images/portfolio/restaurants/court5/1.jpg",
      "/images/portfolio/restaurants/court5/2.jpg",
      "/images/portfolio/restaurants/court5/3.jpg",
      "/images/portfolio/restaurants/court5/4.jpg",
      "/images/portfolio/restaurants/court5/5.jpg",
      "/images/portfolio/restaurants/court5/6.jpg",
    ],
  },
  {
    id: "10",
    title: "Uncle T's Fine Dining",
    category: "Restaurants",
    image: "/images/portfolio/restaurants/unclets/cover.jpg",
    aspect: "tall",
    gallery: [
      "/images/portfolio/restaurants/unclets/1.jpg",
      "/images/portfolio/restaurants/unclets/2.jpg",
      "/images/portfolio/restaurants/unclets/3.jpg",
      "/images/portfolio/restaurants/unclets/4.jpg",
      "/images/portfolio/restaurants/unclets/5.jpg",
      "/images/portfolio/restaurants/unclets/6.jpg",
    ],
  },
  // Products — click opens gallery
  {
    id: "3",
    title: "MEATS 'R' Us",
    category: "Products",
    image: "/images/portfolio/products/meats/cover.jpg",
    aspect: "square",
    gallery: [
      "/images/portfolio/products/meats/1.jpg",
      "/images/portfolio/products/meats/2.jpg",
      "/images/portfolio/products/meats/3.jpg",
      "/images/portfolio/products/meats/4.jpg",
      "/images/portfolio/products/meats/5.jpg",
      "/images/portfolio/products/meats/6.jpg",
    ],
  },
  {
    id: "9",
    title: "District",
    category: "Products",
    image: "/images/portfolio/products/district/cover.jpg",
    aspect: "square",
    gallery: [
      "/images/portfolio/products/district/1.jpg",
      "/images/portfolio/products/district/2.jpg",
      "/images/portfolio/products/district/3.jpg",
      "/images/portfolio/products/district/4.jpg",
      "/images/portfolio/products/district/5.jpg",
      "/images/portfolio/products/district/6.jpg",
    ],
  },
  {
    id: "12",
    title: "Chopwithnu",
    category: "Products",
    image: "/images/portfolio/products/chopwithnu/cover.jpg",
    aspect: "square",
    gallery: [
      "/images/portfolio/products/chopwithnu/1.jpg",
      "/images/portfolio/products/chopwithnu/2.jpg",
      "/images/portfolio/products/chopwithnu/3.jpg",
      "/images/portfolio/products/chopwithnu/4.jpg",
      "/images/portfolio/products/chopwithnu/5.jpg",
      "/images/portfolio/products/chopwithnu/6.jpg",
    ],
  },
  // Drinks — single image, no title shown
  {
    id: "7",
    title: "Cocktails",
    category: "Drinks",
    image: "/images/portfolio/drinks/cocktails.jpg",
    aspect: "tall",
  },
  {
    id: "8",
    title: "Organic Juice",
    category: "Drinks",
    image: "/images/portfolio/drinks/organic-juice.jpg",
    aspect: "wide",
  },
  {
    id: "11",
    title: "Craft Cocktails",
    category: "Drinks",
    image: "/images/portfolio/drinks/craft-cocktails.jpg",
    aspect: "wide",
  },
  {
    id: "13",
    title: "Mocktails",
    category: "Drinks",
    image: "/images/portfolio/drinks/mocktails.jpg",
    aspect: "square",
  },
  {
    id: "14",
    title: "Smoothies",
    category: "Drinks",
    image: "/images/portfolio/drinks/smoothies.jpg",
    aspect: "tall",
  },
  // Food — single image, no title shown
  {
    id: "15",
    title: "Grilled Selection",
    category: "Food",
    image: "/images/portfolio/food/grilled.jpg",
    aspect: "wide",
  },
  {
    id: "16",
    title: "Pasta Series",
    category: "Food",
    image: "/images/portfolio/food/pasta.jpg",
    aspect: "tall",
  },
  {
    id: "17",
    title: "Dessert Collection",
    category: "Food",
    image: "/images/portfolio/food/dessert.jpg",
    aspect: "square",
  },
  {
    id: "18",
    title: "Breakfast Spread",
    category: "Food",
    image: "/images/portfolio/food/breakfast.jpg",
    aspect: "wide",
  },
  {
    id: "19",
    title: "Street Food",
    category: "Food",
    image: "/images/portfolio/food/street-food.jpg",
    aspect: "tall",
  },
  {
    id: "20",
    title: "Fine Dining Plating",
    category: "Food",
    image: "/images/portfolio/food/fine-dining.jpg",
    aspect: "square",
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Restaurants",
  "Products",
  "Drinks",
  "Food",
] as const;

export const ABOUT = {
  name: "Ezekwe Desmond",
  title: "Food Photographer & Visual Storyteller",
  bio: [
    "Desmond is a food photographer passionate about capturing the true essence of food beyond the plate. Inspired by the sensory experience which is from aroma to texture, his work translates taste into compelling, story-driven imagery.",
    "What began as a personal passion has grown into a refined visual style focused on clarity, authenticity, and strong brand storytelling. He creates imagery that not only showcases food but elevates how it is experienced.",
    "Rooted in the same passion, his work continues to evolve with a stronger, more defined presence.",
  ],
  stats: [
    { label: "Projects Completed", value: "500+" },
    { label: "Brands Served", value: "50+" },
    { label: "Years Experience", value: "5+" },
  ],
};

export const CLIENT_LOGOS = [
  { name: "Ambrossia", initials: "SK" },
  { name: "Rebar", initials: "UG" },
  { name: "MEATS 'R' Us", initials: "AF" },
  { name: "Uncle T's", initials: "LM" },
  { name: "Nephews", initials: "SB" },
  { name: "District", initials: "RT" },
  { name: "Court 5", initials: "FL" },
  { name: "ChopwithNu", initials: "SM" },
] as const;

export const BTS_VIDEOS = [
  {
    id: "1",
    title: "Food Styling",
    caption: "Perfecting every detail before the shot",
  },
  {
    id: "2",
    title: "Lighting Setup",
    caption: "Crafting the perfect light for each scene",
  },
  {
    id: "3",
    title: "Camera Work",
    caption: "Finding the angle that tells the story",
  },
  {
    id: "4",
    title: "The Final Frame",
    caption: "When everything comes together perfectly",
  },
] as const;

export const WHY_EDSHOOTS = [
  {
    title: "Fast Turnaround",
    description: "Edited photos delivered within 48-72 hours. No long waits.",
    icon: "clock",
  },
  {
    title: "High-End Editing",
    description: "Professional color grading and retouching on every image.",
    icon: "sparkles",
  },
  {
    title: "Social Media Ready",
    description: "Optimized formats for every platform. Post-ready content.",
    icon: "share",
  },
  {
    title: "Brand Storytelling",
    description: "Every image tells your unique story and connects with your audience.",
    icon: "pen",
  },
] as const;
