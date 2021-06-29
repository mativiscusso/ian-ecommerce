import { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import ButtonUpdate from '../ButtonUpdate'

export default function UserPassword() {
    return (
        <form>
            <TextField
                id="password"
                label="Contraseña"
                type="password"
                fullWidth
                required
            />
            <TextField
                id="repeatPassword"
                label="Repetir Contraseña"
                type="password"
                fullWidth
                required
            />
            <ButtonUpdate
                dataToProcess={[]}
                dialogTitle="¿Desea actualizar su contraseña?"
                dialogContent="Si presiona SI, procedo a la actualización. Si NO quiere
    actualizar su constraseña, presione CANCELAR."
            />
        </form>
    )
}
