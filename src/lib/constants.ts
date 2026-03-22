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
  {
    id: "1",
    title: "Sakura Kitchen",
    category: "Restaurants",
    image: "/images/portfolio/placeholder-1.jpg",
    aspect: "tall",
  },
  {
    id: "2",
    title: "Urban Grill Campaign",
    category: "Commercial",
    image: "/images/portfolio/placeholder-2.jpg",
    aspect: "wide",
  },
  {
    id: "3",
    title: "Artisan Bakery",
    category: "Products",
    image: "/images/portfolio/placeholder-3.jpg",
    aspect: "square",
  },
  {
    id: "4",
    title: "Fresh & Local",
    category: "Restaurants",
    image: "/images/portfolio/placeholder-4.jpg",
    aspect: "tall",
  },
  {
    id: "5",
    title: "La Mesa Rebrand",
    category: "Commercial",
    image: "/images/portfolio/placeholder-5.jpg",
    aspect: "wide",
  },
  {
    id: "6",
    title: "Seoul Bites Menu",
    category: "Restaurants",
    image: "/images/portfolio/placeholder-6.jpg",
    aspect: "square",
  },
  {
    id: "7",
    title: "Craft Cocktails",
    category: "Drinks",
    image: "/images/portfolio/placeholder-7.jpg",
    aspect: "tall",
  },
  {
    id: "8",
    title: "Organic Juice Bar",
    category: "Drinks",
    image: "/images/portfolio/placeholder-8.jpg",
    aspect: "wide",
  },
  {
    id: "9",
    title: "Spice Market",
    category: "Products",
    image: "/images/portfolio/placeholder-9.jpg",
    aspect: "square",
  },
  {
    id: "10",
    title: "Fine Dining Collection",
    category: "Restaurants",
    image: "/images/portfolio/placeholder-10.jpg",
    aspect: "tall",
  },
  {
    id: "11",
    title: "Gourmet Coffee",
    category: "Drinks",
    image: "/images/portfolio/placeholder-11.jpg",
    aspect: "wide",
  },
  {
    id: "12",
    title: "Health Bowl Series",
    category: "Products",
    image: "/images/portfolio/placeholder-12.jpg",
    aspect: "square",
  },
] as const;

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Restaurants",
  "Products",
  "Drinks",
  "Commercial",
] as const;

export const ABOUT = {
  name: "Ezekwe Desmond",
  title: "Food Photographer & Visual Storyteller",
  bio: [
    "Food is more than sustenance — it's art, culture, and emotion on a plate. I'm Ezekwe Desmond, and I've dedicated my craft to capturing that magic through my lens.",
    "Every shoot is a collaboration. I immerse myself in your brand's story, your flavors, your vision. From the first frame to the final edit, I obsess over every detail — the way light kisses a glaze, the steam rising from a fresh dish, the textures that make you reach for the screen.",
    "My passion is transforming ordinary moments into extraordinary visuals that don't just showcase food — they make people feel something.",
  ],
  stats: [
    { label: "Projects Completed", value: "500+" },
    { label: "Brands Served", value: "50+" },
    { label: "Years Experience", value: "5+" },
  ],
};

export const CLIENT_LOGOS = [
  { name: "Sakura Kitchen", initials: "SK" },
  { name: "Urban Grill Co.", initials: "UG" },
  { name: "Afro Fusion Bistro", initials: "AF" },
  { name: "La Mesa", initials: "LM" },
  { name: "Seoul Bites", initials: "SB" },
  { name: "The Rustic Table", initials: "RT" },
  { name: "Fresh & Local", initials: "FL" },
  { name: "Spice Market", initials: "SM" },
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
