import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { CHANGE_STATE_ORDER, SET_PAYMENT_METHOD_ORDER } from 'graphql/mutations'
import { useRouter } from 'next/router'

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

export default function Review({
    handleBack,
    handleNext,
    customer,
    orderActive,
    paymentElegibled,
}) {
    const classes = useStyles()
    const [initPoint, setInitPoint] = useState(false)
    const [addNextStateOrder] = useMutation(CHANGE_STATE_ORDER)
    const [addPaymentMethod] = useMutation(SET_PAYMENT_METHOD_ORDER)

    const router = useRouter()

    const handleFinishOrder = async () => {
        await addNextStateOrder({ variables: { state: 'ArrangingPayment' } })
        const { data } = await addPaymentMethod({
            variables: { input: { method: paymentElegibled, metadata: [{}] } },
        })
        const { payments } = data.addPaymentToOrder
        if (payments[0].metadata?.public) {
            setInitPoint(true)
            router.push(payments[0].metadata.public.init_point)
        } else {
            await handleNext()
        }
    }

    return (
        <>
            <Typography variant="body1" gutterBottom>
                Resumen de tu orden
            </Typography>
            <Typography variant="subtitle2">
                N° {orderActive && orderActive.code}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Comprador
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        {customer &&
                            `${customer.firstName} ${customer.lastName}`}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        {orderActive && orderActive.shippingAddress.streetLine1}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        {orderActive && orderActive.shippingAddress.city}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        {orderActive && orderActive.shippingAddress.province}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        {orderActive && orderActive.shippingAddress.phoneNumber}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        {orderActive && orderActive.shippingAddress.postalCode}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Detalles de envío
                    </Typography>
                    <Grid container>
                        {orderActive &&
                            orderActive.shippingLines.map((payment) => (
                                <div key={payment.shippingMethod.code}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                        >
                                            {payment.shippingMethod.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                        >
                                            Costo: $
                                            {
                                                payment.shippingMethod.checker
                                                    .args[0].value
                                            }
                                        </Typography>
                                    </Grid>
                                </div>
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
                        FINALIZAR {initPoint && 'y PAGAR'}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
