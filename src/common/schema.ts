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
export const MERGE_BASKET = `mutation MergeBasket {
  mergeBasket {
    basketId
  }
}`;
export const GET_CUSTOMER_BASKET = `
  query CustomerBasketInfo($customerId: ID!) {
  customerBasketInfo(customerId: $customerId) {
    baskets {
      basketId
    }
  }
}`;
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
        shipments {
        shippingAddress {
          address1
          city
          countryCode
          firstName
          fullName
          id
          lastName
          postalCode
          stateCode
        }
      }
    customerInfo {
      customerId
      email
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

export const GET_CUSTOMER = `
query Customer($customerId: ID!) {
  customer(customerId: $customerId) {
    firstName
    lastName
    email
    gender
    birthday
    phoneHome
    addresses {
      salutation
    }
  }
}
  `;

export const LOGOUT_CUSTOMER = `
  mutation LogoutCustomer($input: LogoutCustomerInput!) {
    logoutCustomer(input: $input) {
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
    }
  }
`;

export const UPDATE_ADDRESS = `
  mutation UpdateCustomerAddress($input: InputCustomerAddress!) {
    updateCustomerAddress(input: $input) {
      addressId
      address1
      address2
      city
      countryCode
      creationDate
      firstName
      fullName
      lastModified
      lastName
      phone
      postalCode
      preferred
      stateCode
    }
  }
`;


export const CREATE_CUSTOMER_ADDRESS = `
  mutation CreateCustomerAddress($input: InputCustomerAddress!) {
    createCustomerAddress(input: $input) {
      addressId
      address1
      address2
      city
      countryCode
      creationDate
      firstName
      fullName
      lastModified
      lastName
      phone
      postalCode
      preferred
      stateCode
    }
  }
`;
export const UPDATE_CUSTOMER_ADDRESS = `
  mutation UpdateCustomerAddress($input: InputCustomerAddress!) {
    updateCustomerAddress(input: $input) {
      addressId
      address1
      address2
      city
      countryCode
      creationDate
      firstName
      fullName
      lastModified
      lastName
      phone
      postalCode
      preferred
      stateCode
    }
  }
`;

export const UPDATE_SHIPPING_ADDRESS = `
mutation UpdateShippingAddress($input: InputCustomerAddress!) {
	updateShippingAddress(input: $input) {
	  shipments {
		shippingAddress {
		  address1
		  city
		  countryCode
		  firstName
		  fullName
		  id
		  lastName
		  postalCode
		  stateCode
		}
	  }
	}
  }`;

// graphql/shipping.ts

export const GET_SHIPPING_METHOD = `
  query GetShippingMethod($basketId: ID!) {
    getShippingMethod(basketId: $basketId) {
      applicableShippingMethods {
        description
        id
        name
        price
      }
      defaultShippingMethodId
    }
  }
`;
export const GET_CUSTOMER_ADDRESS = `
  query GetCustomerAddress($customerId: ID!) {
    getCustomerAddress(customerId: $customerId) {
      addresses {
        addressId
        address1
        address2
        city
        countryCode
        creationDate
        firstName
        fullName
        lastModified
        lastName
        phone
        postalCode
        preferred
        stateCode
      }
    }
  }
`;

export const GET_SHIPPING_ADDRESS_FROM_BASKET = `
  query BasketInfo($basketId: ID!) {
    basketInfo(basketId: $basketId) {
      productSubTotal,
  	  productTotal,
	  currency
      shipments {
        shippingAddress {
          address1
          city
          countryCode
          firstName
          fullName
          id
          lastName
          postalCode
          stateCode
        }
      }
    }
  }
`;

export const UPDATE_SHIPPING_METHOD = `
  mutation UpdateShippingMethod($input: InputShippingMethod!) {
    updateShippingMethod(input: $input) {
      basketId
      billingAddress {
        address1
        city
        countryCode
        firstName
        fullName
        id
        lastName
        postalCode
        stateCode
      }
      channelType
      creationDate
      currency
      customerInfo {
        customerId
        email
      }
      lastModified
      merchandizeTotalTax
      orderTotal
      productItems {
        adjustedTax
        basePrice
        bonusProductLineItem
        gift
        itemId
        itemText
        price
        priceAdjustments {
          appliedDiscount {
            amount
            percentage
            type
          }
          creationDate
          custom
          itemText
          lastModified
          manual
          price
          priceAdjustmentId
          promotionId
        }
        priceAfterOrderDiscount
        priceAfterItemDiscount
        productId
        productName
        quantity
        shipmentId
        tax
        taxBasis
        taxClassId
        taxRate
      }
      shipments {
        adjustedMerchandizeTotalTax
        adjustedShippingTotalTax
        gift
        merchandizeTotalTax
        productSubTotal
        productTotal
        shipmentId
        shipmentTotal
        shippingAddress {
          address1
          city
          countryCode
          firstName
          fullName
          id
          lastName
          postalCode
          stateCode
        }
        shippingMethod {
          description
          id
          name
          price
        }
        shippingStatus
        shippingTotal
        shippingTotalTax
        taxTotal
      }
      shippingItems {
        adjustedTax
        basePrice
        itemId
        itemText
        price
        priceAfterItemDiscount
        shipmentId
        tax
        taxBasis
        taxClassId
        taxRate
      }
      shippingTotal
      shippingTotalTax
      taxRoundedAtGroup
      taxTotal
      taxation
      temporaryBasket
      productSubTotal
      productTotal
    }
  }
`;

// MyAccount/Personal-info mutations


export const UPDATE_CUSTOMER = `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      firstName
      lastName
      email
      phoneHome
      gender
      birthday
	  
    }
  }
`;

export const UPDATE_PASSWORD = `
  mutation UpdateCustomerPassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`;


export const DELETE_CUSTOMER_ADDRESS = `
mutation RemoveCustomerAddress($input: InputCustomerAddress!) {
  removeCustomerAddress(input: $input) {
    addressId
    address1
    address2
    city
    countryCode
    creationDate
    firstName
    fullName
    lastModified
    lastName
    phone
    postalCode
    preferred
    stateCode
  }
}`;




export const ADD_PAYMENT_INSTRUMENT_TO_BASKET = `
mutation AddPaymentInstrumentToBasket($input: AddPaymentInstrument!) {
  addPaymentInstrumentToBasket(input: $input) {
    basketId
  }
}
`;
export const CREATE_ORDER = `
mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input) {
    orderNo
  }
}
`;
export const UPDATE_ORDER = `
mutation UpdateOrder($input: updateOrderInput!) {
  updateOrder(input: $input) {
    apiResponseType
  }
}
`;

export const UPDATE_CUSTOMER_INFO_IN_BASKET = `
  mutation UpdateCustomerDetails($customerDetailInput: CustomerDetailInput!) {
  updateCustomerDetails(customerDetailInput: $customerDetailInput) {
	customerInfo {
	  email
	  customerId
	}
  }
}
`
