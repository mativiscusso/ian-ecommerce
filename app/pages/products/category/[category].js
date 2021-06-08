import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import ProductsList from 'components/ProductList'
import ProductFilters from 'components/ProductsFilter'

import { useLazyQuery, useQuery } from '@apollo/client'
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
    const [orderBy, setOrderBy] = useState('')

    const { mainProducts } = useStyles()

    const router = useRouter()
    const { category } = router.query

    const { data, loading, error } = useQuery(SEARCH_PRODUCTS, {
        variables: {
            input: { collectionSlug: category, groupByProduct: true },
        },
    })
    const [sortProducts] = useLazyQuery(SEARCH_PRODUCTS, {
        variables: {
            input: { collectionSlug: category, groupByProduct: true },
        },
    })

    if (loading) return 'loading'
    if (error) console.log(error)

    useEffect(() => {
        if (error) {
            console.dir(error)
            return <h1> error </h1>
        }

        if (data && !error) {
            setProducts(data)
        }
    }, [data, error])

    if (loading) {
        return <h1>loading...</h1>
    }

    const handleChange = (event) => {
        setOrderBy(event.target.value)
    }

    return (
        <Container maxWidth="xl" className={mainProducts}>
            <Grid container justify="center">
                <Grid item xs={12} lg={3} xl={2}>
                    <ProductFilters />
                </Grid>
                <Grid item xs={12} lg={8} xl={10}>
                    <OrderFilter
                        products={products}
                        handleChange={handleChange}
                        orderBy={orderBy}
                    />
                    <ProductsList data={data} />
                </Grid>
            </Grid>
        </Container>
    )
}
