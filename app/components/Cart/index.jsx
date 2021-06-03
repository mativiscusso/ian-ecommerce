import { useContext, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import HighlightOffIcon from '@material-ui/icons/DeleteOutline'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Container, Grid } from '@material-ui/core'

import { UserContext } from 'utils/userContext'
import { formatURLImage } from 'utils/helpers'
import { gql, useMutation } from '@apollo/client'

import {
    CHANGE_QTY_ITEM_CART,
    EMPTY_CART,
    REMOVE_ITEM_CART,
} from 'graphql/mutations'
import { ORDER_ACTIVE } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: '100%',
    },
    cellImgProduct: {
        width: '15%',
        padding: 5,
        borderRadius: '50%',
    },
    IconDelete: {
        minWidth: '20px!important',
        maxWidth: 20,
        padding: 0,
    },
    imgProduct: {
        width: '100%',
    },
    titleVariant: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
}))

export default function Cart({ isEmpty }) {
    const classes = useStyles()
    const [state, setState] = useState({})

    const { cart } = useContext(UserContext)
    const [modifyQuantity] = useMutation(CHANGE_QTY_ITEM_CART, {
        refetchQueries: [
            {
                query: ORDER_ACTIVE,
            },
        ],
    })

    const [removeLine] = useMutation(REMOVE_ITEM_CART, {
        refetchQueries: [
            {
                query: ORDER_ACTIVE,
            },
        ],
    })

    const [removeAll] = useMutation(EMPTY_CART, {
        refetchQueries: [
            {
                query: ORDER_ACTIVE,
            },
        ],
    })

    const handleChange = async (event) => {
        const id = event.currentTarget.id

        setState({
            ...state,
            [id]: event.target.value,
        })
        await modifyQuantity({
            variables: {
                orderLineId: id,
                quantity: Number(event.target.value),
            },
        })
    }

    const handleRemove = async (event) => {
        await removeLine({ variables: { orderLineId: event.currentTarget.id } })
    }

    const handleRemoveAll = async () => {
        await removeAll()
    }
    return (
        <Container maxWidth="md" disableGutters>
            <TableContainer>
                <Table className={classes.table} aria-label="cart" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell size="small" align="left" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart?.lines &&
                            cart.lines.map((line) => {
                                return (
                                    <TableRow key={line.id}>
                                        <TableCell
                                            padding="none"
                                            align="left"
                                            size="small"
                                        >
                                            <Button
                                                value={line.id}
                                                id={line.id}
                                                onClick={handleRemove}
                                                className={classes.IconDelete}
                                                color="primary"
                                            >
                                                <HighlightOffIcon
                                                    className={
                                                        classes.IconDelete
                                                    }
                                                />
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            colSpan={2}
                                            padding="none"
                                            className={classes.cellImgProduct}
                                        >
                                            {line.featuredAsset ? (
                                                <img
                                                    src={formatURLImage(
                                                        line.featuredAsset
                                                            .source
                                                    )}
                                                    className={
                                                        classes.imgProduct
                                                    }
                                                    alt="Foto producto"
                                                />
                                            ) : (
                                                <img
                                                    src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                                                    className={
                                                        classes.imgProduct
                                                    }
                                                    alt="Foto producto"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell
                                            colSpan={3}
                                            padding="none"
                                            size="small"
                                        >
                                            <Typography variant="caption">
                                                {line.productVariant.name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell colSpan={1}>
                                            <TextField
                                                id={line.id}
                                                value={line.quantity}
                                                label="Qty."
                                                type="number"
                                                size="small"
                                                variant="outlined"
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell
                                            colSpan={1}
                                            padding="none"
                                            align="left"
                                        >
                                            ${line.linePrice}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        {isEmpty ? (
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="center"
                                style={{ height: '80vh' }}
                            >
                                <Typography variant="body1">
                                    Su carrito esta vacio
                                </Typography>
                            </Grid>
                        ) : (
                            <TableRow>
                                <TableCell padding="none" colSpan={2}>
                                    <Typography variant="subtitle2">
                                        TOTAL CART
                                    </Typography>
                                </TableCell>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1">
                                        ${cart.total}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    colSpan={1}
                                    padding="none"
                                    align="right"
                                >
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={handleRemoveAll}
                                    >
                                        VACIAR
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
