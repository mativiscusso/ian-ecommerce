import { useRouter } from 'next/router'
import { Container, makeStyles } from '@material-ui/core'
import ProductDetail from 'components/ProductDetail'
import { useQuery } from '@apollo/client'
import { ONE_PRODUCT } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('lg')]: {
            marginTop: 150,
        },
    },
}))

export default function ProductDetailPage() {
    const { root } = useStyles()
    const router = useRouter()
    const { id } = router.query
    const { loading, error, data } = useQuery(ONE_PRODUCT, {
        variables: { id: id },
    })

    if (loading) return <span>Loading</span>
    if (error) return <span>{error}</span>

    return (
        <Container className={root}>
            <ProductDetail {...data.product} />
        </Container>
    )
}
