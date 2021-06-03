import { useState } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import { Button, Dialog } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 'auto',
            backgroundColor: fade(theme.palette.common.white, 0.15),
            display: 'flex',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    formSearch: {
        display: 'flex',
        alignItems: 'center',
    },
    listProductsInline: {
        fontSize: 13,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.95)',
        width: '100%',
        borderRadius: '0 0 1rem 1rem',
    },
    productInline: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: 'rgba(200,200,200,0.2)',
        },
    },
    imgProductInline: {
        marginRight: '1rem',
    },
    wrapper: {
        width: 100 + theme.spacing(2),
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
    },
}))

const ProductSearch = ({ mobileState }) => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [productsSearch, setProductsSearch] = useState([])
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = (value) => {
        setProductsSearch([])
        setName('')
        setOpen(false)
    }

    const handleChange = async (e) => {
        if (e.target.value === '') {
            setProductsSearch([])
            setName('')
        } else {
            await setName(e.target.value)
        }
    }

    return (
        <>
            {!mobileState ? (
                <>
                    <form action="/products/all" method="get">
                        <div className={classes.search}>
                            <IconButton
                                aria-label="search"
                                type="submit"
                                style={{ color: '#fff' }}
                            >
                                <SearchIcon />
                            </IconButton>

                            <InputLabel htmlFor="searchDesktop"></InputLabel>
                            <InputBase
                                id="searchDesktop"
                                name="search"
                                placeholder="Search any product..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={name}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className={classes.grow} />
                    </form>
                    <section className={classes.listProductsInline}>
                        {productsSearch.map((item) => (
                            <a
                                key={item.id}
                                className={classes.productInline}
                                href={`/wonder-slug/product-detail?id=${item.id}`}
                            >
                                {item.images ? (
                                    <img
                                        className={classes.imgProductInline}
                                        src={`${process.env.REACT_APP_API_URL}/files/${item.images[0]}?width=800`}
                                        alt="producto"
                                        width={50}
                                    />
                                ) : (
                                    <img
                                        className={classes.imgProductInline}
                                        src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                                        alt="producto"
                                        width={50}
                                    />
                                )}
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </section>
                </>
            ) : (
                <form action="/products/all" method="get">
                    <div className={classes.search}>
                        <>
                            <Button onClick={handleClickOpen}>
                                <div>
                                    <IconButton
                                        aria-label="search"
                                        style={{ color: '#fff' }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                            </Button>
                            <Dialog
                                onClose={handleClose}
                                aria-labelledby="search-product"
                                open={open}
                            >
                                <InputLabel htmlFor="searchMobile"></InputLabel>
                                <InputBase
                                    id="searchMobile"
                                    name="search"
                                    placeholder="Search any product..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <section className={classes.listProductsInline}>
                                    {productsSearch.map((item) => (
                                        <a
                                            key={item.id}
                                            className={classes.productInline}
                                            href={`/wonder-slug/product-detail?id=${item.id}`}
                                        >
                                            {item.images ? (
                                                <img
                                                    className={
                                                        classes.imgProductInline
                                                    }
                                                    src={`${process.env.REACT_APP_API_URL}/files/${item.images[0]}?width=800`}
                                                    alt="producto"
                                                    width={50}
                                                />
                                            ) : (
                                                <img
                                                    className={
                                                        classes.imgProductInline
                                                    }
                                                    src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                                                    alt="producto"
                                                    width={50}
                                                />
                                            )}
                                            <span>{item.name}</span>
                                        </a>
                                    ))}
                                </section>
                            </Dialog>
                        </>
                    </div>
                </form>
            )}
        </>
    )
}

export default ProductSearch
