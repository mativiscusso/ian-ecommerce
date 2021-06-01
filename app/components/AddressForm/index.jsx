import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

export default function AddressForm({ customer, handleNext }) {
    /**  Objeto para pasarle como parametro a la mutacion setOrderShippingAddress
     * const adresses = {
     * streetLine1:,
     * streetLine2:,
     * city:,
     * province:,
     * postalCode:,
     * countryCode:,
     * phoneNumber:,
     * defaultShippingAddress:,
     * defaultBillingAddress:,
     * customFields: JSON
     * }
     * */
    console.log(customer)

    const handleClick = async () => {
        await console.log('clickeo')
        await handleNext()
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
                        autoComplete="given-name"
                        value={customer ? customer.firstName : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        fullWidth
                        autoComplete="family-name"
                        value={customer ? customer.lastName : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Direccion 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Direccion 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="Ciudad"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="Provincia"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Código Postal"
                        fullWidth
                        autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Pais"
                        fullWidth
                        autoComplete="shipping country"
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
