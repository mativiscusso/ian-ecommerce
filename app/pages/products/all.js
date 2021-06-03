import { Container, Grid } from '@material-ui/core'
import ProductsList from 'components/ProductList'
import ProductFilters from 'components/ProductsFilter'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    mainProducts: {
        marginTop: theme.spacing(12),
    },
}))

export default function AllProducts() {
    const { mainProducts } = useStyles()
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
