import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import { ALL_COLLECTIONS } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}))

export default function Header(props) {
    const classes = useStyles()
    const [collections, setCollections] = useState(undefined)
    const { data, loading, error } = useQuery(ALL_COLLECTIONS)

    useEffect(() => {
        if (data && !error) {
            setCollections(data.collections)
        }
    }, [data, error])

    console.log(collections)
    return (
        <>
            <Toolbar
                component="nav"
                variant="dense"
                className={classes.toolbarSecondary}
            >
                {collections &&
                    collections.items.map((collection) => (
                        <Link
                            color="inherit"
                            noWrap
                            key={collection.name}
                            variant="body2"
                            className={classes.toolbarLink}
                        >
                            <a>
                                <Button>{collection.name}</Button>
                            </a>
                        </Link>
                    ))}
                <Link
                    color="inherit"
                    noWrap
                    variant="body2"
                    className={classes.toolbarLink}
                    href="/products/all"
                >
                    <a>
                        <Button>ALL CATEGORIES</Button>
                    </a>
                </Link>
            </Toolbar>
        </>
    )
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
}
