import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

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

import Alert from 'components/Alert'

import { USER_LOGIN } from 'graphql/mutations'

import { UserContext } from 'utils/userContext'

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
    const [statusLogin, setStatusLogin] = useState(false)

    const { login, statusRequest } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (statusRequest) {
            setStatusLogin(statusRequest)
        }
    }, [statusRequest])

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            user: email,
            password: password,
            rememberMe: rememberMe,
        }
        if (user.user && user.password) {
            login(USER_LOGIN, user)

            if (statusLogin.status) {
                router.push('/')
            }
        } else {
            setStatusLogin({
                status: false,
                msg: 'Los campos USUARIO y CONTRASEÑA son requeridos',
            })
        }
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
                        <Grid item xs={12}>
                            {statusLogin && (
                                <Alert
                                    isOpen={true}
                                    text={statusLogin.msg}
                                    severity="error"
                                />
                            )}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
