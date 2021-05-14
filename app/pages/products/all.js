import { Container, Grid } from '@material-ui/core'
import ProductsList from 'components/ListProducts'
import ProductFilters from 'components/ProductsFilter'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  mainProducts: {
    marginTop: theme.spacing(10)
  }
}))

export default function AllProducts () {
  const { mainProducts } = useStyles()
  return (
    <Container maxWidth='xl' className={mainProducts}>
      <Grid container>
        <Grid xs={12} lg={3} xl={2}>
          <ProductFilters />
        </Grid>
        <Grid xs={12} lg={8} xl={10}>
          <ProductsList />
        </Grid>
      </Grid>
    </Container>
  )
}
