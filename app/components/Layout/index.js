import css from 'styled-jsx/css'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(10)
  }
}))
const globalStyles = css.global`
    a {
        color: inherit;
        text-decoration: none;
    }
`
export default function Layout ({ children }) {
  const { mainGrid } = useStyles()
  return (
    <div>
      <Navbar />
      <main className={mainGrid}>{children}</main>
      <Footer
        title='Footer'
        description='IAN Ecommerce - Una plataforma de venta online'
      />
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  )
}
