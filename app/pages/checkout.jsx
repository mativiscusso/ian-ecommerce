import { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import { Container } from '@material-ui/core'

import AddressForm from 'components/AddressForm'
import Review from 'components/Review'
import ShippingsForm from 'components/ShippingForm'

import { useQuery } from '@apollo/client'
import { CUSTOMER_ACTIVE, ORDER_ACTIVE } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
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
    const {
        data: dataCustomer,
        loading: loadingCustomer,
        error: errorCustomer,
    } = useQuery(CUSTOMER_ACTIVE)
    const {
        data: dataOrder,
        loading: loadingOrder,
        error: errorOrder,
    } = useQuery(ORDER_ACTIVE)

    useEffect(() => {
        if (dataCustomer && !errorCustomer) {
            setCustomer(dataCustomer.activeCustomer)
        }
    }, [dataCustomer, errorCustomer])

    useEffect(() => {
        if (dataOrder && !errorOrder) {
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
                    />
                )
            case 2:
                return <Review handleBack={handleBack} />
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
            <Container maxWidth="lg">
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Gracias por su orden.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have
                                    emailed your order confirmation, and will
                                    send you an update when your order has
                                    shipped.
                                </Typography>
                            </>
                        ) : (
                            <>{getStepContent(activeStep)}</>
                        )}
                    </>
                </Paper>
            </Container>
        </>
    )
}
