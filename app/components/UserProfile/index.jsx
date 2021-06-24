import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import UserDataCustomer from './UserDataCustomer'
import UserAddresses from './UserAddresses'
import ButtonUpdate from './ButtonUpdate'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}))

export default function UserProfile({ user, customerActive }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="user-data"
                    id="user-data"
                >
                    <Typography variant="button">Mis Datos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UserDataCustomer customerActive={customerActive} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="user-addresses"
                    id="user-addresses"
                >
                    <Typography variant="button">Mis direcciones</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UserAddresses customerActive={customerActive} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="user-password"
                    id="user-password"
                >
                    <Typography variant="button">Mi contraseña</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
