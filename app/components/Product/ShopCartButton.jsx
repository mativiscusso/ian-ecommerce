import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Button from '@material-ui/core/Button'

import { useMutation } from '@apollo/client'
import { ADD_ITEM_CART } from 'graphql/mutations'
import { ORDER_ACTIVE } from 'graphql/queries'

const useStyles = makeStyles({
    btnCenter: {
        margin: 'auto',
    },
})

export default function ShopCartButton({ productId, quantity }) {
    const classes = useStyles()
    console.log({ productId, quantity })
    const [addItem] = useMutation(ADD_ITEM_CART, {
        refetchQueries: [{ query: ORDER_ACTIVE }],
    })

    const handleClick = () => {
        addItem({ variables: { productId: productId, quantity: quantity } })
    }
    return (
        <>
            <Button
                className={classes.btnCenter}
                variant="contained"
                color="primary"
                disabled={quantity === 0}
                startIcon={<ShoppingCartIcon />}
                onClick={handleClick}
            >
                Agregar al carrito
            </Button>
        </>
    )
}
