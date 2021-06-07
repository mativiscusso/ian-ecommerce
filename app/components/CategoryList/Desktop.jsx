import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Link from 'next/link'
import { ALL_COLLECTIONS } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { listToTree } from 'utils/helpers'

const useStyles = makeStyles((theme) => ({
    toolbarSecondary: {
        justifyContent: 'center',
        marginTop: theme.spacing(8),
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarLink: {
        padding: theme.spacing(3),
        flexShrink: 0,
        textTransform: 'uppercase',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    parent: {
        display: 'block',
        position: 'relative',

        '&:hover > ul': {
            display: 'block',
            position: 'absolute',
            padding: '10px 0 0 0',
            width: 180,
            lineHeight: 2,
            zIndex: 1,
            '& > li:hover > ul': {
                display: 'block',
                position: 'relative',
                padding: '0 0 0 10px',
                width: 180,
                lineHeight: 2,
                zIndex: 1,
            },
        },
    },
    child: {
        display: 'none',
        '& li': {
            backgroundColor: '#fff',
        },
    },
}))

export default function Header() {
    const classes = useStyles()
    const [collections, setCollections] = useState(undefined)
    const { data, loading, error } = useQuery(ALL_COLLECTIONS)

    useEffect(() => {
        if (data && !error) {
            setCollections(listToTree(data.collections.items))
        }
    }, [data, error])

    const renderTree = (nodes) => (
        <li key={nodes.id} className={classes.parent}>
            <Link
                color="inherit"
                noWrap
                variant="body2"
                href={`/products/category/${nodes.slug}`}
            >
                <a className={classes.toolbarLink}>{nodes.name}</a>
            </Link>

            {Array.isArray(nodes.children) ? (
                <ul className={classes.child}>
                    {nodes.children.map((node) => renderTree(node))}
                </ul>
            ) : null}
        </li>
    )

    console.log(collections)
    return (
        <>
            <Toolbar
                component="nav"
                variant="dense"
                className={classes.toolbarSecondary}
            >
                {collections &&
                    collections.map((collection, i) => (
                        <ul key={i + 'menu'}>{renderTree(collection)}</ul>
                    ))}
                {collections && (
                    <li className={classes.parent}>
                        <Link
                            color="inherit"
                            noWrap
                            variant="body2"
                            href="/products/search?q="
                        >
                            <a className={classes.toolbarLink}>
                                ALL CATEGORIES
                            </a>
                        </Link>
                    </li>
                )}
            </Toolbar>
        </>
    )
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
}
