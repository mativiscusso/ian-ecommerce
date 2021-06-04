import { useState, useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TreeView from '@material-ui/lab/TreeView'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import Divider from '@material-ui/core/Divider'
import { useQuery } from '@apollo/client'
import { ALL_COLLECTIONS } from 'graphql/queries'
import { listToTree } from 'utils/helpers'

const CategoryFilter = () => {
    const { data, loading, error } = useQuery(ALL_COLLECTIONS)
    const [collections, setCollections] = useState(undefined)

    useEffect(() => {
        if (data && !error) {
            setCollections(listToTree(data.collections.items))
        }
    }, [data, error])

    if (loading) return 'loading'
    if (error) console.log(error)

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    )

    console.log(collections)
    return (
        <article>
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Categorias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={['root']}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {collections &&
                            collections.map((collection) =>
                                renderTree(collection)
                            )}
                    </TreeView>
                </AccordionDetails>
            </Accordion>
            <Divider variant="middle" />
        </article>
    )
}

export default CategoryFilter
