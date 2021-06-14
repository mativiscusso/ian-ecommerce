import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}))

export default function ChipsArray({ data, handleDelete }) {
    const classes = useStyles()

    return (
        <Paper component="ul" className={classes.root} elevation={0}>
            {data.map((item) => {
                return (
                    <li key={item.key}>
                        <Chip
                            label={item.label}
                            onDelete={handleDelete(item)}
                            size="small"
                            className={classes.chip}
                        />
                    </li>
                )
            })}
        </Paper>
    )
}
