import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function UserAdresses() {
    const [defaultAddresses, setDefaultAddresses] = useState(undefined)

    const handleCheck = (e) => {
        setDefaultAddresses({
            ...defaultAddresses,
            [e.currentTarget.id]: e.target.checked,
        })
    }

    return (
        <form>
            <TextField
                id="streetLine1"
                label="Dirección 1"
                fullWidth
                required
            />
            <TextField id="streetLine2" label="Direccion 2" fullWidth />
            <TextField id="city" label="Ciudad" fullWidth required />
            <TextField id="province" label="Provincia" fullWidth required />
            <TextField
                id="postalCode"
                label="Código Postal"
                fullWidth
                required
            />
            <TextField id="phoneNumber" label="Teléfono" fullWidth required />
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleCheck}
                            id="defaultShippingAddress"
                        />
                    }
                    label="Quiero que sea mi direccion por defecto para entrega."
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleCheck}
                            id="defaultBillingAddress"
                        />
                    }
                    label="Quiero que sea mi direccion por defecto para facturación."
                />
            </FormGroup>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '1rem' }}
                type="submit"
            >
                GUARDAR
            </Button>
        </form>
    )
}
