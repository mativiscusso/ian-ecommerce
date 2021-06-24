import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Alert from 'components/Alert'
import ForgotPassword from 'components/ForgotPassword'

import { USER_LOGIN, USER_REQUEST_RESET_PASSWORD } from 'graphql/mutations'
import { useLazyQuery, useMutation } from '@apollo/client'

import { USER_ACTIVE } from 'graphql/queries'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
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
    const [statusLogin, setStatusLogin] = useState(false)
    const [errorsExist, setErrorsExist] = useState(false)

    const router = useRouter()

    const [currentUser] = useLazyQuery(USER_ACTIVE)
    const [login] = useMutation(USER_LOGIN)

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
        if (user.user && user.password) {
            const { data } = await login({ variables: user })
            switch (data.login.__typename) {
                case 'InvalidCredentialsError':
                    setStatusLogin({
                        status: true,
                        msg: 'Las credenciales son equivocadas',
                    })
                    break
                case 'NotVerifiedError':
                    setStatusLogin({
                        status: true,
                        msg: 'El usuario no esta validado',
                    })
                    break
                case 'CurrentUser':
                    currentUser()
                    router.replace('/')
                    break
            }
        } else {
            setErrorsExist({
                status: true,
                msg: 'Los campos son requeridos',
            })
            setTimeout(() => {
                setErrorsExist({
                    status: false,
                })
            }, 5000)
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
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
                        error={errorsExist.status}
                        helperText={errorsExist.msg}
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
                        error={errorsExist.status}
                        helperText={errorsExist.msg}
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
                            <ForgotPassword />
                        </Grid>
                        <Grid item>
                            <Link href="/register">
                                <a>¿No tiene una cuenta? Registrese acá</a>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            {statusLogin.status && (
                                <Alert
                                    isOpen={statusLogin.status}
                                    text={statusLogin.msg}
                                    severity={statusLogin.several || 'error'}
                                />
                            )}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
