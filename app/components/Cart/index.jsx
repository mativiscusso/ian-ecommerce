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
import { Container } from '@material-ui/core'

import { CartContext } from 'utils/cartContext'
import { formatURLImage } from 'helpers'
import { gql, useMutation } from '@apollo/client'

import { CHANGE_QTY_ITEM_CART, ORDER_ACTIVE } from 'graphql/mutations'

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

export default function Cart() {
    const classes = useStyles()
    const [state, setState] = useState({})

    const { cart } = useContext(CartContext)
    const [modifyQuantity] = useMutation(CHANGE_QTY_ITEM_CART, {
        refetchQueries: [
            {
                query: gql`
                    {
                        activeOrder {
                            id
                            state
                            code
                            active
                            lines {
                                id
                                featuredAsset {
                                    source
                                    preview
                                }
                                productVariant {
                                    productId
                                    name
                                    price
                                }
                                quantity
                                linePrice
                            }
                            totalQuantity
                            subTotal
                            total
                        }
                    }
                `,
            },
        ],
    })
    console.log(cart)

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
                        {cart.lines &&
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
                                                // onClick={deleteItemCart}
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
                                                // value={state[line.id]}
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
                            <TableCell colSpan={1} padding="none" align="right">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                >
                                    VACIAR
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
