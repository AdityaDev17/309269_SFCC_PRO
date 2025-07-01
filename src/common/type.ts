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
}