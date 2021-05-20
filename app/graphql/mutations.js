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
