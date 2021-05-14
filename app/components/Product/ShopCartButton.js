import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Button from '@material-ui/core/Button'
// import { CartContext } from "theme/components/utils/context";

const useStyles = makeStyles({
  btnCenter: {
    width: '100%',
    margin: 'auto'
  }
})

export default function ShopCartButton (props) {
  const classes = useStyles()
  const { variantsSelected, listVariants, resetVariantsSelected, enabled } =
        props

  const prod = {
    ...props,
    quantity: 1,
    variantsSelected,
    listVariants: listVariants || []
  }

  // const { addToCart } = useContext(CartContext);

  return (
    <>
      <Button
        className={classes.btnCenter}
        variant='contained'
        color='primary'
        disabled={enabled}
        startIcon={<ShoppingCartIcon />}
      >
        Agregar al carrito
      </Button>
    </>
  )
}
