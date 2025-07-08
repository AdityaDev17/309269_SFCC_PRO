export type Size = {
  value: string;
  title: string;
  disabled: boolean;
};

export type ProductImage = {
  link: string;
};

export type ImageGroup = {
  images: ProductImage[];
};

export type Colors = {
  name: string;
  hex: string;
};

export type VariationAttributes = {
  id: string;
  name: string;
  values: Values[];
};

export type Values = {
  name: string;
  orderable: boolean;
  value: string;
};

export type Variants = {
  orderable: string;
  price: string;
  productId: string;
  variationValues: {
    color: string;
    size: string;
  };
};

export type ProductList = {
  customerId: string;
  listId: string;
  items: {
    productId: string;
    quantity: number;
    public: boolean;
    priority: number;
    type: string;
  };
};


type CategoriesProps = {
  name: string;
  image?: {
    productImageUrl: string;
    productName: string;
  }[];
  subcategory?: {
    subCategoryName: string;
    subcategory: string[];
  }[];
};

export type HeaderProps = {
  isHome?: boolean;
  logoImages: { default: string; white: string };
  categories: CategoriesProps[];
  headerIcons: { label: string; icon: string }[];
  headerWhiteIcons: { label: string; icon: string }[];
}

export type ProductItem = {
  productId: string;
  productName: string;
  quantity?: number;
  price?: string;
  productImage?: {
    data: {
      imageGroups: {
        images: {
          alt: string;
          link: string;
        }[];
      };
    }[];
  };
  productData?: {
    data: {
      imageGroups: {
        images: {
          alt: string;
          link: string;
        }[];
      }[];
      variants: {
        productId: string;
        variationValues: {
          color?: string;
          size?: string;
        };
      }[];
      variationAttributes?: {
        values?: {
          name?: string;
          value?: string;
        };
      }[];
    }[];
  };
};



/*Same as CartItem*/
export type CartItems = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
  productImage: string;
  itemId: string;
  size?: string;
  color?: string;
};

export type CartItem = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterItemDiscount?:number;
  priceAfterOrderDiscount?:number;
  showStrikedPrice?:boolean;
  currency: string;
  productImage: string;
  itemId: string;
  size?: string;
  color?: string;
};

export type MiniCartProps = {
  cartItem?: CartItem[];
  onDeleteItems?: (itemId: string) => void;
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
  triggerType?: "button" | "icon";
  bagIcon?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  basketId?: string;
  subTotals?: number;
};

export type CartItemResponse = {
  productId: string;
  itemId: string;
  productName: string;
  quantity: number;
  price: number;
  priceAfterItemDiscount?:number;
  priceAfterOrderDiscount?:number;
  productData?: {
    data?: {
      imageGroups?: {
        images?: {
          link?: string;
        }[];
      }[];
      variants?: {
        productId: string;
        variationValues?: {
          color?: string;
          size?: string;
        };
      }[];
      variationAttributes?: {
        values?: {
          name?: string;
          value?: string;
        };
      }[];
    }[];
  };
};


export type Order = {
  orderNo: string;
  orderTotal: number;
  productTotal: number;
  currency: string;
  productItems: ProductItem[];
};

export type GetOrderHistoryResponse = {
  getOrderHistory: {
    limit: number;
    offset: number;
    total: number;
    data: Order[];
  };
};

export type FilterDialogProps = {
	priceFilters: { label: string; value: string }[];
	colorFilters: string[];
	onApplyFilters: (filters: Record<string, string[]>) => void;
}

export type ProductDetails = {
		currency: string;
		hitType: string;
		image?: {
			alt: string;
			disBaseLink: string;
			link: string;
			title: string;
		};
		orderable: string;
		price: string;
		pricePerUnit: string;
		productId: string;
		productName: string;
	}


export type CustomerDetails = {
	basketId: string;
	email: string;
};

export type CommonCardType = {
	id: string;
	title: string;
	description: string;
	extraInfo?: string;
};
export type ShippingAddress = {
	address1: string;
	city: string;
	countryCode: string;
	firstName: string;
	fullName: string;
	id: string;
	lastName: string;
	postalCode: string;
	stateCode: string;
};

export type Shipment = {
	shippingAddress: ShippingAddress | null;
};

export type CustomerAddress = {
	addressId: string;
	address1: string;
	address2: string;
	city: string;
	countryCode: string;
	creationDate: string;
	firstName: string;
	fullName: string;
	lastModified: string;
	lastName: string;
	phone: string;
	postalCode: string;
	preferred: boolean;
	stateCode: string;
};

export type ShippingMethod = {
	description: string;
	id: string;
	name: string;
	price: string;
};

export type UpdateShippingAddressInput = {
	basketId: string | null;
	address1: string;
	address2: string | null;
	city: string;
	countryCode: string;
	firstName: string;
	lastName: string;
	phone: string;
	postalCode: string;
	stateCode: string;
	useAsBilling: boolean;
};

export type UpdateShippingMethodInput = {
	basketId: string | null;
	id: string | null;
};

export type OrderSummaryProps = {
	reverseOrder?: boolean;
	totalRowTop?: boolean;
	isButton?: boolean;
	isPaymentImage?: boolean;
	totalAmt?: string;
	currency?: string;
	subTotal?: string;
	delivery?: string;
	tax?: string;
	total?: string;
	totalSavings?: string;
	buttonText?: string;
  isDelivery?:boolean;
  discount?:string;
	onButtonClick?: () => void;
};

export type Alignment = "center" | "alignStart" | "alignEnd";

export type ProductCardProps = {
	productId?: string;
	alignment?: Alignment;
	width?: number | string;
	productImage: string;
	productTitle?: string;
	productDesc?: string;
	price?: string;
	currency?: string;
	moveToBag?: boolean;
	wishListed?: boolean;
	bagPrice?: string;
	onClick?: (productId: string) => void;
	onButtonClick?: (productId: string) => void;
	onMoveToBag?: (productId: string) => void;
}

export type Promotions={
 calloutMsg:string
 promotionId:string
 promotionPrice:string
}