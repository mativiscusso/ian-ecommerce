import { useState, useRef, useContext } from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'

import { UserContext } from 'utils/userContext'

import { USER_LOGOUT } from 'graphql/mutations'
import Link from 'components/Link'

const UserItem = ({ user }) => {
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)
    const { logout } = useContext(UserContext)

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

    const handleLogout = () => {
        logout({ query: USER_LOGOUT })
    }

    return (
        <>
            <div>
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
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem disabled>
                                            Hola,{' '}
                                            {splitUsername(user.me.identifier)}
                                        </MenuItem>
                                        <Link href="/users/me" color="inherit">
                                            <MenuItem>Perfil</MenuItem>
                                        </Link>
                                        <MenuItem onClick={handleLogout}>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </>
    )
}

export default UserItem
