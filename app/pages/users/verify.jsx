import { useEffect } from 'react'
import { USER_ACCOUNT_VERIFY } from 'graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

export default function verifyUserPage() {
    const router = useRouter()
    const { token } = router.query
    const [verifyUser] = useMutation(USER_ACCOUNT_VERIFY)

    useEffect(() => {
        if (token) {
            verifyUser({ variables: { token: token } })
                .then((result) => {
                    console.log(result)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [token])

    return <p>Usuario verificado</p>
}
