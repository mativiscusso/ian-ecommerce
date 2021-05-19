import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { USER_REGISTER } from 'graphql/mutations'
import { useMutation } from '@apollo/client'
import Alert from 'components/Alert'
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Register() {
    const classes = useStyles()
    const [alertOpen, setAlertOpen] = useState(false)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const router = useRouter()
    const [userRegister] = useMutation(USER_REGISTER)

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
        const result = await userRegister({ variables: { data: user } })
        if (result) {
            setAlertOpen(true)
            setTimeout(() => {
                router.push('/')
            }, 3000)
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
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
                        {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
                    </Grid>
                    {!alertOpen ? (
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
                        </>
                    ) : (
                        <Alert
                            isOpen={alertOpen}
                            text="Registro exitoso. Hemos enviado un email para confirmacion."
                        />
                    )}
                </form>
            </div>
        </Container>
    )
}
