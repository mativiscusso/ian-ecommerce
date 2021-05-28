import { Button, Grid } from '@material-ui/core'
import Cart from 'components/Cart'
import Link from 'next/link'

export default function CartPage() {
    return (
        <Grid container alignContent="center" direction="column">
            <Cart />
            <Link href="/checkout">
                <a>
                    <Button variant="contained" color="primary">
                        FINALIZAR COMPRA
                    </Button>
                </a>
            </Link>
        </Grid>
    )
}
