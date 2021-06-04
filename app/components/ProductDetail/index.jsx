import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ShopCartButton from 'components/Product/ShopCartButton'
import Carousel from 'components/Carousel'
import { TextField } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { ONE_PRODUCT } from 'graphql/queries'
import { formatURLImage } from 'utils/helpers'

const useStyles = makeStyles({
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
})

const ProductDetail = (props) => {
    const classes = useStyles()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(undefined)

    const { data, loading, error } = useQuery(ONE_PRODUCT, {
        variables: { id: props.productId },
    })

    useEffect(() => {
        if (data && !error) {
            setProduct(data.product)
        }
    }, [data, error])

    if (loading) return 'loading'
    console.log(product)

    // const image = props.assets[0].source.replace(/[\\]+/g, '/')
    return (
        <Container>
            {product && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        {product.assets ? (
                            <Carousel images={product.assets} />
                        ) : (
                            <img
                                src={formatURLImage(product.assets[0].source)}
                                alt="Product"
                                className={classes.imgFluid}
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={7}
                        className={classes.detailProduct}
                        style={{ padding: '2rem' }}
                    >
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
                        <Grid
                            item
                            xs={12}
                            alignContent="space-between"
                            alignItems="top"
                            style={{ padding: '1rem 0' }}
                        >
                            <TextField
                                id="quantity"
                                label="Cantidad"
                                type="number"
                                size="small"
                                variant="outlined"
                                defaultValue={quantity}
                                onChange={({ target }) => {
                                    const qty = Number(target.value)
                                    setQuantity(qty)
                                }}
                                style={{ width: '20%', marginRight: 15 }}
                            />

                            <ShopCartButton
                                productId={product.variants[0].productId}
                                quantity={quantity}
                            />
                        </Grid>
                    </Grid>
                    <Carousel />
                </Grid>
            )}
        </Container>
    )
}

export default ProductDetail
