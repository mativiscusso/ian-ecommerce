import { useState, forwardRef, useEffect } from 'react'
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/VisibilityTwoTone'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useLazyQuery } from '@apollo/client'
import { ORDER_BY_CODE } from 'graphql/queries'

import { formatURLImage } from 'utils/helpers'

import OrderTimeline from './OrderTimeline'

const useStyles = makeStyles((theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        textVariants: {
            textTransform: 'uppercase',
            textAlign: 'start',
        },
        divider: {
            margin: '8px 0',
        },
    })
)

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog({ orderCode }) {
    const classes = useStyles()
    const [order, setOrder] = useState(undefined)
    const [open, setOpen] = useState(false)
    const [getOrderByCode, { data, loading, error }] =
        useLazyQuery(ORDER_BY_CODE)

    useEffect(() => {
        if (data && !loading && !error) {
            setOrder(data.orderByCode)
        }
    }, [data, loading, error])

    const handleClickOpen = async () => {
        await getOrderByCode({
            variables: { code: orderCode },
        })

        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    if (loading) return <CircularProgress />
    if (error) console.log(error)

    return (
        <div>
            <IconButton
                aria-label="edit"
                color="inherit"
                onClick={handleClickOpen}
            >
                <VisibilityIcon />
            </IconButton>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Productos comprados
                        </Typography>
                    </Toolbar>
                </AppBar>
                {order && (
                    <Grid
                        container
                        spacing={2}
                        style={{ padding: '20px 20px' }}
                    >
                        <Grid item xs={12} md={5}>
                            <Card elevation={7}>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        <strong>Orden N° {order.code}</strong>
                                    </Typography>

                                    <Typography color="textSecondary">
                                        <strong>Fecha</strong>
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {order.createdAt}
                                    </Typography>
                                    <Divider
                                        className={classes.divider}
                                        variant="middle"
                                    />
                                    <Typography color="textSecondary">
                                        <strong>Activa</strong>:{' '}
                                        {order.active ? 'SI' : 'NO'}
                                    </Typography>

                                    <Divider
                                        className={classes.divider}
                                        variant="middle"
                                    />

                                    <Typography color="textSecondary">
                                        <strong>Estado de la orden</strong>:{' '}
                                        {order.state}
                                    </Typography>

                                    <Divider
                                        className={classes.divider}
                                        variant="middle"
                                    />

                                    <Typography color="textSecondary">
                                        <strong>Método de envío</strong>:
                                        {order.shippingLines.map(
                                            (shipping) =>
                                                shipping.shippingMethod.name
                                        )}
                                    </Typography>
                                    <Divider
                                        className={classes.divider}
                                        variant="middle"
                                    />
                                    <Typography color="textSecondary">
                                        <strong>Hisotrial</strong>:
                                    </Typography>
                                    <OrderTimeline data={order.history.items} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Card elevation={7}>
                                <CardContent>
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Detalle de la compra
                                    </Typography>
                                    <TableContainer>
                                        <Table aria-label="spanning table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell align="center">
                                                        Productos
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Qty.
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Precio
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        Subtotal
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {order.lines.map((row) => (
                                                    <TableRow
                                                        key={`${row.id}99`}
                                                    >
                                                        <TableCell>
                                                            <img
                                                                src={formatURLImage(
                                                                    row
                                                                        .featuredAsset
                                                                        .preview
                                                                )}
                                                                width={30}
                                                                height={30}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                row
                                                                    .productVariant
                                                                    .name
                                                            }
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            {row.quantity}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            $
                                                            {
                                                                row.unitPriceWithTax
                                                            }
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            $
                                                            {row.quantity *
                                                                row.unitPriceWithTax}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
                                                    ></TableCell>
                                                    <TableCell
                                                        colSpan={1}
                                                        align="center"
                                                    >
                                                        <strong>Envío</strong>
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={1}
                                                        align="right"
                                                    >
                                                        ${order.shippingWithTax}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Cantidad Total:{' '}
                                                        <strong>
                                                            {
                                                                order.totalQuantity
                                                            }
                                                        </strong>
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={2}
                                                    ></TableCell>
                                                    <TableCell
                                                        align="right"
                                                        colSpan={2}
                                                    >
                                                        Total:{' '}
                                                        <strong>
                                                            $
                                                            {order.totalWithTax}
                                                        </strong>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Dialog>
        </div>
    )
}
