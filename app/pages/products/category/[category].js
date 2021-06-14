import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { CircularProgress, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import ProductsList from 'components/ProductList'
import ProductFilters from 'components/ProductsFilter'

import { useQuery } from '@apollo/client'
import { SEARCH_PRODUCTS } from 'graphql/queries'
import OrderFilter from 'components/ProductsFilter/OrderFilter'

const useStyles = makeStyles((theme) => ({
    mainProducts: {
        marginTop: theme.spacing(12),
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(4),
        },
    },
}))

export default function AllProducts() {
    const [products, setProducts] = useState(undefined)

    const { mainProducts } = useStyles()

    const router = useRouter()
    const { category } = router.query

    const { data, loading, error } = useQuery(SEARCH_PRODUCTS, {
        variables: {
            input: { collectionSlug: category, groupByProduct: true },
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
    }, [category, data, error])

    if (loading) return <CircularProgress />

    if (error) console.log(error)

    return (
        <Container maxWidth="xl" className={mainProducts}>
            <Grid container justify="center">
                <Grid item xs={12} lg={3} xl={2}>
                    <ProductFilters
                        products={products}
                        setProducts={setProducts}
                        collectionSlug={category}
                    />
                </Grid>
                <Grid item xs={12} lg={8} xl={10}>
                    <OrderFilter
                        products={products}
                        setProducts={setProducts}
                        collectionSlug={category}
                    />
                    <ProductsList data={products} />
                </Grid>
            </Grid>
        </Container>
    )
}
