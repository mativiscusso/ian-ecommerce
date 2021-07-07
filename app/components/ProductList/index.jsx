import React from 'react'
import Product from '../Product'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Box from '@material-ui/core/Box'

const ProductsList = ({ data, loading }) => {
    if (loading) {
        return (
            <React.Fragment>
                <Grid container wrap="nowrap">
                    {Array.from(new Array(4)).map((index) => (
                        <Grid
                            item
                            xs={6}
                            sm={6}
                            md={3}
                            lg={3}
                            xl={2}
                            key={Math.random() + 'grid'}
                        >
                            <Box
                                key={Math.random() + 'box'}
                                width={210}
                                marginRight={0.5}
                                my={5}
                            >
                                <Skeleton
                                    variant="rect"
                                    width={200}
                                    height={200}
                                />
                                <Box pt={0.5}>
                                    <Skeleton width={150} /> <br />
                                    <Skeleton width={100} />
                                    <Skeleton
                                        variant="rect"
                                        width={100}
                                        height={50}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        )
    }
    return (
        <Grid container spacing={1}>
            {data && data.search && data.search.items.length > 0 ? (
                data.search.items.map((product) => (
                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={2}
                        key={product.productId + 'product' + Math.random()}
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
