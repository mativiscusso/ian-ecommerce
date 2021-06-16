import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Breadcrumbs, CircularProgress, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import ShopCartButton from 'components/Product/ShopCartButton'
import Carousel from 'components/Carousel'
import NoPhoto from 'components/Product/NoPhoto'
import Link from 'components/Link'

import { useQuery } from '@apollo/client'
import { ONE_PRODUCT } from 'graphql/queries'
import { optionsToVariantsMapped, toThousand } from 'utils/helpers'

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
    const [variant, setVariant] = useState('')

    const router = useRouter()
    const { slug } = router.query

    const { data, loading, error } = useQuery(ONE_PRODUCT, {
        variables: { slug: slug || props.slug },
    })

    useEffect(() => {
        if (data && !error) {
            setProduct(data.product)
            setVariant(data.product.variants[0])
        }
    }, [data, error])

    if (loading) return <CircularProgress />

    console.log(product)
    return (
        <Container>
            {product && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        {product.assets.length > 0 ? (
                            <Carousel images={product.assets} />
                        ) : (
                            <NoPhoto />
                        )}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={7}
                        className={classes.detailProduct}
                        style={{ padding: '2rem' }}
                    >
                        <Breadcrumbs aria-label="collections">
                            {product &&
                                product.collections.map((collection, i) => (
                                    <Link
                                        key={collection.name + i}
                                        href={`/products/category/${collection.slug}`}
                                        color="textSecondary"
                                        variant="button"
                                    >
                                        {collection.slug}
                                    </Link>
                                ))}
                        </Breadcrumbs>
                        <Divider />
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            ${toThousand(variant.price)}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            SKU: {variant.sku}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {product.description}
                        </Typography>
                        {product.variants.length > 1 && (
                            <>
                                <div>
                                    <Typography
                                        variant="subtitle2"
                                        color="inherit"
                                    >
                                        Opciones de variantes sugeridas:
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="primary"
                                    >
                                        {optionsToVariantsMapped(
                                            product.variants
                                        )}
                                    </Typography>
                                </div>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={product.variants}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 260, padding: '1rem 0' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Elegí una variante del producto"
                                            variant="outlined"
                                            size="small"
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        setVariant(newValue)
                                    }}
                                    value={variant}
                                    disableClearable={true}
                                    disabled={product.variants.length <= 1}
                                />
                            </>
                        )}
                        <Grid item xs={12} style={{ padding: '1rem 0' }}>
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
                                productId={variant.id}
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
