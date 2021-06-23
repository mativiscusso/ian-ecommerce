import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import { Backdrop, CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { USER_ACCOUNT_VERIFY } from 'graphql/mutations'
import { UserContext } from 'utils/userContext'
import { useMutation } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 10,
        color: '#fff',
    },
}))
export default function verifyUserPage() {
    const [resultVerify] = useState(true)
    const router = useRouter()
    const { token } = router.query
    const { backdrop } = useStyles()

    const [verifyUser] = useMutation(USER_ACCOUNT_VERIFY)

    useEffect(() => {
        if (token) {
            verifyUser({ variables: { token: token } })
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
    }, [token])

    return (
        <Grid
            container
            alignItems="center"
            style={{ height: '50vh' }}
            alignContent="center"
        >
            {resultVerify && (
                <Backdrop open={true} className={backdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </Grid>
    )
}
