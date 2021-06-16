import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import UserDataCustomer from 'components/UserDataCustomer'
import UserAddresses from 'components/UserAddresses'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function navigatorTabs(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}))

export default function UserTabs({ user, customerActive }) {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent" elevation={1}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab label="Mis Datos" {...navigatorTabs(0)} />
                    <Tab label="Mis Direcciones" {...navigatorTabs(1)} />
                    <Tab label="Mi Cuenta" {...navigatorTabs(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UserDataCustomer />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserAddresses />
            </TabPanel>
            <TabPanel value={value} index={2}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                        type="submit"
                    >
                        GUARDAR
                    </Button>
                </form>
            </TabPanel>
        </div>
    )
}
