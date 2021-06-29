import { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField'
import ButtonUpdate from '../ButtonUpdate'

export default function UserPassword() {
    const [passwords, setPasswords] = useState({
        password: '',
        rePassword: 'a',
    })
    const [passwordsApproved, setPasswordsApproved] = useState(false)

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.currentTarget.id]: e.target.value })
    }
    useEffect(() => {
        if (passwords.password === passwords.rePassword) {
            setPasswordsApproved(true)
        } else {
            setPasswordsApproved(false)
        }
    }, [passwords])

    return (
        <form>
            <small>
                Las contraseñas deben coincidir para poder actualizarla.
            </small>

            <TextField
                id="password"
                label="Contraseña"
                type="password"
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                id="rePassword"
                label="Repetir Contraseña"
                type="password"
                onChange={handleChange}
                fullWidth
                required
            />
            {passwordsApproved && (
                <ButtonUpdate
                    dataToProcess={[]}
                    dialogTitle="¿Desea actualizar su contraseña?"
                    dialogContent="Si presiona SI, procedo a la actualización. Si NO quiere
    actualizar su constraseña, presione CANCELAR."
                />
            )}
        </form>
    )
}
