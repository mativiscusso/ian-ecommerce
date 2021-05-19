import { useState, useEffect, useContext } from 'react'
import NextLink from 'next/link'

import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    IconButton,
    Drawer,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Link from 'components/Link'
import ProductSearch from 'components/ProductSearch'
import IconCart from 'components/Cart/IconCart'
import UserItem from './UserItem'

import { UserContext } from 'utils/userContext'

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

export default function Navbar() {
    const { header, logo, menuButton, toolbar, drawerContainer, menuItems } =
        useStyles()
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    })
    const { mobileView, drawerOpen } = state
    const { user, userLoading } = useContext(UserContext)

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
                        {userLoading && (
                            <CircularProgress color="inherit" size={20} />
                        )}
                        {user && <UserItem user={user} />}
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
                <IconCart />
                {user && <UserItem user={user} />}
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
        return (
            <>
                <Link href={'/'} color="inherit" className={menuButton}>
                    home
                </Link>
                <Link
                    href={'/products/all'}
                    color="inherit"
                    className={menuButton}
                >
                    shop
                </Link>
                <Link href={'/checkout'} color="inherit" className={menuButton}>
                    checkout
                </Link>
                <Link href={'/cart'} color="inherit" className={menuButton}>
                    cart
                </Link>
                {!user && (
                    <Link
                        href={'/login'}
                        color="inherit"
                        className={menuButton}
                    >
                        <Button color="inherit" variant="outlined">
                            signup
                        </Button>
                    </Link>
                )}
            </>
        )
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
        return (
            <>
                <Link href={'/'} color="inherit" className={menuButton}>
                    home
                </Link>
                <Link
                    href={'/products/all'}
                    color="inherit"
                    className={menuButton}
                >
                    shop
                </Link>
                <Link href={'/checkout'} color="inherit" className={menuButton}>
                    checkout
                </Link>
                <Link href={'/cart'} color="inherit" className={menuButton}>
                    cart
                </Link>
                {!user && (
                    <Link
                        href={'/login'}
                        color="inherit"
                        className={menuButton}
                    >
                        <Button color="inherit" variant="outlined">
                            signup
                        </Button>
                    </Link>
                )}
            </>
        )
    }

    return (
        <nav>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </nav>
    )
}
