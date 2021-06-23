import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { useMutation } from '@apollo/client'
import { USER_REQUEST_RESET_PASSWORD } from 'graphql/mutations'

export default function ForgotPassword() {
    const [email, setEmail] = useState(undefined)
    const [forgotPassword] = useMutation(USER_REQUEST_RESET_PASSWORD)
    const [alertMessage, setAlertMessage] = useState(false)

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (e) => {
        // Validate format email
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(e.target.value)) {
            setEmail(e.target.value)
        }
    }

    const handleForgotPassword = async () => {
        if (email) {
            const { data } = await forgotPassword({
                variables: { email: email },
            })
            if (data.requestPasswordReset.__typename === 'Success') {
                setAlertMessage('Hemos enviado el link a su email.')
            }
        }
    }
    return (
        <>
            <Button
                variant="inherit"
                color="inherit"
                size="small"
                onClick={handleClickOpen}
            >
                Olvidé mi contraseña
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Olvidé mi contraseña
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, completa el siguiente campo con tu correo
                        electronico para que podamos enviarte el enlace de
                        blanqueo de clave.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        onChange={handleChange}
                        fullWidth
                    />
                    {alertMessage && <small>{alertMessage}</small>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        autoFocus
                        onClick={handleForgotPassword}
                        color="primary"
                        disabled={email === undefined}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
