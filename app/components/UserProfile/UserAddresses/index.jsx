import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import ButtonUpdate from '../ButtonUpdate'

export default function UserAdresses({ customerActive }) {
    const [defaultAddresses, setDefaultAddresses] = useState(undefined)
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

    useEffect(() => {
        if (customerActive && customerActive.addresses.length >= 0) {
            setAddresses({
                ...addresses,
                streetLine1: customerActive.addresses[0].streetLine1,
                streetLine2: customerActive.addresses[0].streetLine2,
                city: customerActive.addresses[0].city,
                province: customerActive.addresses[0].province,
                postalCode: customerActive.addresses[0].postalCode,
                phoneNumber: customerActive.addresses[0].phoneNumber,
            })
        }
    }, [customerActive])

    const handleCheck = (e) => {
        setAddresses({
            ...addresses,
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
                value={addresses.streetLine1}
            />
            <TextField
                id="streetLine2"
                label="Direccion 2"
                fullWidth
                value={addresses.streetLine2}
            />
            <TextField
                id="city"
                label="Ciudad"
                fullWidth
                required
                value={addresses.city}
            />
            <TextField
                id="province"
                label="Provincia"
                fullWidth
                required
                value={addresses.province}
            />
            <TextField
                id="postalCode"
                label="Código Postal"
                fullWidth
                require
                value={addresses.postalCode}
                d
            />
            <TextField
                id="phoneNumber"
                label="Teléfono"
                fullWidth
                required
                value={addresses.phoneNumber}
            />
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
            <ButtonUpdate
                dataToProcess={addresses}
                dialogTitle="¿Desea actualizar sus direcciones?"
                dialogContent="Si presiona SI, procedo a la actualización. Si NO quiere
                        actualizar sus datos, presione CANCELAR."
            />
        </form>
    )
}
