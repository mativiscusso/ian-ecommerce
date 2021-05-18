import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  formSearch: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  },
  inputTextForm: {
    width: '90%',
    [theme.breakpoints.down('md')]: {
      width: '65%',
      marginBottom: 10
    }
  },
  listProductsInline: {
    fontSize: 13,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: '100%',
    borderRadius: '0 0 1rem 1rem'
  },
  productInline: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(200,200,200,0.2)'
    }
  },
  imgProductInline: {
    marginRight: '1rem'
  }
}))

const ProductSearch = () => {
  const { formSearch, inputTextForm } = useStyles()

  return (
    <>
      <form action='/products' method='get' className={formSearch}>
        <TextField
          name='search'
          type='text'
          label='Buscar...'
          className={inputTextForm}
          variant='standard'
          fullWidth
          margin='none'
        />
        <IconButton aria-label='serach' type='submit' color='inherit'>
          <SearchIcon />
        </IconButton>
      </form>
    </>
  )
}

export default ProductSearch
