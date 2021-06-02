import { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import { useMutation, useQuery } from '@apollo/client'
import {
    ORDER_ACTIVE,
    ORDER_PAYMENT_METHODS,
    ORDER_SHIPPING_METHODS,
} from 'graphql/queries'
import { SET_SHIPPING_METHOD_ORDER } from 'graphql/mutations'

export default function ShippingsForm({
    handleNext,
    handleBack,
    setPaymentElegibled,
}) {
    const [shippingMethods, setShippingMethods] = useState(undefined)
    const [paymentMethod, setPaymentMethods] = useState(undefined)

    const { data, loading, error } = useQuery(ORDER_SHIPPING_METHODS)
    const {
        data: dataPayments,
        loading: loadingPayments,
        error: errorPayments,
    } = useQuery(ORDER_PAYMENT_METHODS)

    const [addShippingMethod] = useMutation(SET_SHIPPING_METHOD_ORDER, {
        refetchQueries: [{ query: ORDER_ACTIVE }],
    })

    useEffect(() => {
        if (data && !error) {
            setShippingMethods(data.eligibleShippingMethods)
        }
    }, [data, error])

    useEffect(() => {
        if (dataPayments && !errorPayments) {
            setPaymentMethods(dataPayments.eligiblePaymentMethods)
        }
    }, [dataPayments, errorPayments])

    if (loading) return 'loading'
    if (loadingPayments) return 'loading'

    const handleClickNext = async () => {
        await handleNext()
    }
    const handleChangeShipping = async (e) => {
        await addShippingMethod({
            variables: { shippingMethod: e.target.value },
        })
    }
    const handleChangePayment = async (e) => {
        setPaymentElegibled(e.target.value)
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Métodos de envío
                    </Typography>
                    <RadioGroup
                        aria-label="shippingMethods"
                        name="shippingMethods"
                    >
                        {shippingMethods &&
                            shippingMethods.map((method) => (
                                <FormControlLabel
                                    value={method.id}
                                    control={<Radio color="primary" />}
                                    label={`${method.name} - Precio: $ ${method.price}`}
                                    key={method.code}
                                    onChange={handleChangeShipping}
                                />
                            ))}
                    </RadioGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Métodos de Pago
                    </Typography>
                    <RadioGroup
                        aria-label="paymentMethod"
                        name="paymentMethod"
                        defaultValue="top"
                    >
                        {paymentMethod &&
                            paymentMethod.map((method) => (
                                <FormControlLabel
                                    value={method.code}
                                    control={<Radio color="primary" />}
                                    label={method.name}
                                    key={method.code}
                                    onChange={handleChangePayment}
                                />
                            ))}
                    </RadioGroup>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button style={{ marginRight: 12 }} onClick={handleBack}>
                        ANTERIOR
                    </Button>
                    <Button variant="contained" onClick={handleClickNext}>
                        SIGUIENTE
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
