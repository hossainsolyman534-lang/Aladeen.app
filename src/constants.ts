export interface AppReview {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

export interface AppData {
  id: string;
  name: string;
  developer: string;
  rating: number;
  reviews: string;
  size: string;
  downloads: string;
  category: string;
  icon: string;
  banner: string; // Feature Graphic (1024x500)
  shortDescription: string; // Max 80 chars
  description: string; // Full Description
  screenshots: string[]; // Mobile preview images
  promoVideo?: string; // Optional Promo video
  reviews_list: AppReview[];
  isVerified: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  addedAt: string;
  apkUrl?: string;
  expiryDate?: string; // ISO date string
}

export interface ClientData {
  id: string;
  name: string;
  onBoardDate: string;
  website?: string;
  facebook?: string;
  contactNumber: string;
  notes?: string;
}

export interface CategoryData {
  name: string;
  description: string;
  icon: string;
  banner: string;
}

export const CATEGORIES: CategoryData[] = [
  {
    name: "Education",
    description: "Learn new skills and expand your knowledge with top educational apps.",
    icon: "GraduationCap",
    banner: "https://picsum.photos/seed/edu_banner/1200/400"
  },
  {
    name: "Business",
    description: "Tools to help you manage your business and stay productive.",
    icon: "Briefcase",
    banner: "https://picsum.photos/seed/biz_banner/1200/400"
  },
  {
    name: "Game",
    description: "The best mobile games for your entertainment.",
    icon: "Gamepad2",
    banner: "https://picsum.photos/seed/game_banner/1200/400"
  },
  {
    name: "Marketplace",
    description: "The biggest online marketplaces in Bangladesh. Buy and sell anything.",
    icon: "ShoppingBag",
    banner: "https://picsum.photos/seed/marketplace_banner/1200/400"
  },
  {
    name: "Grocery",
    description: "Fresh groceries and daily essentials delivered to your doorstep.",
    icon: "Utensils",
    banner: "https://picsum.photos/seed/grocery_banner/1200/400"
  },
  {
    name: "Fashion",
    description: "Stay trendy with the latest fashion collections from top Bangladeshi brands.",
    icon: "Shirt",
    banner: "https://picsum.photos/seed/fashion_banner/1200/400"
  },
  {
    name: "Electronics",
    description: "Discover the best deals on mobile phones, laptops, and home appliances.",
    icon: "Smartphone",
    banner: "https://picsum.photos/seed/electronics_banner/1200/400"
  }
];

export const MOCK_REVIEWS: AppReview[] = [
  {
    id: "r1",
    userName: "Rahim Ahmed",
    userImage: "https://picsum.photos/seed/u1/100/100",
    rating: 5,
    date: "March 15, 2026",
    comment: "Excellent service and fast delivery. Highly recommended for shopping in BD."
  },
  {
    id: "r2",
    userName: "Sumaiya Khan",
    userImage: "https://picsum.photos/seed/u2/100/100",
    rating: 4,
    date: "February 28, 2026",
    comment: "The app is smooth, but sometimes the stock updates are a bit slow."
  },
  {
    id: "r3",
    userName: "Tanvir Hasan",
    userImage: "https://picsum.photos/seed/u3/100/100",
    rating: 5,
    date: "January 10, 2026",
    comment: "Very reliable. The safe download from aladeen.app is a great feature."
  }
];

export const MOCK_APPS: AppData[] = [
  {
    id: "1",
    name: "Daraz Online Shopping",
    developer: "Daraz Bangladesh",
    rating: 4.6,
    reviews: "1.2M",
    size: "35 MB",
    downloads: "50M+",
    category: "Shopping",
    icon: "https://picsum.photos/seed/daraz/200/200",
    banner: "https://picsum.photos/seed/darazbanner/800/400",
    description: "Daraz is the leading online marketplace in South Asia, empowering tens of thousands of sellers to connect with millions of customers.",
    shortDescription: "Leading online marketplace in South Asia.",
    screenshots: [
      "https://picsum.photos/seed/ds1/400/800",
      "https://picsum.photos/seed/ds2/400/800",
      "https://picsum.photos/seed/ds3/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    isFeatured: true,
    isTrending: true,
    addedAt: "2026-03-01",
    promoVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "2",
    name: "Chaldal: Grocery Shopping",
    developer: "Chaldal Limited",
    rating: 4.8,
    reviews: "250K",
    size: "22 MB",
    downloads: "5M+",
    category: "Grocery",
    icon: "https://picsum.photos/seed/chaldal/200/200",
    banner: "https://picsum.photos/seed/chaldalbanner/800/400",
    description: "Save time and money! Chaldal is the best online grocery shop in Bangladesh. Order fresh fruits, vegetables, and daily essentials.",
    shortDescription: "Best online grocery shop in Bangladesh.",
    screenshots: [
      "https://picsum.photos/seed/cs1/400/800",
      "https://picsum.photos/seed/cs2/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    isFeatured: true,
    addedAt: "2026-03-05"
  },
  {
    id: "3",
    name: "Foodpanda: Food & More",
    developer: "Foodpanda BD",
    rating: 4.4,
    reviews: "800K",
    size: "40 MB",
    downloads: "10M+",
    category: "Food Delivery",
    icon: "https://picsum.photos/seed/foodpanda/200/200",
    banner: "https://picsum.photos/seed/fpbanner/800/400",
    description: "Hungry? Get the food you want, from the restaurants you love, delivered at panda speed.",
    shortDescription: "Get the food you want, delivered fast.",
    screenshots: [
      "https://picsum.photos/seed/fs1/400/800",
      "https://picsum.photos/seed/fs2/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    isTrending: true,
    addedAt: "2026-03-10"
  },
  {
    id: "4",
    name: "Pickaboo: Electronics",
    developer: "Pickaboo.com",
    rating: 4.3,
    reviews: "45K",
    size: "18 MB",
    downloads: "1M+",
    category: "Electronics",
    icon: "https://picsum.photos/seed/pickaboo/200/200",
    banner: "https://picsum.photos/seed/pbbanner/800/400",
    description: "Pickaboo is the most trusted online shopping site in Bangladesh for mobile phones, electronics, and gadgets.",
    shortDescription: "Most trusted online shopping site in BD.",
    screenshots: [
      "https://picsum.photos/seed/ps1/400/800",
      "https://picsum.photos/seed/ps2/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    addedAt: "2026-03-15"
  },
  {
    id: "5",
    name: "Shwapno Online",
    developer: "ACI Logistics",
    rating: 4.1,
    reviews: "30K",
    size: "25 MB",
    downloads: "500K+",
    category: "Grocery",
    icon: "https://picsum.photos/seed/shwapno/200/200",
    banner: "https://picsum.photos/seed/swbanner/800/400",
    description: "Shop from Shwapno, the largest retail chain in Bangladesh. Get fresh groceries and household items delivered to your door.",
    shortDescription: "Largest retail chain in Bangladesh.",
    screenshots: [
      "https://picsum.photos/seed/ss1/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    addedAt: "2026-03-20"
  },
  {
    id: "6",
    name: "Arogga: Online Pharmacy",
    developer: "Arogga Ltd",
    rating: 4.7,
    reviews: "100K",
    size: "15 MB",
    downloads: "1M+",
    category: "Pharmacy",
    icon: "https://picsum.photos/seed/arogga/200/200",
    banner: "https://picsum.photos/seed/agbanner/800/400",
    description: "Arogga is the first and largest online pharmacy in Bangladesh. Order medicine and healthcare products easily.",
    shortDescription: "First and largest online pharmacy in BD.",
    screenshots: [
      "https://picsum.photos/seed/as1/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    isTrending: true,
    addedAt: "2026-03-22"
  },
  {
    id: "7",
    name: "Rokomari: Books & More",
    developer: "OnnoRokom Group",
    rating: 4.9,
    reviews: "150K",
    size: "20 MB",
    downloads: "2M+",
    category: "Shopping",
    icon: "https://picsum.photos/seed/rokomari/200/200",
    banner: "https://picsum.photos/seed/rkbanner/800/400",
    description: "Rokomari.com is the largest online bookstore in Bangladesh. Buy books, electronics, and stationery online.",
    shortDescription: "Largest online bookstore in Bangladesh.",
    screenshots: [
      "https://picsum.photos/seed/rs1/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    isFeatured: true,
    addedAt: "2026-03-24"
  },
  {
    id: "8",
    name: "Bikroy: Buy & Sell",
    developer: "Saltside",
    rating: 4.5,
    reviews: "500K",
    size: "12 MB",
    downloads: "10M+",
    category: "Shopping",
    icon: "https://picsum.photos/seed/bikroy/200/200",
    banner: "https://picsum.photos/seed/bkbanner/800/400",
    description: "Bikroy is the largest marketplace in Bangladesh. Buy and sell everything from cars to mobile phones.",
    shortDescription: "Largest marketplace in Bangladesh.",
    screenshots: [
      "https://picsum.photos/seed/bs1/400/800"
    ],
    reviews_list: MOCK_REVIEWS,
    isVerified: true,
    addedAt: "2026-03-25",
    expiryDate: "2027-03-25"
  }
];

export const MOCK_CLIENTS: ClientData[] = [
  {
    id: "c1",
    name: "Daraz Bangladesh",
    onBoardDate: "2024-01-15",
    website: "https://daraz.com.bd",
    facebook: "https://facebook.com/darazbangladesh",
    contactNumber: "+8801234567890",
    notes: "Largest e-commerce partner."
  },
  {
    id: "c2",
    name: "Chaldal Limited",
    onBoardDate: "2024-02-20",
    website: "https://chaldal.com",
    facebook: "https://facebook.com/chaldal",
    contactNumber: "+8801987654321",
    notes: "Grocery delivery specialist."
  }
];
