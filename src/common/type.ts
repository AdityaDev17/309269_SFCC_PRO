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

export interface HeaderProps {
  isHome?: boolean;
  logoImages: { default: string; white: string };
  categories: CategoriesProps[];
  headerIcons: { label: string; icon: string }[];
  headerWhiteIcons: { label: string; icon: string }[];
export type ProductItem = {
  productId: string;
  productName: string;
  quantity?: number;
  price?: string;
  productImage?: {
    data: {
      imageGroups: {
        images: { link: string }[];
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
    }[];
  };
};

// export type ProductItem = {
//   productId: string;
//   productName: string;
// }

export type Order = {
  orderNo: string;
  orderTotal: number;
  productTotal: number;
  currency: string;
  productItems: ProductItem[];
}

export type GetOrderHistoryResponse = {
  getOrderHistory: {
    limit: number;
    offset: number;
    total: number;
    data: Order[];
  };
}