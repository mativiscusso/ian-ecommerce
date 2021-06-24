import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useMutation } from '@apollo/client'
import { SET_ADDRESSES_ORDER, SET_CUSTOMER_ORDER } from 'graphql/mutations'
import { ORDER_ACTIVE } from 'graphql/queries'

export default function AddressForm({ customer, orderActive, handleNext }) {
    const [addresses, setAddresses] = useState({
        streetLine1: '',
        streetLine2: '',
        city: '',
        province: '',
        postalCode: '',
        countryCode: 'AR',
        phoneNumber: '',
        defaultShippingAddress: false,
        defaultBillingAddress: false,
    })
    const [customerState, setCustomerState] = useState({
        firstName: customer ? customer.firstName : '',
        lastName: customer ? customer.lastName : '',
        phoneNumber: customer ? customer.phoneNumber : '',
        emailAddress: customer ? customer.emailAddress : '',
    })
    useEffect(() => {
        if (customer) {
            setCustomerState({
                firstName: customer.firstName,
                lastName: customer.lastName,
                phoneNumber: customer.phoneNumber,
                emailAddress: customer.emailAddress,
            })
        }
        if (orderActive) {
            setAddresses({
                ...addresses,
                streetLine1: orderActive.shippingAddress.streetLine1,
                streetLine2: orderActive.shippingAddress.streetLine2,
                city: orderActive.shippingAddress.city,
                province: orderActive.shippingAddress.province,
                postalCode: orderActive.shippingAddress.postalCode,
                phoneNumber: orderActive.shippingAddress.phoneNumber,
            })
        }
    }, [customer, orderActive])

    const [setCustomerToOrder] = useMutation(SET_CUSTOMER_ORDER)
    const [setAddressesToCustomer] = useMutation(SET_ADDRESSES_ORDER, {
        refetchQueries: [{ query: ORDER_ACTIVE }],
    })

    const handleClick = async () => {
        if (customer === undefined) {
            await setCustomerToOrder({ variables: { input: customerState } })
        }

        await setAddressesToCustomer({
            variables: {
                input: {
                    ...addresses,
                    fullName: `${customerState.firstName} ${customerState.lastName}`,
                },
            },
        })
        await handleNext()
    }
    const handleNames = (e) => {
        setCustomerState({
            ...customerState,
            [e.currentTarget.id]: e.target.value,
        })
    }
    const handleChange = (e) => {
        setAddresses({ ...addresses, [e.currentTarget.id]: e.target.value })
    }
    const handleCheck = (e) => {
        setAddresses({
            ...addresses,
            [e.currentTarget.id]: e.target.checked,
        })
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Direcciones de envío
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Nombre"
                        fullWidth
                        onChange={handleNames}
                        value={customerState.firstName}
                        disabled={!!customerState.firstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        fullWidth
                        onChange={handleNames}
                        value={customerState.lastName}
                        disabled={!!customerState.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="emailAddress"
                        name="emailAddress"
                        label="Dirección de email"
                        fullWidth
                        onChange={handleNames}
                        value={customerState.emailAddress}
                        disabled={!!customerState.emailAddress}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="streetLine1"
                        name="address1"
                        label="Direccion 1"
                        fullWidth
                        onChange={handleChange}
                        value={addresses.streetLine1}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="streetLine2"
                        name="address2"
                        label="Direccion 2"
                        fullWidth
                        onChange={handleChange}
                        value={addresses.streetLine2}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={addresses.defaultShippingAddress}
                                    onChange={handleCheck}
                                    id="defaultShippingAddress"
                                />
                            }
                            label="Quiero que sea mi direccion por defecto para entrega."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={addresses.defaultBillingAddress}
                                    onChange={handleCheck}
                                    id="defaultBillingAddress"
                                />
                            }
                            label="Quiero que sea mi direccion por defecto para facturación."
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="defaultShippingAddress"
                        name="address1"
                        label="Direccion de envío"
                        fullWidth
                        onChange={handleChange}
                        disabled={addresses.defaultShippingAddress}
                        value={
                            addresses.defaultShippingAddress
                                ? addresses.streetLine1
                                : ''
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="defaultBillingAddress"
                        name="defaultBillingAddress"
                        label="Direccion de facturación"
                        fullWidth
                        onChange={handleChange}
                        disabled={addresses.defaultBillingAddress}
                        value={
                            addresses.defaultBillingAddress
                                ? addresses.streetLine1
                                : ''
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="Ciudad"
                        fullWidth
                        onChange={handleChange}
                        value={addresses.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="province"
                        name="state"
                        label="Provincia"
                        fullWidth
                        onChange={handleChange}
                        value={addresses.province}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="postalCode"
                        name="zip"
                        label="Código Postal"
                        fullWidth
                        onChange={handleChange}
                        value={addresses.postalCode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Telefono"
                        fullWidth
                        onChange={handleChange}
                        value={addresses.phoneNumber}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button disabled style={{ marginRight: 12 }}>
                        anterior
                    </Button>
                    <Button variant="contained" onClick={handleClick}>
                        SIGUIENTE
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
