import { StatementBannerProps } from "../components/molecules/StatementBanner/StatementBanner";
import { alignmentType } from "../components/molecules/Banner/Banner";
import { ButtonProps } from "../components/atomic/Button/Button";

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

export const orderDetails = {
  adjustedMerchandizeTotalTax: 0.0,
  adjustedShippingTotalTax: 0.0,
  billingAddress: {
    address1: "jej",
    city: "us",
    countryCode: "US",
    firstName: "kavya",
    fullName: "kavya k",
    id: "53015021a3621a91a47887112a",
    lastName: "k",
    phone: "3333333333",
    postalCode: "98967",
    stateCode: "AR",
  },
  channelType: "storefront",
  confirmationStatus: "not_confirmed",
  createdBy: "Customer",
  creationDate: "2025-04-15T17:47:22.000Z",
  currency: "USD",
  customerInfo: {
    customerId: "acmraFlbpHkXcRkedHxqYYmuw0",
    customerName: "kavya kv",
    customerNo: "00006001",
    email: "kavya1234@gmail.com",
  },
  customerName: "kavya kv",
  exportStatus: "not_exported",
  guest: false,
  lastModified: "2025-04-22T08:34:27.000Z",
  merchandizeTotalTax: 0.0,
  notes: {},
  orderNo: "00002501",
  orderToken: "skKdNVt3L0_rJG8yQLMB7lkfAsNRt_-HhMqdAXMvdCM",
  orderTotal: 141.1,
  orderViewCode: "dpHrMm7XmjK3vluN9hHzqlmNy3J6rlL0Ai-6co35otU",
  paymentInstruments: [
    {
      amount: 141.1,
      paymentCard: {
        cardType: "scheme",
        creditCardExpired: false,
      },
      paymentInstrumentId: "039d67ce0ec597ee2d28710ce6",
      paymentMethodId: "AdyenComponent",
    },
  ],
  paymentStatus: "not_paid",
  productItems: [
    {
      adjustedTax: 0.0,
      basePrice: 12.0,
      bonusProductLineItem: false,
      gift: false,
      itemId: "0a09c7086a263d0f1aeb850555",
      itemText: "Dog Treats Healthy Planet",
      price: 24.0,
      priceAfterItemDiscount: 21.6,
      priceAfterOrderDiscount: 21.6,
      productId: "ACNPETS_123",
      productName: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
      productImage: "/images/product.svg",
      quantity: 2,
      shipmentId: "me",
      tax: 0.0,
      taxBasis: 24.0,
      taxClassId: "standard",
      taxRate: 0,
    },
    {
      adjustedTax: 0.0,
      basePrice: 35.0,
      bonusProductLineItem: false,
      gift: false,
      itemId: "4730fab2a49cb16505fb9768ba",
      itemText: "Organic Rope Chew",
      price: 105.0,
      productImage: "/images/product.svg",
      priceAdjustments: [
        {
          appliedDiscount: {
            amount: 0.1,
            percentage: 10,
            type: "percentage",
          },
          creationDate: "2025-04-15T17:47:22.000Z",
          custom: false,
          itemText: "trade_in",
          lastModified: "2025-04-15T17:47:22.000Z",
          manual: false,
          price: -10.5,
          priceAdjustmentId: "5339a9254eedfaf66b00bc579a",
          promotionId: "trade_in",
        },
      ],
      priceAfterItemDiscount: 94.5,
      priceAfterOrderDiscount: 94.5,
      productId: "ACNPETS_130",
      productName: "Organic Rope Chew",
      quantity: 3,
      shipmentId: "me",
      tax: 0.0,
      taxBasis: 105.0,
      taxClassId: "standard",
      taxRate: 0,
    },
  ],
  productSubTotal: 116.1,
  productTotal: 116.1,
  shipments: [
    {
      adjustedMerchandizeTotalTax: 0.0,
      adjustedShippingTotalTax: 0.0,
      gift: false,
      merchandizeTotalTax: 0.0,
      productSubTotal: 116.1,
      productTotal: 116.1,
      shipmentId: "me",
      shipmentNo: "00003504",
      shipmentTotal: 141.1,
      shippingAddress: {
        address1: "123 Main street AnyTown",
        city: "California",
        countryCode: "US",
        firstName: "kavya",
        fullName: "kavya k",
        id: "8e3298bf3f39c36c46119e703c",
        lastName: "k",
        phone: "3333333333",
        postalCode: "98967",
        stateCode: "AR",
      },
      shippingMethod: {
        id: "express",
        name: "Express post",
        price: 25.0,
      },
      shippingStatus: "not_shipped",
      shippingTotal: 25.0,
      shippingTotalTax: 0.0,
      taxTotal: 0.0,
    },
  ],
  shippingItems: [
    {
      adjustedTax: 0.0,
      basePrice: 25.0,
      itemId: "a166764c05b493613d2824e981",
      itemText: "Shipping",
      price: 25.0,
      priceAfterItemDiscount: 25.0,
      shipmentId: "me",
      tax: 0.0,
      taxBasis: 25.0,
      taxClassId: "standard",
      taxRate: 0,
    },
  ],
  shippingStatus: "not_shipped",
  shippingTotal: 25.0,
  shippingTotalTax: 0.0,
  siteId: "acndoggo",
  status: "new",
  taxation: "net",
  taxRoundedAtGroup: false,
  taxTotal: 0.0,
};
export interface BannerData {
  title: string;
  buttonText: string;
  buttonColor?: ButtonProps["variant"];
  description?: string;
  backgroundImage: string;
  alignment: alignmentType;
  buttonLink: string;
  textColor?: string;
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
    backgroundImage: "/images/heroimageone.webp",
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
    textColor: "black",
    buttonColor: "secondary"
  },
];

