/*Page Schema*/
export const GET_PRODUCT_DETAILS = `
  query ProductDetails($productId: String!) {
  productDetails(productId: $productId) {
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
export const GET_PRODUCT_LIST = `
  query GetProductList($getProductListId: String!) {
    getProductList(id: $getProductListId) {
      limit
      hits {
        currency
        hitType
        image {
          alt
          disBaseLink
          link
          title
        }
        orderable
        price
        pricePerUnit
        productId
        productName
      }
    }
  }
`;
export const GET_ORDER_DETAILS = `
  query Query($orderId: ID!) {
    orderInfo(orderId: $orderId) {
      currency
      orderNo
      orderTotal
      productItems {
        price
        productImage {
          data {
            imageGroups {
              images {
                alt
                link
              }
            }
          }
        }
        quantity
        productId
        productName
      }
      shipments {
        shippingAddress {
          address1
          city
          countryCode
          fullName
        }
      }
      creationDate
      paymentInstruments {
        paymentMethodId
      }
      taxTotal
      productSubTotal
      productTotal
    }
  }
`;
export const GET_CATEGORIES = `
  query GetCategories($id: ID!) {
    categories(id: $id) {
      categories {
        id
        name
        description
        onlineSubCategoriesCount
        parentCategoryId
        parentCategoryTree {
          id
          name
        }
        c_enableCompare
        c_showInMenu
        subcategories {
          data {
            categories {
              id
              name
              description
              onlineSubCategoriesCount
              parentCategoryId
              c_enableCompare
              c_showInMenu
            }
          }
        }
      }
    }
  }
`;
export const REGISTER = `
    mutation RegisterCustomerHandler($input: RegisterInput!) {
        registerCustomerHandler(input: $input) {
            authType
            creationDate
            customerId
            customerNo
            email
            enabled
            firstName
            lastModified
            lastName
            login
        }
    }
`;
/*Page Schema Ends*/

/*Basket Schema*/
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
export const GET_BASKET = `
 query BasketInfo($basketId: ID!) {
  basketInfo(basketId: $basketId) {
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
export const UPDATE_BASKET_ITEM = `
  mutation UpdateBasketItem($input: UpdateBasket!) {
  updateBasketItem(input: $input) {
    basketId
  }
}`;
export const DELETE_BASKET_ITEM = `
mutation RemoveBasketItem($input: RemoveItem!) {
  removeBasketItem(input: $input) {
    basketId
  }
}`;
/*Basket Schema Ends*/

/*Customer product List(wishlist) Schema*/
export const GET_CUSTOMER_PRODUCTLIST = `
  query CustomerProductListsInfo($customerId: ID!) {
  customerProductListsInfo(customerId: $customerId) {
    data {
      id
      type
      customerProductListItems {
        productId
      }
    }
  }
}
`;
export const CREATE_CUSTOMER_PRODUCT_LIST = `
  mutation CreateCustomerProductList($input: CreateCustomerProductList!) {
  createCustomerProductList(input: $input) {
    id
    type
  }
}`;
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
/*Customer product List(wishlist) Schema Ends*/

/*Access Token Schema */
export const GET_ACCESS_TOKEN = `
  mutation GetAccessToken($input: AccessTokenInput!) {
    getAccessToken(input: $input) {
      access_token
      id_token
      refresh_token
      expires_in
      refresh_token_expires_in
      token_type
      usid
      customer_id
      enc_user_id
      idp_access_token
      idp_refresh_token
    }
  }
`;
/*Access Token Schema Ends*/
