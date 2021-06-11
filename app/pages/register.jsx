import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Alert from 'components/Alert'

import { USER_REGISTER } from 'graphql/mutations'

import { UserContext } from 'utils/userContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Register() {
    const classes = useStyles()
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [statusLogin, setStatusLogin] = useState(false)

    const { register, statusRequest, alertOpen } = useContext(UserContext)

    useEffect(() => {
        if (statusRequest) {
            setStatusLogin(statusRequest)
        }
    }, [statusRequest])

    const router = useRouter()

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            emailAddress: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
        }
        if (
            user.emailAddress &&
            user.firstName &&
            user.lastName &&
            user.password
        ) {
            const result = register(USER_REGISTER, user)
            console.log(result)
            if (statusLogin.status) {
                setTimeout(() => {
                    router.push('/')
                }, 2500)
            }
        } else {
            setStatusLogin({
                status: false,
                msg: 'Todos los campos son requeridos',
            })
        }
    }
    console.log(alertOpen, statusLogin)
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                                onChange={handleFirstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleLastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={handleEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePassword}
                            />
                        </Grid>
                    </Grid>
                    {alertOpen === false ? (
                        <>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Registrarme
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login">
                                        ¿Ya tiene una cuenta? Ingrese acá
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {statusLogin.status === false && (
                                    <Alert
                                        isOpen={true}
                                        text={statusLogin.msg}
                                        severity="error"
                                    />
                                )}
                            </Grid>
                        </>
                    ) : (
                        <Alert
                            isOpen={alertOpen}
                            text="Registro exitoso. Hemos enviado un email para confirmacion."
                            severity="success"
                        />
                    )}
                </form>
            </div>
        </Container>
    )
}
