export const SITE = {
  name: "EdShootsFood",
  title: "Ezekwe Desmond — Food Photographer",
  description:
    "Premium food photography by Ezekwe Desmond. Elevating brands through stunning culinary visuals.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  instagram: "https://www.instagram.com/edshootsfood",
  email: "hello@edshootsfood.com",
};

export const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    id: "restaurant-menu",
    title: "Restaurant Menu",
    description:
      "Complete menu photography sessions. Every dish captured with precision to make your menu irresistible.",
    price: 75000,
    priceLabel: "From $750",
    features: [
      "Up to 20 dishes",
      "2-hour session",
      "Professional lighting",
      "Edited images in 5 days",
    ],
    icon: "utensils",
  },
  {
    id: "product-photography",
    title: "Product Photography",
    description:
      "Stunning product shots for packaging, e-commerce, and marketing materials that convert browsers to buyers.",
    price: 95000,
    priceLabel: "From $950",
    features: [
      "Up to 15 products",
      "Multiple angles",
      "White & styled backgrounds",
      "Web-ready exports",
    ],
    icon: "camera",
  },
  {
    id: "brand-campaign",
    title: "Brand Campaign",
    description:
      "Full creative direction for your food brand. From concept to final delivery, we tell your culinary story.",
    price: 250000,
    priceLabel: "From $2,500",
    features: [
      "Creative direction",
      "Full-day session",
      "Food styling included",
      "Social media assets",
    ],
    icon: "sparkles",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    description:
      "Ongoing content packages for restaurants and food brands. Consistent, scroll-stopping visuals monthly.",
    price: 150000,
    priceLabel: "From $1,500/mo",
    features: [
      "Monthly sessions",
      "Social media content",
      "Reels & stories",
      "Brand consistency",
    ],
    icon: "image",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Ezekwe transformed our menu into a visual masterpiece. Our online orders increased by 40% after updating our food photography.",
    name: "Sarah Chen",
    company: "Sakura Kitchen",
    role: "Owner",
  },
  {
    quote:
      "The attention to detail is unreal. Every dish looks exactly how it tastes — absolutely divine. Best investment we made.",
    name: "Marcus Williams",
    company: "Urban Grill Co.",
    role: "Head Chef",
  },
  {
    quote:
      "Working with Ed was seamless. He understood our brand immediately and delivered photos that elevated our entire identity.",
    name: "Amara Osei",
    company: "Afro Fusion Bistro",
    role: "Founder",
  },
  {
    quote:
      "Our social media engagement tripled after the brand campaign shoot. The content is timeless and keeps performing.",
    name: "James Rodriguez",
    company: "La Mesa",
    role: "Marketing Director",
  },
  {
    quote:
      "Professional, creative, and incredibly talented. Ezekwe doesn't just take photos — he tells stories through food.",
    name: "Lisa Park",
    company: "Seoul Bites",
    role: "Co-Founder",
  },
  {
    quote:
      "The monthly content package has been a game-changer for our restaurant. Consistent quality that our audience loves.",
    name: "David Thompson",
    company: "The Rustic Table",
    role: "Owner",
  },
] as const;

export const PORTFOLIO_ITEMS = [
  {
    id: "1",
    title: "Sakura Kitchen",
    category: "Restaurant",
    image: "/images/portfolio/placeholder-1.jpg",
  },
  {
    id: "2",
    title: "Urban Grill Campaign",
    category: "Brand",
    image: "/images/portfolio/placeholder-2.jpg",
  },
  {
    id: "3",
    title: "Artisan Bakery",
    category: "Product",
    image: "/images/portfolio/placeholder-3.jpg",
  },
  {
    id: "4",
    title: "Fresh & Local",
    category: "Editorial",
    image: "/images/portfolio/placeholder-4.jpg",
  },
  {
    id: "5",
    title: "La Mesa Rebrand",
    category: "Brand",
    image: "/images/portfolio/placeholder-5.jpg",
  },
  {
    id: "6",
    title: "Seoul Bites Menu",
    category: "Restaurant",
    image: "/images/portfolio/placeholder-6.jpg",
  },
] as const;

export const ABOUT = {
  name: "Ezekwe Desmond",
  title: "Food Photographer & Visual Storyteller",
  bio: [
    "I'm Ezekwe Desmond — a food photographer passionate about transforming culinary creations into visual stories that captivate and inspire.",
    "With years of experience working with restaurants, food brands, and culinary artists, I bring a meticulous eye for detail and a deep understanding of how food should look and feel in every frame.",
    "My approach blends technical precision with creative artistry. Every shoot is tailored to reflect your brand's unique identity, ensuring each image doesn't just showcase food — it tells your story.",
  ],
  stats: [
    { label: "Projects Completed", value: "500+" },
    { label: "Brands Served", value: "50+" },
    { label: "Years Experience", value: "5+" },
  ],
};
