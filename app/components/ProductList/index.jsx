import React from 'react'
import Product from '../Product'
import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS } from 'graphql/queries'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'

const ProductsList = () => {
    const { loading, error, data } = useQuery(ALL_PRODUCTS)

    if (loading) {
        return <h1>loading...</h1>
    }

    if (error) {
        console.dir(error)
        return <h1> error </h1>
    }

    return (
        <Container maxWidth={false}>
            <Grid container spacing={2}>
                {data.products &&
                    data.products.items.map((product) => (
                        <Grid item xs={6} sm={6} md={3} lg={2} key={product.id}>
                            <Product {...product} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    )
}

export default ProductsList
