import { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import { Button, Container, Divider, Grid } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import AddressForm from 'components/AddressForm'
import Review from 'components/Review'
import ShippingsForm from 'components/ShippingForm'

import { useQuery } from '@apollo/client'
import { CUSTOMER_ACTIVE, ORDER_ACTIVE } from 'graphql/queries'
import { toThousand } from 'utils/helpers'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(4),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}))

export default function Checkout() {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [customer, setCustomer] = useState(undefined)
    const [orderActive, setOrderActive] = useState(undefined)
    const [paymentElegibled, setPaymentElegibled] = useState(undefined)

    const { data: dataCustomer, error: errorCustomer } =
        useQuery(CUSTOMER_ACTIVE)
    const { data: dataOrder, error: errorOrder } = useQuery(ORDER_ACTIVE)

    useEffect(() => {
        if (dataCustomer && !errorCustomer) {
            setCustomer(dataCustomer.activeCustomer)
        }
    }, [dataCustomer, errorCustomer])

    useEffect(() => {
        if (dataOrder && !errorOrder) {
            console.log(dataOrder)
            setOrderActive(dataOrder.activeOrder)
        }
    }, [dataOrder, errorOrder])

    if (errorCustomer) return console.log(errorCustomer)

    console.log(customer, dataOrder)

    const steps = [
        'Direcciones de entrega',
        'Métodos de envío',
        'Finalizar orden',
    ]

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <AddressForm
                        customer={customer}
                        orderActive={orderActive}
                        handleNext={handleNext}
                    />
                )
            case 1:
                return (
                    <ShippingsForm
                        handleNext={handleNext}
                        handleBack={handleBack}
                        setPaymentElegibled={setPaymentElegibled}
                    />
                )
            case 2:
                return (
                    <Review
                        handleBack={handleBack}
                        handleNext={handleNext}
                        customer={customer}
                        orderActive={orderActive}
                        paymentElegibled={paymentElegibled}
                    />
                )
            default:
                throw new Error('Unknown step')
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    return (
        <>
            <Container maxWidth="lg" className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Grid container spacing={3}>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Gracias por su orden.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Ingrese a su cuenta para ver los detalles.
                                </Typography>
                                <Button variant="contained" href="/">
                                    SEGUIR COMPRANDO
                                </Button>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12} lg={8}>
                                    {getStepContent(activeStep)}
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Typography variant="h6" gutterBottom>
                                        Tu pedido
                                    </Typography>
                                    <List disablePadding>
                                        {orderActive &&
                                            orderActive.lines.map((product) => (
                                                <ListItem
                                                    className={classes.listItem}
                                                    key={
                                                        product.productVariant
                                                            .name
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={
                                                            product
                                                                .productVariant
                                                                .name
                                                        }
                                                        secondary={`$ ${toThousand(
                                                            product.unitPrice
                                                        )} x ${
                                                            product.quantity
                                                        }`}
                                                    />
                                                    <Typography variant="body2">
                                                        $
                                                        {toThousand(
                                                            product.unitPrice
                                                        )}
                                                    </Typography>
                                                </ListItem>
                                            ))}
                                        <Divider />
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary="Total" />
                                            <Typography
                                                variant="subtitle1"
                                                className={classes.total}
                                            >
                                                ${' '}
                                                {orderActive &&
                                                    toThousand(
                                                        orderActive.total
                                                    )}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </>
                        )}
                    </>
                </Grid>
            </Container>
        </>
    )
}
