import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    { name: 'Shipping', desc: '', price: 'Free' },
]
const addresses = [
    '1 Material-UI Drive',
    'Reactville',
    'Anytown',
    '99999',
    'USA',
]
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
]

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}))

export default function Review({ handleBack, customer, orderActive }) {
    const classes = useStyles()

    const handleFinishOrder = () => {
        console.log('finish')
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Resumen de tu orden
            </Typography>
            <List disablePadding>
                {orderActive &&
                    orderActive.lines.map((product) => (
                        <ListItem
                            className={classes.listItem}
                            key={product.productVariant.name}
                        >
                            <ListItemText
                                primary={product.productVariant.name}
                                secondary={`$ ${product.productVariant.price} x ${product.quantity}`}
                            />
                            <Typography variant="body2">
                                ${product.linePrice}
                            </Typography>
                        </ListItem>
                    ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {orderActive && orderActive.total}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Datos de envío
                    </Typography>
                    <Typography gutterBottom>
                        {customer &&
                            `${customer.firstName} ${customer.lastName}`}
                    </Typography>
                    <Typography gutterBottom>
                        {orderActive && orderActive.shippingAddress.streetLine1}
                    </Typography>
                    <Typography gutterBottom>
                        {orderActive && orderActive.shippingAddress.city}
                    </Typography>
                    <Typography gutterBottom>
                        {orderActive && orderActive.shippingAddress.province}
                    </Typography>
                    <Typography gutterBottom>
                        {orderActive && orderActive.shippingAddress.phoneNumber}
                    </Typography>
                    <Typography gutterBottom>
                        {orderActive && orderActive.shippingAddress.postalCode}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Detalles de pago
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.detail}
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button style={{ marginRight: 12 }} onClick={handleBack}>
                        ANTERIOR
                    </Button>
                    <Button variant="contained" onClick={handleFinishOrder}>
                        FINALIZAR
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
