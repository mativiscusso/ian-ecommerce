import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function UserAdresses() {
    return (
        <form autoComplete="off">
            <TextField id="firstName" label="Nombre" fullWidth required />
            <TextField id="lastName" label="Apellido" fullWidth required />
            <TextField id="phoneNumber" label="Teléfono" fullWidth required />
            <TextField id="email" label="E-mail" fullWidth required />
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
