import { useEffect, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TreeView from '@material-ui/lab/TreeView'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import TreeItem from '@material-ui/lab/TreeItem'
import { ALL_COLLECTIONS } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { listToTree } from 'utils/helpers'

export default function Header() {
    const [collections, setCollections] = useState(undefined)
    const { data, loading, error } = useQuery(ALL_COLLECTIONS)

    useEffect(() => {
        if (data && !error) {
            setCollections(listToTree(data.collections.items))
        }
    }, [data, error])

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    )

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {collections &&
                collections.map((collection) => renderTree(collection))}
        </TreeView>
    )
}