export const homepageProducts: ProductCard[] = [
  {
    productId: "1",
    productImage: "/images/Tile_3.png",
    productTitle: "EXQUISITE COLLECTION",
    productDesc: "VIEW MORE",
  },
  {
    productId: "2",
    productImage: "/images/Tile_4.png",
    productTitle: "ENCHANTING LOOK",
    productDesc: "VIEW MORE",
  },
  {
    productId: "3",
    productImage: "/images/Tile_6.png",
    productTitle: "REVISIT YOUR CHOICES",
    productDesc: "VIEW MORE",
  },
];

export const statementBannerData : StatementBannerProps = {
  imageSrc: "/images/lipstick.svg",
  imageAlt: "Lipstick collection",
  imagePosition: "left",
  heading: "STATEMENT SHADES",
  subheading: "FOR EVERY MOOD",
  description:
    "6 new iconic shades which minimizes lines giving your lips a soft appearance.",
};

export const cartItems = [
  {
    id: "1",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 2,
    price: 50,
    currency: "$",
    productImage: "/images/Tile_3.png",
  },

  {
    id: "2",
    name: "ELENOR, MEN’S PERFUME 1, POUR HOMME - 100ML, 3.4",
    description: "OZ",
    quantity: 1,
    price: 50,
    currency: "$",
    productImage: "/images/Tile_3.png",
  },
];

