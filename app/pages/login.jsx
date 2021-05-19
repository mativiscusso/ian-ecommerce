import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useState } from 'react'
import { USER_LOGIN } from 'graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Login() {
    const classes = useStyles()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [rememberMe, setRememberMe] = useState(false)

    const [userAuth] = useMutation(USER_LOGIN)

    const router = useRouter()

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            user: email,
            password: password,
            rememberMe: rememberMe,
        }

        async function requestAuth() {
            const query = `
            mutation login($user: String!, $password: String!, $rememberMe: Boolean) {
                login(username: $user, password: $password, rememberMe: $rememberMe) {
                    __typename
                }
            }
        `
            fetch('http://localhost:4000/shop-api', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables: { ...user } }),
            })
                .then((result) => {
                    localStorage.setItem(
                        'vendure-auth-token',
                        result.headers.get('vendure-auth-token')
                    )
                    return result.json()
                })
                .then(({ data }) => {
                    if (data.login.__typename === 'CurrentUser') {
                        router.push('/')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        await requestAuth()
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ingresar
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePassword}
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Recordarme"
                        onChange={handleRememberMe}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                ¿Olvidó su contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register">
                                <a>¿No tiene una cuenta? Registrese acá</a>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
