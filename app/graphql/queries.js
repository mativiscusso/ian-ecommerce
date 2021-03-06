import { gql } from '@apollo/client'
import {
    ASSETS_FRAGMENT,
    CART_FRAGMENT,
    SEARCH_RESULT_FRAGMENT,
    ORDER_LIST_FRAGMENT,
} from './fragments'

export const ALL_PRODUCTS = gql`
    query allProducts {
        products {
            items {
                id
                name
                description
                assets {
                    id
                    name
                    preview
                    source
                }
                variants {
                    name
                    sku
                    price
                    productId
                    stockLevel
                }
                facetValues {
                    name
                    facet {
                        name
                    }
                }
            }
        }
    }
`
export const ONE_PRODUCT = gql`
    query oneProduct($slug: String) {
        product(slug: $slug) {
            id
            name
            description
            variants {
                id
                name
                options {
                    code
                    name
                    __typename
                }
                price
                priceWithTax
                sku
                __typename
            }
            featuredAsset {
                ...Asset
                __typename
            }
            assets {
                ...Asset
                __typename
            }
            collections {
                id
                slug
                breadcrumbs {
                    id
                    name
                    slug
                    __typename
                }
                __typename
            }
            __typename
        }
    }
    ${ASSETS_FRAGMENT}
`

export const USER_ACTIVE = gql`
    query me {
        me {
            id
            identifier
            channels {
                id
                token
                code
            }
        }
    }
`

export const CUSTOMER_ACTIVE = gql`
    query customerActive {
        activeCustomer {
            id
            firstName
            lastName
            phoneNumber
            emailAddress
            addresses {
                fullName
                company
                streetLine1
                streetLine2
                city
                province
                postalCode
                country {
                    name
                }
                defaultShippingAddress
                defaultBillingAddress
                customFields
            }
            orders {
                items {
                    state
                    active
                    total
                    orderPlacedAt
                }
                totalItems
            }
            user {
                id
                verified
                lastLogin
                identifier
            }
        }
    }
`
export const ORDER_ACTIVE = gql`
    query orderActive {
        activeOrder {
            ...Cart
            shippingAddress {
                streetLine1
                streetLine2
                city
                province
                postalCode
                country
                phoneNumber
            }
            __typename
        }
    }
    ${CART_FRAGMENT}
`
export const ALL_COLLECTIONS = gql`
    {
        collections {
            items {
                id
                name
                slug
                parent {
                    id
                    name
                    slug
                }
                featuredAsset {
                    preview
                }
                assets {
                    name
                    source
                    preview
                }
                productVariants {
                    totalItems
                }
            }
            totalItems
        }
    }
`
export const ORDER_SHIPPING_METHODS = gql`
    {
        eligibleShippingMethods {
            id
            price
            code
            name
            description
            metadata
        }
    }
`
export const ORDER_PAYMENT_METHODS = gql`
    {
        eligiblePaymentMethods {
            id
            code
            name
            description
            isEligible
            eligibilityMessage
        }
    }
`
export const NEXT_STATES_ORDER = gql`
    {
        nextOrderStates
    }
`
export const SEARCH_PRODUCTS = gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            totalItems
            items {
                ...SearchResult
            }
            facetValues {
                count
                facetValue {
                    id
                    name
                    facet {
                        id
                        name
                    }
                }
            }
        }
    }
    ${SEARCH_RESULT_FRAGMENT}
`
export const ACTIVE_CUSTOMER = gql`
    query activeCustomer {
        activeCustomer {
            id
            createdAt
            title
            firstName
            lastName
            phoneNumber
            emailAddress
            addresses {
                fullName
                streetLine1
                streetLine2
                city
                province
                postalCode
                country {
                    code
                    name
                }
                phoneNumber
            }
            orders(options: { sort: { createdAt: DESC } }) {
                ...OrderList
            }
            user {
                id
                identifier
                verified
                lastLogin
            }
        }
    }
    ${ORDER_LIST_FRAGMENT}
`
export const ORDER_BY_CODE = gql`
    query getOrderByCode($code: String!) {
        orderByCode(code: $code) {
            ...Cart
            fulfillments {
                createdAt
                state
                method
                trackingCode
            }
            history {
                items {
                    type
                    data
                }
                totalItems
            }
            surcharges {
                description
                sku
                taxLines {
                    description
                    taxRate
                }
                price
                priceWithTax
                taxRate
            }
            createdAt
            orderPlacedAt
        }
    }
    ${CART_FRAGMENT}
`
