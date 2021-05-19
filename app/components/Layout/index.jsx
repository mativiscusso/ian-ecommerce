import { useState, useEffect } from 'react'
import css from 'styled-jsx/css'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { makeStyles } from '@material-ui/core/styles'
import { USER_ACTIVE } from 'graphql/queries'
import { useQuery } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(10),
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
`
export default function Layout({ children }) {
    const { mainGrid } = useStyles()

    const { data } = useQuery(USER_ACTIVE)
    return (
        <main>
            <Navbar user={data} />
            <main className={mainGrid}>{children}</main>
            <Footer
                title="Footer"
                description="IAN Ecommerce - Una plataforma de venta online"
            />
            <style jsx global>
                {globalStyles}
            </style>
        </main>
    )
}
