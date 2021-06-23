import { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import { UserContext } from 'utils/userContext'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function TransitionAlerts({ isOpen, text, severity }) {
    const classes = useStyles()
    const [open, setOpen] = useState(isOpen)
    const { setStatusRequest } = useContext(UserContext)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    console.log('isopen' + isOpen, 'open' + open)
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(!isOpen)
                                setStatusRequest(undefined)
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity={severity}
                >
                    {text}
                </Alert>
            </Collapse>
        </div>
    )
}
