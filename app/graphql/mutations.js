import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
    mutation Register($data: RegisterCustomerInput!) {
        registerCustomerAccount(input: $data) {
            __typename
        }
    }
`;

export const USER_LOGIN = gql`
    mutation login($user: String!, $password: String!, $rememberMe: Boolean) {
        login(username: $user, password: $password, rememberMe: $rememberMe) {
            __typename
        }
    }
`;

export const USER_ACCOUNT_VERIFY = gql`
    mutation verifyCustomerAccount($token: String!, $password: String) {
        verifyCustomerAccount(token: $token, password: $password) {
            __typename
        }
    }
`;
