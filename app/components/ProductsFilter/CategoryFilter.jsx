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
    const [state, setState] = useState({})
    const [collections, setCollections] = useState(undefined)
    const { data, loading, error } = useQuery(ALL_COLLECTIONS)

    useEffect(() => {
        if (data && !error) {
            setCollections(data.collections.items)
        }
    }, [data, error])

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    )
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    // if (collections) {
    //     console.log(collections)
    //     const a = listToTree(data.collections.items, {
    //         idKey: 'id',
    //         parentKey: 'parent',
    //         childrenKey: 'children',
    //     })
    //     console.log(a)
    // }

    const datas = {
        id: 'root',
        name: 'Parent',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    }

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
                        {renderTree(datas)}
                    </TreeView>
                </AccordionDetails>
            </Accordion>
            <Divider variant="middle" />
        </article>
    )
}

export default CategoryFilter