export const productData = [
  {
    productId: "893234",
    productImage: "/images/Tile_3.png",
    productTitle: "Product 1",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "2",
    productImage: "/images/Tile_3.png",
    productTitle: "Product 2",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "3",
    productImage: "/images/Tile_3.png",
    productTitle: "Product 3",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "4",
    productImage: "/images/Tile_3.png",
    productTitle: "Product 4",
    bagPrice: "200",
    currency: "$",
  },
  {
    productId: "5",
    productImage: "/images/Tile_3.png",
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

export const searchSuggestions = ['Blush', 'Foundation', 'Highlighters'];

export const productSuggestions = [
  {
    productId: '1',
    productTitle: 'Men’s fragrances',
    productImage: '/images/product.svg'
  },
  {
    productId: '2',
    productTitle: 'Men’s fragrances',
    productImage: '/images/product.svg'
  },
  {
    productId: '1',
    productTitle: 'Men’s fragrances',
    productImage: '/images/product.svg'
  },
  {
    productId: '2',
    productTitle: 'Men’s fragrances',
    productImage: '/images/product.svg'
  },
]
// FAQ data with IDs for scrolling
export const frequentlyAskedData = [
  {
    id: "skin-type",
    question: "WHAT ARE THE BEST PRODUCTS FOR MY SKIN TYPE?",
    answer:
      "To determine the best products for your skin type, start by identifying whether your skin is oily, dry, combination, or sensitive. Our website offers a detailed skin type quiz and personalized recommendations. Additionally, you can filter products by skin type to find the perfect match for your needs.",
    category: "frequently-asked",
  },
  {
    id: "cruelty-free",
    question: "ARE YOUR PRODUCTS CRUELTY-FREE AND VEGAN?",
    answer:
      "Yes, we are committed to ethical beauty. All our products are cruelty-free, and we offer a wide range of vegan options. Look for the cruelty-free and vegan icons on product pages, or filter your search to find these products easily.",
    category: "frequently-asked",
  },
  {
    id: "samples",
    question: "DO YOU OFFER SAMPLES OR TRIAL SIZES?",
    answer:
      "We understand the importance of trying before you buy. We offer sample sizes for select products and free samples with every purchase. Keep an eye on our promotions page for sample kits and special offers.",
    category: "frequently-asked",
  },
  {
    id: "return-policy",
    question: "WHAT IS YOUR RETURN/EXCHANGE POLICY?",
    answer:
      "We want you to be completely satisfied with your purchase. If you are not happy with a product, you can return it within 30 days of receipt for a full refund or exchange. Products must be unused and in their original packaging. For detailed instructions, please visit our Returns & Exchanges page.",
    category: "frequently-asked",
  },
  {
    id: "track-order",
    question: "HOW DO I TRACK MY ORDER?",
    answer:
      "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can track your order through the link provided in the email or by logging into your account on our website and checking the order status.",
    category: "frequently-asked",
  },
];

export const ordersData = [
  {
    id: "place-order",
    question: "HOW DO I PLACE AN ORDER?",
    answer:
      "You can place an order by browsing our website, adding items to your cart, and proceeding to checkout. You'll need to provide shipping information and payment details to complete your purchase.",
    category: "orders",
  },
  {
    id: "modify-order",
    question: "CAN I MODIFY OR CANCEL MY ORDER?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. Once an order has been processed, it cannot be modified or canceled.",
    category: "orders",
  },
  {
    id: "process-time",
    question: "HOW LONG WILL IT TAKE TO PROCESS MY ORDER?",
    answer:
      "Most orders are processed within 1-2 business days. During peak seasons or promotional periods, processing may take up to 3 business days.",
    category: "orders",
  },
  {
    id: "return-exchange-product",
    question:
      "CAN I RETURN OR EXCHANGE A PRODUCT THAT WAS PURCHASED ON SALE OR WITH A DISCOUNT CODE?",
    answer:
      "Yes, products purchased on sale or with a discount code are eligible for return or exchange within our standard 30-day return window. However, final sale items marked as non-returnable are not eligible for return or exchange.",
    category: "orders",
  },
  {
    id: "initiate-return",
    question: "HOW DO I INITIATE A RETURN OR EXCHANGE?",
    answer:
      "To initiate a return or exchange, log into your account, go to your order history, select the order containing the item you wish to return, and follow the return instructions. You'll receive a return shipping label and detailed instructions via email.",
    category: "orders",
  },
];

export const shippingData = [
  {
    id: "shipping-options",
    question: "WHAT ARE YOUR SHIPPING OPTIONS?",
    answer:
      "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight shipping (next business day). Shipping options and rates are displayed at checkout.",
    category: "shipping",
  },
  {
    id: "international-shipping",
    question: "DO YOU OFFER INTERNATIONAL SHIPPING?",
    answer:
      "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location and are calculated at checkout.",
    category: "shipping",
  },
  {
    id: "free-shipping",
    question: "IS SHIPPING FREE?",
    answer:
      "We offer free standard shipping on orders over $50 within the continental US. International orders and expedited shipping options have additional fees.",
    category: "shipping",
  },
];

export const returnsData = [
  {
    id: "return-process",
    question: "HOW DO I RETURN A PRODUCT?",
    answer:
      "To return a product, go to your order history, select the order containing the item you wish to return, and follow the return instructions. You'll receive a return shipping label and instructions via email.",
    category: "returns",
  },
  {
    id: "return-window",
    question: "WHAT IS THE RETURN WINDOW?",
    answer:
      "All returns must be initiated within 30 days of receiving your order. Items must be unused, in their original packaging, and in resalable condition.",
    category: "returns",
  },
  {
    id: "refund-process",
    question: "HOW LONG DOES IT TAKE TO PROCESS A REFUND?",
    answer:
      "Once we receive your return, it takes 3-5 business days to process. Refunds are issued to the original payment method and may take an additional 5-10 business days to appear on your statement.",
    category: "returns",
  },
];

export const paymentsData = [
  {
    id: "payment-methods",
    question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.",
    category: "payments",
  },
  {
    id: "payment-security",
    question: "IS IT SAFE TO ENTER MY CREDIT CARD INFORMATION?",
    answer:
      "Yes, our website uses industry-standard SSL encryption to protect your personal and payment information. We do not store your full credit card details on our servers.",
    category: "payments",
  },
  {
    id: "multiple-payments",
    question: "CAN I USE MULTIPLE PAYMENT METHODS FOR ONE ORDER?",
    answer:
      "Currently, we only support one payment method per order. If you wish to use multiple payment methods, you'll need to place separate orders.",
    category: "payments",
  },
];

export const productInfoData = [
  {
    id: "sensitive-skin",
    question: "ARE YOUR PRODUCTS SUITABLE FOR SENSITIVE SKIN?",
    answer:
      "Many of our products are formulated for sensitive skin. Look for products labeled 'For Sensitive Skin' or check the product description for specific information about ingredients and skin type compatibility.",
    category: "product-info",
  },
  {
    id: "ingredients",
    question: "DO YOUR PRODUCTS CONTAIN PARABENS OR SULFATES?",
    answer:
      "We offer many paraben-free and sulfate-free options. Product descriptions clearly indicate which items are free from these ingredients. You can also use our filter system to search specifically for paraben-free or sulfate-free products.",
    category: "product-info",
  },
  {
    id: "storage",
    question: "HOW SHOULD I STORE MY PRODUCTS?",
    answer:
      "Most products should be stored in a cool, dry place away from direct sunlight. Some products, particularly those containing vitamin C or probiotics, may have specific storage requirements, which will be indicated on the packaging.",
    category: "product-info",
  },
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
export const allOrderData = [
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData,
  },
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData,
  },
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData,
  },
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData,
  },
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData,
  },
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData,
  },
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData,
  },
  {
    orderId: "ABCD12345678",
    price: 100,
    orderName: "Men's Perfume 1, 100ml",
    items: productData.slice(0, 3),
  },
];

