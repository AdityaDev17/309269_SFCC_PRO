import { alignmentType } from "../components/molecules/Banner/Banner";

export const productDetails = {
  currency: "USD",
  id: "ACNPETS_154",
  longDescription:
    "Indulge in luxury with our Elenor’s Monochrome Gloss lipstick. Crafted from rare botanicals for a rich, glossy finish. Treat your lips to elegance.",
  price: 60,
  name: "ELENOR MONOCHROME GLOSS LIPSTICK - P56",
  imageGroups: [
    {
      images: [
        {
          link: "/images/product1.svg",
          alt: "All Natural Fishylick Puree",
        },
      ],
    },
    {
      images: [
        {
          link: "/images/product2.svg",
          alt: "All Natural Fishylick Puree",
        },
      ],
    },
    {
      images: [
        {
          link: "/images/product3.svg",
          alt: "All Natural Fishylick Puree",
        },
      ],
    },
    {
      images: [
        {
          link: "/images/product.svg",
          alt: "All Natural Fishylick Puree",
        },
      ],
    },
  ],
  pageMetaTags: [
    {
      id: "description",
      value:
        "Introducing Elenor's Monochrome Gloss Lipstick Collection,where vibrant colour meets irresistible shine for a truly glamorous pout.",
    },
    {
      id: "feature",
      value:
        "Made with high-quality ingredients and infused with nourishing oils,our gloss lipstick formula delivers hydration and a luscious finish",
    },
  ],
};

export const colorData = [
  { hex: "#8B0000", name: "Dark Red" },
  { hex: "#FF0000", name: "Red" },
  { hex: "#FF4040", name: "Coral Red" },
  { hex: "#CD5C5C", name: "Indian Red" },
];

export const sizes = [
  { value: "option1", title: "10 GM" },
  { value: "option2", title: "20 GM" },
];

export const footerData = [
  {
    title: "SFCC",
    children: [
      {
        title: "Makeup",
        link: "/",
      },
      {
        title: "SkinCare",
        link: "/",
      },
      {
        title: "Fragnance",
        link: "/",
      },
      {
        title: "Gift",
        link: "/",
      },
    ],
  },
  {
    title: "Services",
    children: [
      {
        title: "Community Profile",
        link: "/",
      },
      {
        title: "Sustainability",
        link: "/",
      },
      {
        title: "Refurbish",
        link: "/",
      },
      {
        title: "Shipping Options",
        link: "/",
      },
      {
        title: "FAQ",
        link: "/",
      },
    ],
  },
  {
    title: "About Us",
    children: [
      {
        title: "Store Location",
        link: "/",
      },
      {
        title: "Contact US",
        link: "/",
      },
      {
        title: "Legal",
        link: "/",
      },
      {
        title: "Privacy Policy",
        link: "/",
      },
    ],
  },
];
export interface BannerData {
  title: string;
  buttonText: string;
  description?: string;
  backgroundImage: string;
  alignment: alignmentType;
  buttonLink: string;
}

export interface ProductCard {
  productImage: string;
  productTitle: string;
  productDesc: string;
  productId: string;
}

export const homepageBanners: BannerData[] = [
  {
    title: "SPRING COLLECTION 2024",
    buttonText: "View More",
    backgroundImage: "/images/heroimageone.svg",
    alignment: "center-bottom",
    buttonLink: "",
  },
  {
    title: "BAG COLLECTION 2024 SNEAK PEEK",
    buttonText: "Invite Me",
    description: "Register for early access and special perks.",
    backgroundImage: "/images/productBanner.svg",
    alignment: "left-bottom",
    buttonLink: "",
  },
  {
    title: "BEAUTY IS ETERNAL",
    buttonText: "VIEW MORE",
    backgroundImage: "/images/eternal-beauty.svg",
    alignment: "center-bottom",
    buttonLink: "",
  },
];
export const homepageProducts: ProductCard[] = [
  {
    productId: "1",
    productImage: "images/product.svg",
    productTitle: "EXQUISITE COLLECTION",
    productDesc: "VIEW MORE",
  },
  {
    productId: "2",
    productImage: "images/Product_2.svg",
    productTitle: "ENCHANTING LOOK",
    productDesc: "VIEW MORE",
  },
  {
    productId: "3",
    productImage: "images/Product_3.svg",
    productTitle: "REVISIT YOUR CHOICES",
    productDesc: "VIEW MORE",
  },
];

export const cartItems = [
  {
    id: "1",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 2,
    price: 50,
    currency: "$",
    productImage: "/images/product.svg",
  },

  {
    id: "2",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 1,
    price: 50,
    currency: "$",
    productImage: "/images/product.svg",
  },
];

