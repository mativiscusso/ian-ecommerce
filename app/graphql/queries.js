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
