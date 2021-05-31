import { gql } from '@apollo/client'

export const CART_FRAGMENT = gql`
    fragment Cart on Order {
        id
        code
        createdAt
        totalQuantity
        subTotal
        subTotalWithTax
        total
        totalWithTax
        currencyCode
        customer {
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
        }
        lines {
            id
            quantity
            linePriceWithTax
            discountedLinePriceWithTax
            featuredAsset {
                id
                preview
            }
            discounts {
                description
                amount
            }
            productVariant {
                id
                name
                sku
                price
                priceWithTax
                stockLevel
                product {
                    slug
                }
                productId
            }
        }
    }
`
