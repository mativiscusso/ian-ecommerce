import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'

import ButtonUpdate from '../ButtonUpdate'

export default function UserAdresses({ customerActive }) {
    const [customerState, setCustomerState] = useState({
        firstName: customerActive ? customerActive.firstName : '',
        lastName: customerActive ? customerActive.lastName : '',
        phoneNumber: customerActive ? customerActive.phoneNumber : '',
        emailAddress: customerActive ? customerActive.emailAddress : '',
    })
    useEffect(() => {
        if (customerActive) {
            setCustomerState({
                firstName: customerActive.firstName,
                lastName: customerActive.lastName,
                phoneNumber: customerActive.phoneNumber,
                emailAddress: customerActive.emailAddress,
            })
        }
    }, [customerActive])

    console.log(customerActive)
    return (
        <form autoComplete="off">
            <TextField
                id="firstName"
                label="Nombre"
                fullWidth
                required
                value={customerState.firstName}
            />
            <TextField
                id="lastName"
                label="Apellido"
                fullWidth
                required
                value={customerState.lastName}
            />
            <TextField
                id="phoneNumberUser"
                label="Teléfono"
                fullWidth
                required
                value={customerState.phoneNumber}
            />
            <TextField
                id="email"
                label="E-mail"
                type="email"
                fullWidth
                required
                value={customerState.emailAddress}
            />
            <ButtonUpdate
                dataToProcess={customerState}
                dialogTitle="¿Desea actualizar su información?"
                dialogContent="Si presiona SI, procedo a la actualización. Si NO quiere
                        actualizar sus datos, presione CANCELAR."
            />
        </form>
    )
}
