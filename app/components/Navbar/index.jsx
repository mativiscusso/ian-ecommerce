import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    IconButton,
    Drawer,
    Grid,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState, useEffect } from 'react'
import Link from 'components/Link'
import NextLink from 'next/link'
import ProductSearch from 'components/ProductSearch'
import IconCart from 'components/Cart/IconCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const headersData = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Shop',
        href: '/products/all',
    },
    {
        label: 'Cart',
        href: '/cart',
    },
    {
        label: 'Checkout',
        href: '/checkout',
    },
    {
        label: 'SignIn',
        href: '/login',
    },
]

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary,
        '@media (max-width: 900px)': {
            paddingLeft: 0,
        },
    },
    logo: {
        fontWeight: 600,
        color: '#FFFEFE',
        textAlign: 'left',
    },
    menuButton: {
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            padding: '0 1rem 2rem 1rem',
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    drawerContainer: {
        padding: '20px 30px',
        display: 'flex',
        flexDirection: 'column',
    },
    menuItems: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}))

export default function Navbar({ user }) {
    const { header, logo, menuButton, toolbar, drawerContainer, menuItems } =
        useStyles()
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    })
    console.log(user.me)
    const { mobileView, drawerOpen } = state

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({
                      ...prevState,
                      mobileView: false,
                  }))
        }

        setResponsiveness()

        window.addEventListener('resize', () => setResponsiveness())
    }, [])

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                <Grid
                    container
                    alignContent="space-between"
                    alignItems="center"
                >
                    <Grid item lg={2} xl={3}>
                        {Logo}
                    </Grid>
                    <Grid item lg={4} xl={4}>
                        <ProductSearch />
                    </Grid>
                    <Grid item className={menuItems} lg={6} xl={5}>
                        {getMenuButtons()}
                        <IconCart />
                        {user.me && (
                            <>
                                <AccountCircleIcon />
                                <span>{user.me.identifier}</span>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        )
    }

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }))
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }))

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: 'start',
                        color: 'inherit',
                        'aria-label': 'menu',
                        'aria-haspopup': 'true',
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <div>{Logo}</div>
                <ProductSearch />
                <Drawer
                    {...{
                        anchor: 'left',
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
            </Toolbar>
        )
    }

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }, i) => {
            return (
                <Link
                    href={href}
                    color="inherit"
                    className={menuButton}
                    key={i + 'menu-link'}
                >
                    {label}
                </Link>
            )
        })
    }

    const Logo = (
        <NextLink href="/">
            <a>
                <Typography variant="h6" component="h1" className={logo}>
                    Ecommerce
                </Typography>
            </a>
        </NextLink>
    )

    const getMenuButtons = () => {
        return headersData.map(({ label, href }, i) => {
            return (
                <>
                    <Link
                        href={href}
                        color="inherit"
                        className={menuButton}
                        key={i + 'menu-btn'}
                    >
                        {label}
                    </Link>
                </>
            )
        })
    }

    return (
        <nav>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </nav>
    )
}
