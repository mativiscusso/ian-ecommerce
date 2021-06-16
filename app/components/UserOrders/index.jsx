import { useState } from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import VisibilityIcon from '@material-ui/icons/VisibilityTwoTone'
import IconButton from '@material-ui/core/IconButton'

import { toThousand, timeAgo } from 'utils/helpers'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}))

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
                <Box p={1}>
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

export default function UserOrders({ orders }) {
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
                    <Tab
                        label={`Mis Compras - Total (${orders.totalItems})`}
                        {...navigatorTabs(0)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <TableContainer component={Paper}>
                    <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">N°</TableCell>
                                <TableCell align="center">Código</TableCell>
                                <TableCell align="center">Fecha</TableCell>
                                <TableCell align="center">Activa</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Total</TableCell>
                                <TableCell>Ver mas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders &&
                                orders.items.map((row, i) => (
                                    <TableRow key={row.code}>
                                        <TableCell align="center">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="caption">
                                                {row.code}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {timeAgo(row.createdAt)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.active === false ? 'NO' : 'SI'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>
                                                {/* This function split words by CamelCase */}
                                                {row.state.replace(
                                                    /([a-z])([A-Z])/g,
                                                    '$1 $2'
                                                )}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            ${toThousand(row.totalWithTax)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="inherit"
                                                aria-label="ver mas "
                                                component="button"
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </div>
    )
}
