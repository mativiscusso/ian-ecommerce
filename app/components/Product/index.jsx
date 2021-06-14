import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import { ReactComponent as RbNew } from '../utils/svg/rb-new.svg'
import QuickView from '../ProductQuickView'
import NoPhoto from './NoPhoto'
import Link from 'next/link'
import { formatURLImage, toThousand } from 'utils/helpers'

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        transition: 'all 0.1s',
        height: '80%',
        '&:hover': {
            transform: 'scale(1.01) translateY(-5px)',
            zIndex: 1000,
            height: '100%',
        },

        marginBottom: '1rem',
    },
    media: {
        backgroundSize: 'contain',
        height: 200,
    },
    productName: {
        height: 35,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    productPrice: {
        position: 'relative',
        top: 10,
        fontWeight: 'bolder',
    },
    ribbonNew: {
        position: 'absolute',
        top: -10,
        right: -5,
        width: 70,
    },
    buttonsActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

export default function Product(props) {
    const classes = useStyles()

    return (
        <Card className={classes.root} elevation={0}>
            <Link href={`/products/${props.slug}`}>
                <CardActionArea>
                    {props.productAsset?.preview ? (
                        <CardMedia
                            className={classes.media}
                            image={formatURLImage(props.productAsset.preview)}
                            title={props.productName}
                        />
                    ) : (
                        <NoPhoto />
                    )}

                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="body1"
                            color="textPrimary"
                            className={classes.productName}
                        >
                            {props.productName}
                        </Typography>

                        <Typography
                            gutterBottom
                            variant="h5"
                            color="textPrimary"
                            className={classes.productPrice}
                        >
                            ${toThousand(props.priceWithTax.max)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <QuickView {...props} />
                <Link href={`/products/${props.productId}`}>
                    <a style={{ width: '100%' }}>
                        <Button variant="outlined" color="primary" fullWidth>
                            COMPRAR
                        </Button>
                    </a>
                </Link>
            </CardActions>
        </Card>
    )
}
