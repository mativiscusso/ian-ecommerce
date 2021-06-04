import React from 'react'
import Product from '../Product'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

const ProductsList = ({ data }) => {
    return (
        <Grid container spacing={2}>
            {data && data.search && data.search.items.length > 0 ? (
                data.search.items.map((product) => (
                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={2}
                        key={product.id}
                    >
                        <Product {...product} />
                    </Grid>
                ))
            ) : (
                <Typography> No se encontraron productos</Typography>
            )}
        </Grid>
    )
}

export default ProductsList
