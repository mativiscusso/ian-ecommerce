import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import { ReactComponent as RbNew } from "../../utils/svg/rb-new.svg";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ShopCartButton from 'components/Product/ShopCartButton'
import Carousel from 'components/Carousel'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('lg')]: {
            marginTop: 150,
        },
    },
    detailProduct: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    imgFluid: {
        position: 'relative',
        width: '100%',
    },
    marginTags: {
        marginRight: '0.5rem',
    },
    ribbonNew: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 70,
    },
}))

const ProductDetail = ({ data }) => {
    const classes = useStyles()
    const { product } = data

    const image = product.assets[0].source.replace(/[\\]+/g, '/')
    console.log(product.assets)
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    {product.assets ? (
                        <Carousel images={product.assets} />
                    ) : (
                        <img
                            src={image}
                            alt="Product"
                            className={classes.imgFluid}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={6} className={classes.detailProduct}>
                    <Typography variant="body1" gutterBottom>
                        Categoria del producto
                    </Typography>
                    <Divider />
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        ${product.variants[0].price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {product.description}
                    </Typography>

                    <ShopCartButton />
                </Grid>
            </Grid>
            <Carousel />
        </Container>
    )
}

export default ProductDetail
