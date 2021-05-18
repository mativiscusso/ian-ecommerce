import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: 20,
        right: 10,
        width: 340,
        "& > * + *": {
            marginTop: theme.spacing(6),
        },
    },
}));

export default function TransitionAlerts({ isOpen, text }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

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
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {text}
                </Alert>
            </Collapse>
        </div>
    );
}
