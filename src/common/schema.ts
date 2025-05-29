import { gql } from "@apollo/client";

export const GET_PRODUCT_DETAILS = `
  query GetProductDetails($productId: String!) {
    getProductDetails(productId: $productId) {
      name
      currency
      longDescription
      price
      imageGroups {
        images {
          alt
          link
          title
          disBaseLink
        }
        viewType
      }
    }
  }
`;
export const CREATE_CART = `
  mutation CreateCart($input: CartInput!) {
    createCart(input: $input) {
      basketId
      currency
      productItems {
        itemId
        productId
        quantity
        basePrice
        price
        tax
        productName
        productImage {
          data {
            imageGroups {
              images {
                alt
                link
                title
                disBaseLink
              }
              viewType
            }
          }
        }
      }
    }
  }
`;
export const ADD_ITEM_TO_BASKET = `
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      basketId
      currency
      productItems {
        basePrice
        itemId
        price
        productId
        productImage {
          data {
            imageGroups {
              images {
                link
              }
            }
          }
        }
        quantity
        tax
        productName
      }
    }
  }
`;
export const GET_CUSTOMER_PRODUCTLIST = `
  query GetCustomerProductLists($customerId: ID!) {
    getCustomerProductLists(customerId: $customerId) {
      data {
        id
      }
    }
  }
`;
export const ADD_ITEM_TO_PRODUCTLIST = `
  mutation AddToWishlist($input: WishlistInput!) {
    addToWishlist(input: $input) {
      id
      priority
      productId
      public
      quantity
    }
  }
`;
export const GET_BASKET = `
  query GetBasket($basketId: ID!) {
    getBasket(basketId: $basketId) {
      basketId
      currency
      productSubTotal
      productTotal
      productItems {
        itemId
        itemText
        productId
        quantity
        price
        productImage {
          data {
            imageGroups {
              images {
                alt
                link
                title
                disBaseLink
              }
            }
          }
        }
        productName
      }
    }
  }
`;
export const WISHLIST_DATA = `
    query GetWishlist($customerId: ID!) {
      getWishlist(customerId: $customerId) {
        data {
          customerProductListItems {
            productImage {
              data {
                imageGroups {
                  images {
                    disBaseLink
                    alt
                    link
                    title
                  }
                }
                name
                price
                id
                currency
                brand
              }
            }
          }
        }
      }
    }
`;
