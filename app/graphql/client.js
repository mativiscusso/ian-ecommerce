import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/shop-api',
    credentials: 'include',
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default client
