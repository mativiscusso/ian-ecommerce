import css from 'styled-jsx/css'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(8),

        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(0),
        },
    },
}))
const globalStyles = css.global`
    a {
        color: inherit;
        text-decoration: none;
        transition: filter 0.1s ease-in;
    }
    a:hover {
        font-weight: bolder;
        text-decoration: none !important;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
`
export default function Layout({ children }) {
    const { mainGrid } = useStyles()
    return (
        <>
            <Navbar />
            <main className={mainGrid}>{children}</main>
            <Footer
                title="Footer"
                description="IAN Ecommerce - Una plataforma de venta online"
            />
            <style jsx global>
                {globalStyles}
            </style>
        </>
    )
}
