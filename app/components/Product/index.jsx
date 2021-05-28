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
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        transition: 'all 0.1s',
        height: '100%',
        '&:hover': {
            transform: 'scale(1.05) translateY(-20px)',
            zIndex: 1000,
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
        fontWeight: 'bolder',
        marginBottom: 5,
    },
    productPrice: {
        position: 'relative',
        top: 10,
        fontWeight: 'bold',
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

    const image = props.assets[0].source.replace(/[\\]+/g, '/')
    console.log(props)
    return (
        <Card className={classes.root} elevation={0}>
            <Link href={`/products/${props.id}`}>
                <a>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={props.name}
                        />

                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="body2"
                                color="textSecondary"
                                className={classes.productName}
                            >
                                {props.name}
                            </Typography>

                            <Typography
                                gutterBottom
                                variant="h6"
                                color="textPrimary"
                                className={classes.productPrice}
                            >
                                ${props.variants[0].price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </a>
            </Link>
            <CardActions className={classes.buttonsActions}>
                <QuickView {...props} />
                <Link href={`/products/${props.id}`}>
                    <a>
                        <Button variant="contained" size="small">
                            COMPRAR
                        </Button>
                    </a>
                </Link>
            </CardActions>
        </Card>
    )
}
