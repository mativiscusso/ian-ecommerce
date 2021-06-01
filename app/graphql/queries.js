import { gql } from '@apollo/client'

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
    query oneProduct($id: ID) {
        product(id: $id) {
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
            id
            state
            code
            active
            lines {
                id
                featuredAsset {
                    source
                    preview
                }
                productVariant {
                    productId
                    name
                    price
                }
                quantity
                linePrice
            }
            totalQuantity
            subTotal
            total
        }
    }
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
                children {
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
