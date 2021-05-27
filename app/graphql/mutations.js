import gql from 'graphql-tag'

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
    mutation addItem($productId: ID!, $quantity: Int!) {
        addItemToOrder(productVariantId: $productId, quantity: $quantity) {
            __typename
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
