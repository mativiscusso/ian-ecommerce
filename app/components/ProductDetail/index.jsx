import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import { ReactComponent as RbNew } from "../../utils/svg/rb-new.svg";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import ShopCartButton from 'components/Product/ShopCartButton'

const dataProducts = [
    {
        id: '1',
        name: 'Cafetera Moulinex Dolce Gusto Edited',
        priceBase: 100,
        tags: ['tag1', 'tag2', 'tag3'],
        description:
            'Cafetera Dolce Gusto Lumio. La cafetera Dolce Gusto Lumio es de variedad automática que ha llegado con un diseño radical al que nos tenía acostumbrados Dolce Gusto.En este post te contamos todo lo que necesitas saber sobre ella, desde sus características técnicas hasta la calidad de las cápsulas o priceBase.',
        images: [
            'https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg',
        ],
        isFeatured: true,
        isPublished: true,
    },
]

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

const ProductDetail = ({ data }) => {
    const classes = useStyles()
    const { product } = data
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img
                        src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                        alt="Product"
                        className={classes.imgFluid}
                    />
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
        </Container>
    )
}

export default ProductDetail
