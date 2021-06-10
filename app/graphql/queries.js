import { gql } from '@apollo/client'
import { CART_FRAGMENT, SEARCH_RESULT_FRAGMENT } from './fragments'

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
    query oneProduct($slug: String, $id: ID) {
        product(slug: $slug, id: $id) {
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
                options {
                    code
                    name
                }
                stockLevel
            }
            facetValues {
                name
                facet {
                    name
                }
            }
            collections {
                id
                slug
            }
        }
    }
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
