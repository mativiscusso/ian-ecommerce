import { gql } from '@apollo/client'

export const ASSETS_FRAGMENT = gql`
    fragment Asset on Asset {
        id
        width
        height
        name
        preview
        focalPoint {
            x
            y
            __typename
        }
        __typename
    }
`

export const CART_FRAGMENT = gql`
    fragment Cart on Order {
        id
        code
        state
        active
        lines {
            id
            featuredAsset {
                ...Asset
                __typename
            }
            unitPrice
            unitPriceWithTax
            quantity
            linePriceWithTax
            discountedLinePriceWithTax
            productVariant {
                id
                name
                __typename
            }
            discounts {
                amount
                amountWithTax
                description
                adjustmentSource
                type
                __typename
            }
            __typename
        }
        totalQuantity
        subTotal
        subTotalWithTax
        total
        totalWithTax
        shipping
        shippingWithTax
        shippingLines {
            priceWithTax
            shippingMethod {
                id
                code
                name
                description
                checker {
                    args {
                        value
                    }
                }
                __typename
            }
            __typename
        }
        discounts {
            amount
            amountWithTax
            description
            adjustmentSource
            type
            __typename
        }
        __typename
    }
    ${ASSETS_FRAGMENT}
`
export const PAYMENTS = gql`
    fragment Payments on Order {
        payments {
            method
            state
            transactionId
            amount
            errorMessage
            refunds {
                total
                reason
            }
            metadata
        }
        currencyCode
        fulfillments {
            id
            state
            method
            trackingCode
        }
    }
`
export const SEARCH_RESULT_FRAGMENT = gql`
    fragment SearchResult on SearchResult {
        productId
        productName
        description
        description
        slug
        sku
        currencyCode
        productAsset {
            id
            preview
        }
        price {
            ... on SinglePrice {
                value
            }
            ... on PriceRange {
                min
                max
            }
        }
        priceWithTax {
            ... on SinglePrice {
                value
            }
            ... on PriceRange {
                min
                max
            }
        }
    }
`
export const ORDER_LIST_FRAGMENT = gql`
    fragment OrderList on OrderList {
        totalItems
        items {
            id
            code
            state
            active
            createdAt
            orderPlacedAt
            lines {
                id
                featuredAsset {
                    ...Asset
                    __typename
                }
                unitPrice
                unitPriceWithTax
                quantity
                linePriceWithTax
                discountedLinePriceWithTax
                productVariant {
                    id
                    name
                    __typename
                }
                discounts {
                    amount
                    amountWithTax
                    description
                    adjustmentSource
                    type
                    __typename
                }
                __typename
            }
            totalQuantity
            subTotal
            subTotalWithTax
            total
            totalWithTax
            shipping
            shippingWithTax
            shippingLines {
                priceWithTax
                shippingMethod {
                    id
                    code
                    name
                    description
                    checker {
                        args {
                            value
                        }
                    }
                    __typename
                }
                __typename
            }
            discounts {
                amount
                amountWithTax
                description
                adjustmentSource
                type
                __typename
            }
            __typename
        }
    }
    ${ASSETS_FRAGMENT}
`
