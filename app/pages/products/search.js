import { useState, useEffect } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

import ProductsList from 'components/ProductList'
import ProductFilters from 'components/ProductsFilter'
import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'

import { SEARCH_PRODUCTS } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    mainProducts: {
        marginTop: theme.spacing(12),

        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(4),
        },
    },
}))

export default function AllProducts() {
    const [products, setProducts] = useState(undefined)
    const [order, setOrder] = useState('')

    const { mainProducts } = useStyles()
    const router = useRouter()

    const { q } = router.query

    const { data, loading, error } = useQuery(SEARCH_PRODUCTS, {
        variables: {
            input: { term: q, groupByProduct: true },
        },
    })

    useEffect(() => {
        if (error) {
            console.dir(error)
            return <h1> error </h1>
        }

        if (data && !error) {
            setProducts(data)
        }
    }, [q, data, error])

    if (loading) {
        return <h1>loading...</h1>
    }

    const handleChange = (event) => {
        setOrder(event.target.value)
    }
    return (
        <Container maxWidth="xl" className={mainProducts}>
            <Grid container justify="center">
                <Grid item xs={12} lg={3} xl={2}>
                    <ProductFilters />
                </Grid>
                <Grid item xs={12} lg={8} xl={10}>
                    <Grid
                        container
                        alignItems="flex-end"
                        justify="space-between"
                    >
                        <Grid item xs={12} lg={6}>
                            <Typography variant="subtitle2">
                                Su búsqueda arrojó{' '}
                                {products && products.search.totalItems}{' '}
                                resultados
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6} style={{ textAlign: 'end' }}>
                            <FormControl style={{ width: 200 }}>
                                <InputLabel id="demo-simple-select-label">
                                    Ordenar por
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={order}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="name:ASC">
                                        Nombre A - Z
                                    </MenuItem>
                                    <MenuItem value="name:DESC">
                                        Nombre Z - A
                                    </MenuItem>
                                    <MenuItem value="price:ASC">
                                        Precio Menor - Mayor
                                    </MenuItem>
                                    <MenuItem value="price:ASC">
                                        Precio Mayor - Menor
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <ProductsList data={data} />
                </Grid>
            </Grid>
        </Container>
    )
}
