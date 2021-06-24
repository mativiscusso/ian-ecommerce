import React from 'react'
import Product from '../Product'

import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    scrollBar: {
        '&::-webkit-scrollbar': {
            width: '0.4rem',
            height: '.7rem',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: [theme.palette.primary.main],
            outline: '0px ',
            width: '0.4em',
        },
        overflowY: 'auto',
    },
}))

const ProductsList = ({ data, loading }) => {
    const { scrollBar } = useStyles()

    if (loading) {
        return (
            <React.Fragment>
                <Grid container wrap="wrap">
                    {Array.from(new Array(4)).map((index) => (
                        <Box key={index} width={210} marginRight={0.5} my={5}>
                            <Skeleton variant="rect" width={200} height={200} />
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
                    ))}
                </Grid>
            </React.Fragment>
        )
    }
    return (
        <Grid container className={scrollBar} wrap="nowrap">
            {data && data.search && data.search.items.length > 0 ? (
                data.search.items.map((product) => (
                    <Grid item key={product.productId}>
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