export interface UserDetails {
  title: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  email: string;
}

// export const mockUserDetails: UserDetails = {
//   title: "Mr.",
//   firstName: "Utkarsh",
//   lastName: "Pai",
//   birthDate: "1985-12-04",
//   gender: "Male",
//   email: "utkarshpai@abc.com",
// };

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

export const billingAddress = [
  {
    id: "Billing Address",
    value: "",
  },
];

export const address = [
  {
    id: "1",
    title: "Utkarsh Pai",
    description:
      "20, Impasse Odette Dijoux, Letellier-la-Forêt, Pinto, France - 97459,",
    phone: "XXX4398238",
    isDefault: true,
  },
  {
    id: "2",
    title: "Apple",
    description:
      "25, Impasse Odette Dijoux, Letellier-la-Forêt, Pinto, France - 97459,",
    phone: "XXX4398238",
    isDefault: false,
  },
  {
    id: "3",
    title: "Robin Hood",
    description:
      "30, Impasse Odette Dijoux, Letellier-la-Forêt, Pinto, France - 97459,",
    phone: "XXX4398238",
    isDefault: false,
  },
  {
    id: "4",
    title: "Kantilal Kantilal",
    description:
      "20, Impasse Odette Dijoux, Letellier-la-Forêt, Pinto, France - 97459,",
    phone: "XXX4398238",
    isDefault: false,
  },
];

export const shippingMethodsFromBackend = [
  {
    id: "Standard Delivery",
    title: "Delivery within 3-4 business days",
    description: "Delivery within 3-4 business days",
    extraInfo: "0",
  },
  {
    id: "Express Delivery",
    title: "One day delivery",
    description: "One day delivery",
    extraInfo: "200",
  },
];

export const orderStatus = {
  isDelivered: true,
  steps: [
    { header: "Order Placed", text: "8th Oct’23, 8:00 AM" },
    { header: "Order Shipped", text: "Shipped by EE-Kart" },
    { header: "Order reached your nearest hub", text: " " },
    { header: "Out for delivery", text: "OTP: 2398" },
    { header: "Delivered", text: "Estimated delivery: 12th Oct’23" },
  ],
  currentStep: 3,
};
