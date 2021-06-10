import { useState, useEffect } from 'react'

import {
    CircularProgress,
    Container,
    Grid,
    Typography,
} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

import { useLazyQuery } from '@apollo/client'
import { SEARCH_PRODUCTS } from 'graphql/queries'

export default function OrderFilter({
    products,
    setProducts,
    queryString = '',
    collectionSlug = '',
}) {
    const [orderBy, setOrderBy] = useState('')

    const [
        sortProductsQuery,
        { data: dataSort, loading: loadingSort, error: errorSort },
    ] = useLazyQuery(SEARCH_PRODUCTS)

    useEffect(() => {
        if (dataSort && !errorSort) {
            setProducts(dataSort)
        }
    }, [dataSort, errorSort])

    if (loadingSort) return <CircularProgress />

    const formatValueOrderBy = (value) => {
        const splitted = value.split(':')
        return { [splitted[0]]: splitted[1] }
    }

    const handleChange = async (e) => {
        setOrderBy(e.target.value)
        if (e.target.value) {
            sortProductsQuery({
                variables: {
                    input: {
                        term: queryString,
                        collectionSlug: collectionSlug,
                        groupByProduct: true,
                        sort: formatValueOrderBy(e.target.value),
                    },
                },
            })
        }
    }

    return (
        <Container style={{ margin: 10 }}>
            <Grid container alignItems="flex-end" justify="space-between">
                <Grid item xs={12} lg={6}>
                    <Typography variant="subtitle2">
                        Su búsqueda arrojó{' '}
                        {products && products.search.totalItems} resultados
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={6} style={{ textAlign: 'end' }}>
                    <FormControl style={{ width: 200, textAlign: 'center' }}>
                        <InputLabel id="demo-simple-select-label">
                            Ordenar por
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={orderBy}
                            onChange={handleChange}
                        >
                            <MenuItem value="name:ASC">Nombre A - Z</MenuItem>
                            <MenuItem value="name:DESC">Nombre Z - A</MenuItem>
                            <MenuItem value="price:ASC">
                                Precio Menor - Mayor
                            </MenuItem>
                            <MenuItem value="price:DESC">
                                Precio Mayor - Menor
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    )
}
