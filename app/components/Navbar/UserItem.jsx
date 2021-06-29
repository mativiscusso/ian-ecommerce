import { useState, useRef, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'
import { IconButton, makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import LaunchIcon from '@material-ui/icons/Launch'

import { UserContext } from 'utils/userContext'

import { USER_LOGOUT } from 'graphql/mutations'
import Link from 'components/Link'
import { useLazyQuery, useMutation } from '@apollo/client'
import { USER_ACTIVE } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            padding: '0 1rem 2rem 1rem',
        },
    },
}))

const UserItem = ({ user }) => {
    const { menuButton } = useStyles()

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)
    const { setCart, setUser } = useContext(UserContext)

    const [logout] = useMutation(USER_LOGOUT)
    const [currentUser, { data: dataUser, loading: loadingUser }] =
        useLazyQuery(USER_ACTIVE)

    useEffect(() => {
        currentUser()
        if (dataUser) {
            setUser(dataUser)
        }
    }, [currentUser, dataUser])

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false)
    }
    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
    }
    const splitUsername = (username) => {
        const splittedName = username.split('@')
        return splittedName[0]
    }

    const handleLogout = async () => {
        logout()
        setUser(undefined)
        setCart([])
        await router.push('/')
        await router.reload()
    }

    return (
        <>
            <div>
                {loadingUser && <CircularProgress />}
                {user ? (
                    <>
                        <IconButton
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            color="inherit"
                        >
                            <AccountCircleIcon />
                            <Typography
                                variant="caption"
                                color="inherit"
                                style={{ marginLeft: 10 }}
                            >
                                Mi Cuenta
                            </Typography>
                        </IconButton>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom'
                                                ? 'center top'
                                                : 'center bottom',
                                    }}
                                >
                                    <Paper elevation={6}>
                                        <ClickAwayListener
                                            onClickAway={handleClose}
                                        >
                                            <MenuList
                                                autoFocusItem={open}
                                                id="menu-list-grow"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem disabled>
                                                    Hola,{' '}
                                                    {splitUsername(
                                                        user.me.identifier
                                                    )}
                                                </MenuItem>
                                                <Link
                                                    href="/users/me"
                                                    color="inherit"
                                                >
                                                    <MenuItem>Perfil</MenuItem>
                                                </Link>
                                                <MenuItem
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </>
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
            </div>
        </>
    )
}

export default UserItem
