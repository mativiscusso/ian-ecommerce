import { useState, useEffect, useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    IconButton,
    Drawer,
    Grid,
    CircularProgress,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import LaunchIcon from '@material-ui/icons/Launch'

import Link from 'components/Link'
import ProductSearch from 'components/ProductSearch'
import IconCart from 'components/Cart/IconCart'
import UserItem from './UserItem'
import CategoriesDesktop from 'components/CategoryList/Desktop'
import CategoriesMobile from 'components/CategoryList/Mobile'
import { UserContext } from 'utils/userContext'

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary,
        '@media (max-width: 900px)': {
            paddingLeft: 0,
        },
    },
    logo: {
        position: 'absolute',
        top: 0,
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
        backgroundColor: theme.palette.primary,
        '@media (max-width: 900px)': {
            paddingLeft: 0,
        },
    },
    drawerContainer: {
        padding: '20px 80px 20px 30px',
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
    const { logo, menuButton, toolbar, drawerContainer, menuItems } =
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
            <>
                <AppBar>
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
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
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
                                            <LaunchIcon />
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
                </AppBar>
                <CategoriesDesktop />
            </>
        )
    }

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }))
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }))

        return (
            <AppBar>
                <Toolbar
                    style={{ justifyContent: 'space-between' }}
                    className={toolbar}
                >
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
                                <LaunchIcon />
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
                        <div className={drawerContainer}>
                            <CategoriesMobile />
                        </div>
                    </Drawer>
                </Toolbar>
            </AppBar>
        )
    }

    const Logo = (
        <NextLink href="/">
            <a className={logo}>
                <Image
                    src="/assets/logo.png"
                    alt="Logo Cocot"
                    width={100}
                    height={100}
                />
            </a>
        </NextLink>
    )

    return (
        <nav>
            {isCheckoutPage === false ? (
                mobileView ? (
                    displayMobile()
                ) : (
                    displayDesktop()
                )
            ) : (
                <AppBar>
                    <Toolbar>{Logo}</Toolbar>
                </AppBar>
            )}
        </nav>
    )
}
