import { useState, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import ProductsList from 'components/ProductList'
import ProductFilters from 'components/ProductsFilter'
import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'

import { SEARCH_PRODUCTS } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    mainProducts: {
        marginTop: theme.spacing(12),
    },
}))

export default function AllProducts() {
    const [products, setProducts] = useState(undefined)
    const { mainProducts } = useStyles()
    const router = useRouter()

    const { q } = router.query

    const { data, loading, error } = useQuery(SEARCH_PRODUCTS, {
        variables: {
            input: { term: q, groupByProduct: true },
        },
    })

    useEffect(() => {
        if (error) {
            console.dir(error)
            return <h1> error </h1>
        }

        if (data && !error) {
            setProducts(data)
        }
    }, [q, data, error])

    if (loading) {
        return <h1>loading...</h1>
    }

    console.log(q, products)
    return (
        <Container maxWidth="xl" className={mainProducts}>
            <Grid container justify="center">
                <Grid item xs={12} lg={3} xl={2}>
                    <ProductFilters />
                </Grid>
                <Grid item xs={12} lg={8} xl={10}>
                    <ProductsList data={data} />
                </Grid>
            </Grid>
        </Container>
    )
}
