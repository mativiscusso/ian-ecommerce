import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'
import ProductDetail from 'components/ProductDetail'
import { useQuery } from '@apollo/client'
import { ONE_PRODUCT } from 'graphql/queries'

export default function ProductDetailPage() {
    const router = useRouter()
    const { id } = router.query
    const { loading, error, data } = useQuery(ONE_PRODUCT, {
        variables: { id: id },
    })

    if (loading) return <span>Loading</span>
    if (error) return <span>{error}</span>

    console.log(data)
    return (
        <Container>
            <ProductDetail data={{ ...data }} />
        </Container>
    )
}
