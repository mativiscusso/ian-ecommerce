import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import QuickViewContent from "./QuickViewContent";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
    dialogContent: {
        overflow: "hidden",
    },
    quickView: {
        maxWidth: 800,
    },
});

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                size="small"
                startIcon={<SearchIcon />}
            >
                Ver
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll="body"
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    {"VISTA RAPIDA DEL PRODUCTO"}
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <QuickViewContent {...props} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
