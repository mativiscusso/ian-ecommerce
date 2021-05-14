import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'
import ProductDetail from 'components/ProductDetail'
export default function ProductDetailPage () {
  const router = useRouter()
  const { id } = router.query
  return (
    <Container>
      {id}
      <ProductDetail />
    </Container>
  )
}
