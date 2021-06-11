import { useState, useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TreeItem from '@material-ui/lab/TreeItem'
import Divider from '@material-ui/core/Divider'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_PRODUCTS } from 'graphql/queries'
import { formatFacetValues, mappedFacetsSelected } from 'utils/helpers'
import { CircularProgress, FormGroup } from '@material-ui/core'
import ChipsArray from 'components/ChipList'

const CategoryFilter = ({
    products,
    queryString,
    collectionSlug,
    setProducts,
}) => {
    // const [collections, setCollections] = useState(undefined)
    const [facets, setFacets] = useState(undefined)
    const [state, setState] = useState(false)
    const [facetsSelected, setFacetsSelected] = useState([])
    const [isMobile] = useState(window.innerWidth < 900)

    const [filterByFacet, { data, loading, error }] =
        useLazyQuery(SEARCH_PRODUCTS)

    useEffect(() => {
        if (data && !error) {
            setProducts(data)
        }
    }, [data, error])

    useEffect(() => {
        if (products) {
            setFacets(formatFacetValues(products.search.facetValues))
        }
    }, [products])

    useEffect(() => {
        if (facetsSelected) {
            filterByFacet({
                variables: {
                    input: {
                        term: queryString || '',
                        collectionSlug: collectionSlug || '',
                        groupByProduct: true,
                        facetValueIds: facetsSelected,
                    },
                },
            })
        }
    }, [facetsSelected])

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
        if (!facetsSelected.find((facet) => facet === event.target.value)) {
            setFacetsSelected((prevState) => [...prevState, event.target.value])
        }
    }

    const handleDelete = (chipToDelete) => () => {
        console.log(chipToDelete)
        setFacetsSelected((prevState) =>
            prevState.filter((chip) => chip !== chipToDelete.key)
        )
        setState({ ...state, [chipToDelete.label]: false })
    }

    if (loading) return <CircularProgress />
    console.log(state)
    return (
        <article>
            {facets && facetsSelected.length > 0 && (
                <ChipsArray
                    data={mappedFacetsSelected(facets, facetsSelected)}
                    handleDelete={handleDelete}
                />
            )}
            {facets &&
                facets.map((facet, i) => (
                    <div key={facet.name + i}>
                        <Accordion elevation={0} defaultExpanded={!isMobile}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id={facet.name}
                            >
                                <Typography variant="button">
                                    {facet.name}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {facet.values.map((value) => (
                                        <div
                                            key={value.facetValue.name + 'root'}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={
                                                            state[
                                                                value.facetValue
                                                                    .name
                                                            ]
                                                                ? state[
                                                                      value
                                                                          .facetValue
                                                                          .name
                                                                  ]
                                                                : false
                                                        }
                                                        disabled={
                                                            state[
                                                                value.facetValue
                                                                    .name
                                                            ]
                                                        }
                                                        onChange={handleChange}
                                                        name={
                                                            value.facetValue
                                                                .name
                                                        }
                                                        value={
                                                            value.facetValue.id
                                                        }
                                                    />
                                                }
                                                label={value.facetValue.name}
                                                key={
                                                    value.facetValue.name +
                                                    'facet'
                                                }
                                            />
                                            <Typography variant="caption">
                                                ({value.count})
                                            </Typography>
                                        </div>
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Divider variant="inset" />
                    </div>
                ))}
        </article>
    )
}

export default CategoryFilter
