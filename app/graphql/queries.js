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
    {
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
export const ORDER_ACTIVE = gql`
    {
        activeOrder {
            id
            state
            code
            active
            lines {
                id
                productVariant {
                    productId
                    name
                    price
                }
                quantity
            }
            totalQuantity
            subTotal
        }
    }
`
