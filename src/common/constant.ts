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
  alignment: string;
  buttonLink: string;
}

export interface ProductCard {
  productImage: string;
  productTitle: string;
  productDesc: string;
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
    productImage: "images/product.svg",
    productTitle: "EXQUISITE COLLECTION",
    productDesc: "VIEW MORE",
  },
  {
    productImage: "images/Product_2.svg",
    productTitle: "ENCHANTING LOOK",
    productDesc: "VIEW MORE",
  },
  {
    productImage: "images/Product_3.svg",
    productTitle: "REVISIT YOUR CHOICES",
    productDesc: "VIEW MORE",
  },
];
