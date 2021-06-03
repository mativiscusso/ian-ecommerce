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
import { useRouter } from 'next/router'

import { UserContext } from 'utils/userContext'
import { AccountCircle } from '@material-ui/icons'

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
    const [isCheckoutPage, setIsCheckoutPage] = useState(false)

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    })
    const { mobileView, drawerOpen } = state
    const { user, userLoading } = useContext(UserContext)

    const router = useRouter()
    useEffect(() => {
        setIsCheckoutPage(router.pathname.includes('checkout'))
    }, [router])

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
                    <Grid item lg={3} xl={4}>
                        {Logo}
                    </Grid>
                    <Grid item lg={5} xl={5}>
                        <ProductSearch mobileState={mobileView} />
                    </Grid>
                    <Grid item className={menuItems} lg={4} xl={3}>
                        <IconCart />
                        {userLoading && (
                            <CircularProgress color="inherit" size={20} />
                        )}
                        {user ? (
                            <UserItem user={user} />
                        ) : (
                            <Link
                                href={'/login'}
                                color="inherit"
                                className={menuButton}
                            >
                                <IconButton color="inherit">
                                    <AccountCircle />
                                    <Typography
                                        variant="caption"
                                        color="inherit"
                                        style={{ marginLeft: 10 }}
                                    >
                                        Ingresar
                                    </Typography>
                                </IconButton>
                            </Link>
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
            <Toolbar style={{ justifyContent: 'space-between' }}>
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
                <ProductSearch mobileState={mobileView} />

                <IconCart />
                {user ? (
                    <UserItem user={user} />
                ) : (
                    <Link href={'/login'} color="inherit">
                        <IconButton color="inherit">
                            <AccountCircle />
                            <Typography
                                variant="caption"
                                color="inherit"
                                style={{ marginLeft: 10 }}
                            >
                                Ingresar
                            </Typography>
                        </IconButton>
                    </Link>
                )}
                <Drawer
                    {...{
                        anchor: 'left',
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    {/* <div className={drawerContainer}>{getDrawerChoices()}</div> */}
                    <div className={drawerContainer}>Links</div>
                </Drawer>
            </Toolbar>
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

    return (
        <nav>
            <AppBar className={header}>
                {isCheckoutPage === false ? (
                    mobileView ? (
                        displayMobile()
                    ) : (
                        displayDesktop()
                    )
                ) : (
                    <Toolbar>{Logo}</Toolbar>
                )}
            </AppBar>
        </nav>
    )
}
