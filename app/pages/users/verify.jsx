import { useEffect, useContext, useState } from 'react'
import { USER_ACCOUNT_VERIFY } from 'graphql/mutations'
import { useRouter } from 'next/router'
import { UserContext } from 'utils/userContext'
import { CircularProgress, Grid } from '@material-ui/core'

export default function verifyUserPage() {
    const [resultVerify] = useState(true)
    const router = useRouter()
    const { token } = router.query

    const { verifyUser } = useContext(UserContext)

    useEffect(() => {
        if (token) {
            verifyUser(USER_ACCOUNT_VERIFY, token)
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
            {resultVerify && <CircularProgress />}
        </Grid>
    )
}
