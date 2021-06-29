import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Alert from 'components/Alert'

import { USER_REGISTER } from 'graphql/mutations'

import { UserContext } from 'utils/userContext'
import { useMutation } from '@apollo/client'

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
    const [errorsExist, setErrorsExist] = useState(false)
    const [statusRegister, setStatusRegister] = useState({
        status: false,
        msg: '',
        disabled: false,
    })

    const { user } = useContext(UserContext)

    const [register] = useMutation(USER_REGISTER)

    const router = useRouter()

    useEffect(() => {
        user && router.push('/')
    }, [user])

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
    const handleSubmit = async (e) => {
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
            const { data } = await register({ variables: { data: user } })
            switch (data.registerCustomerAccount.__typename) {
                case 'MissingPasswordError':
                    setStatusRegister({
                        status: true,
                        msg: 'No se ha enviado contraseña',
                        disabled: false,
                    })
                    break
                case 'Success':
                    setStatusRegister({
                        status: 'ok',
                        msg: 'Registro exitoso. Hemos enviado un email para confirmación.',
                        disabled: true,
                    })

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
                                error={errorsExist.status}
                                helperText={errorsExist.msg}
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
                                error={errorsExist.status}
                                helperText={errorsExist.msg}
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
                                error={errorsExist.status}
                                helperText={errorsExist.msg}
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
                                error={errorsExist.status}
                                helperText={errorsExist.msg}
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
                    {statusRegister.status === 'ok' && (
                        <Alert
                            isOpen={true}
                            text={statusRegister.msg}
                            severity="success"
                        />
                    )}
                    <>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={statusRegister.disabled}
                        >
                            Registrarme
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                {!statusRegister.disabled && (
                                    <Link href="/login">
                                        ¿Ya tiene una cuenta? Ingrese acá
                                    </Link>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {statusRegister.status === true && (
                                <Alert
                                    isOpen={true}
                                    text={statusRegister.msg}
                                    severity="error"
                                />
                            )}
                        </Grid>
                    </>
                </form>
            </div>
        </Container>
    )
}
