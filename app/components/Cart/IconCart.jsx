import React, { useState, useContext } from 'react'
import Cart from 'components/Cart'
import { Button, makeStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import { UserContext } from 'utils/userContext'
import Link from 'next/link'

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
    const { cartLenght } = useContext(UserContext)
    const [show, setShow] = useState({
        right: false,
    })

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
        const isEmpty = cartLenght === 0

        return (
            <>
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
                            href="/cart"
                        >
                            COMPRAR
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
                <Badge badgeContent={cartLenght} color="secondary">
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
