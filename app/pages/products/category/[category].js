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
    const { mainProducts } = useStyles()
    const router = useRouter()
    const { category } = router.query

    const { data, loading, error } = useQuery(SEARCH_PRODUCTS)

    if (loading) return 'loading'
    if (error) console.log(error)

    console.log(category, data)
    return (
        <Container maxWidth="xl" className={mainProducts} disableGutters>
            <Grid container alignContent="space-between">
                <Grid item xs={12} lg={3} xl={2}>
                    <ProductFilters />
                </Grid>
                <Grid item xs={12} lg={8} xl={10}>
                    <ProductsList />
                </Grid>
            </Grid>
        </Container>
    )
}
