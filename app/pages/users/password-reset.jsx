import { useContext, useState } from 'react'
import { USER_RESET_PASSWORD } from 'graphql/mutations'
import { useRouter } from 'next/router'
import { UserContext } from 'utils/userContext'
import {
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField,
} from '@material-ui/core'

export default function paswordResetPage() {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { token } = router.query

    const { resetPassword } = useContext(UserContext)

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (token && password) {
            resetPassword(USER_RESET_PASSWORD, token, password)
            setLoading(true)
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
    }

    return (
        <Container maxWidth="lg">
            <Grid container style={{ height: '50vh' }}>
                <Grid item xs md={6} lg={4} xl={3}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            style={{ marginBottom: 10 }}
                            onChange={handlePassword}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            RESET
                        </Button>
                    </form>
                    {loading && <CircularProgress />}
                </Grid>
            </Grid>
        </Container>
    )
}
