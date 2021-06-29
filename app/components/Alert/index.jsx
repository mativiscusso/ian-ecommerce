import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import LinearProgress from '@material-ui/core/LinearProgress'

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
    const [open] = useState(isOpen)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0
                }
                return Math.min(oldProgress + 2.2)
            })
        }, 100)

        return () => {
            clearInterval(5000)
        }
    }, [])

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                        ></IconButton>
                    }
                    severity={severity}
                >
                    {text}
                </Alert>
            </Collapse>
            <LinearProgress variant="determinate" value={progress} />
        </div>
    )
}