export const productData = [
  {
    productId: "893234",
    productImage: "/images/product.svg",
    productTitle: "Product 1",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "2",
    productImage: "/images/product.svg",
    productTitle: "Product 2",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "3",
    productImage: "/images/product.svg",
    productTitle: "Product 3",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "4",
    productImage: "/images/product.svg",
    productTitle: "Product 4",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "4",
    productImage: "/images/product.svg",
    productTitle: "Product 4",
    bagPrice: "200",
    currency: "$",
  },
];
export const categoryList = ["Perfume", "Jewellery", "Brush Set"];

export const states = [
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Delhi", value: "delhi" },
  { label: "Karnataka", value: "karnataka" },
];

export const filterTabs = ["Price", "Notes", "Brands", "Features", "Discount"];

export const filterOptions: Record<string, string[]> = {
  Price: [
    "Below ₹1000",
    "₹1001 to ₹2000",
    "₹2001 to ₹3000",
    "₹3001 to ₹4000",
    "₹4001 and above",
  ],
  Notes: ["Floral", "Woody", "Citrus", "Spicy", "Musk"],
  Brands: ["Gucci", "Dior", "Chanel", "Versace", "Armani"],
  Features: ["Long Lasting", "Travel Size", "Refillable"],
  Discount: ["10% and above", "25% and above", "50% and above"],
};

export const mockUserDetails = {
  title: "Mr.",
  firstName: "Utkarsh",
  lastName: "Pai",
  birthDate: "1985-12-04",
  gender: "Male",
  email: "utkarshpai@abc.com",
};

export type CardType = {
  type: "text" | "image";
  title?: string;
  subtitle?: string;
  description?: string;
  link?: string;
  image?: string;
};

export const bannerData: CardType[][] = [
  [
    {
      type: "text",
      title: "LOVE YOUR",
      subtitle: "SKIN ENOUGH",
      description: "Skincare reimagined",
      link: "#",
    },
    { type: "image", image: "/images/carousel-image1.svg" },
    { type: "image", image: "/images/carousel-image2.svg" },
  ],
  [
    { type: "image", image: "/images/carousel-image3.svg" },
    {
      type: "text",
      title: "FRAGRANCE",
      subtitle: " RARE AS YOU",
      description: "With lips that speak volumes",
      link: "#",
    },
    { type: "image", image: "/images/carousel-image4.svg" },
  ],
  [
    { type: "image", image: "/images/carousel-image5.svg" },
    { type: "image", image: "/images/carousel-image6.svg" },
    {
      type: "text",
      title: "DARE TO BE",
      subtitle: "DIFFERENT",
      description: "With lips that speaks volumes",
      link: "#",
    },
  ],
];

export const dots = [
  {
    id: 1,
    top: "48%",
    left: "60%",
    productImage: "/images/lipstick.svg",
    productTitle: "TILBURY MATTE REVOLUTION",
    productDesc: "VIEW MORE",
  },
  {
    id: 2,
    top: "35%",
    left: "60%",
    productImage: "/images/lipstick.svg",
    productTitle: "EYELINER MAGIC",
    productDesc: "VIEW MORE",
  },
  {
    id: 3,
    top: "60%",
    left: "65%",
    productImage: "/images/product.svg",
    productTitle: "PERFUME",
    productDesc: "VIEW MORE",
  },
];

export const addresses = [
  {
    firstName: "Utkarsh",
    lastName: "Pai",
    apartment: "20",
    building: "Impasse Odette Dijoux",
    street: "Letellier-la-Forêt",
    city: "Pinto",
    state: "France",
    zipcode: "97459",
    phone: "XXX4398238",
    isDefault: true,
  },
  {
    firstName: "Sharmili",
    lastName: "K",
    apartment: "D/12",
    building: "Chand Society",
    street: "Jvpd Scheme",
    city: "Mumbai",
    state: "Maharashtra",
    zipcode: "110005",
    phone: "XXX4398238",
  },
  {
    firstName: "Robin",
    lastName: "Wood",
    apartment: "25",
    building: "Impasse Odette Dijoux",
    street: "Letellier-la-Forêt",
    city: "Pinto",
    state: "France",
    zipcode: "97459",
    phone: "XXX4398238",
  },
  {
    firstName: "Kantilal",
    lastName: "Patel",
    apartment: "6",
    building: "Old Mahavir Bldg",
    street: "Behind Matunga P.o.",
    city: "Matunga(c.r)",
    state: "Mumbai",
    zipcode: "110011",
    phone: "XXX4398238",
  },
];
