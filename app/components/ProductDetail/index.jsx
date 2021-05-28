import { useState } from 'react'
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

const ProductDetail = (props) => {
    console.log(props)
    const classes = useStyles()
    const [quantity, setQuantity] = useState(1)

    const image = props.assets[0].source.replace(/[\\]+/g, '/')
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    {props.assets ? (
                        <Carousel images={props.assets} />
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
                        {props.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        ${props.variants[0].price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {props.description}
                    </Typography>

                    <ShopCartButton
                        productId={props.variants[0].productId}
                        quantity={quantity}
                    />
                </Grid>
            </Grid>
            <Carousel />
        </Container>
    )
}

export default ProductDetail
