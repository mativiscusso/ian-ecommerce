import React, { useState, useContext, useEffect } from 'react'
import Cart from 'components/Cart'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import { UserContext } from 'utils/userContext'
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'
import { ORDER_ACTIVE } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    float: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
    },
    drawer: {
        width: 330,
        padding: '1rem',
        [theme.breakpoints.up(750)]: {
            width: 380,
            padding: '1rem',
        },
    },
    btnComprar: {
        width: '100%',
        margin: '1rem 0',
    },
}))

export default function ButtonCartHome() {
    const classes = useStyles()
    const { cart, totalQuantity, setCart } = useContext(UserContext)
    const [show, setShow] = useState({
        right: false,
    })
    const router = useRouter()

    const [activeOrder, { data: dataOrder, loading }] =
        useLazyQuery(ORDER_ACTIVE)

    useEffect(() => {
        activeOrder()
        if (dataOrder && dataOrder.activeOrder) {
            setCart(dataOrder.activeOrder)
        }
    }, [activeOrder, dataOrder])

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }
        setShow({ ...show, [anchor]: open })
    }

    const cartHome = (anchor) => {
        const isEmpty = totalQuantity(cart) === 0

        const handleClick = async () => {
            await router.push('/checkout')
            setShow({ right: false })
        }
        return (
            <>
                {loading && <CircularProgress />}
                <div
                    role="presentation"
                    onKeyDown={toggleDrawer(anchor, false)}
                    className={classes.drawer}
                >
                    <Cart isEmpty={isEmpty} />
                    {!isEmpty ? (
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.btnComprar}
                            onClick={handleClick}
                        >
                            FINALIZAR COMPRA
                        </Button>
                    ) : (
                        ''
                    )}
                </div>
            </>
        )
    }

    return (
        <>
            <IconButton
                aria-label="cart"
                onClick={toggleDrawer('right', true)}
                color="inherit"
            >
                <Badge badgeContent={totalQuantity(cart)} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <Drawer
                anchor="right"
                open={show.right}
                onClose={toggleDrawer('right', false)}
            >
                {cartHome('right')}
            </Drawer>
        </>
    )
}
