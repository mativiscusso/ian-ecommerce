import { gql } from '@apollo/client'
import { CART_FRAGMENT, PAYMENTS } from './fragments'

export const USER_ACCOUNT_VERIFY = `
    mutation verifyCustomerAccount($token: String!, $password: String) {
        verifyCustomerAccount(token: $token, password: $password) {
            __typename
        }
    }
`

export const USER_LOGIN = `
    mutation login($user: String!, $password: String!, $rememberMe: Boolean) {
        login(username: $user, password: $password, rememberMe: $rememberMe) {
            __typename
            ... on CurrentUser {
                id
                identifier
                channels {
                    id
                    token
                    code
                }
            }
        }
    }
`
export const USER_REGISTER = `
    mutation Register($data: RegisterCustomerInput!) {
        registerCustomerAccount(input: $data) {
            __typename
            
        }
    }
`

export const USER_LOGOUT = `
    mutation {
        logout {
            success
            __typename
        }
    }
`
export const USER_REQUEST_RESET_PASSWORD = gql`
    mutation requestPasswordReset($email: String!) {
        requestPasswordReset(emailAddress: $email) {
            __typename
        }
    }
`
export const USER_RESET_PASSWORD = `
mutation resetPassword($token:String!, $password: String!) {
    resetPassword(token:$token, password:$password) {
     __typename
    }
  }`

export const ADD_ITEM_CART = gql`
    ${CART_FRAGMENT}
    mutation addItem($productId: ID!, $quantity: Int!) {
        addItemToOrder(productVariantId: $productId, quantity: $quantity) {
            __typename
            ...Cart
        }
    }
`
export const CHANGE_QTY_ITEM_CART = gql`
    mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
        adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
            __typename
        }
    }
`
export const REMOVE_ITEM_CART = gql`
    mutation removeOrderLine($orderLineId: ID!) {
        removeOrderLine(orderLineId: $orderLineId) {
            __typename
        }
    }
`

export const EMPTY_CART = gql`
    mutation removeAllOrderLines {
        removeAllOrderLines {
            __typename
        }
    }
`
export const SET_CUSTOMER_ORDER = gql`
    mutation setCustomerForOrder($input: CreateCustomerInput!) {
        setCustomerForOrder(input: $input) {
            __typename
        }
    }
`
export const SET_ADDRESSES_ORDER = gql`
    ${CART_FRAGMENT}
    mutation setShipping($input: CreateAddressInput!) {
        setOrderShippingAddress(input: $input) {
            __typename
            ...Cart
        }
    }
`
export const SET_SHIPPING_METHOD_ORDER = gql`
    mutation setShippingMethod($shippingMethod: ID!) {
        setOrderShippingMethod(shippingMethodId: $shippingMethod) {
            __typename
        }
    }
`
export const CHANGE_STATE_ORDER = gql`
    mutation transitionOrderToState($state: String!) {
        transitionOrderToState(state: $state) {
            __typename
        }
    }
`
export const SET_PAYMENT_METHOD_ORDER = gql`
    ${PAYMENTS}
    mutation addPaymentToOrder($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
            __typename
            ...Payments
        }
    }
`
