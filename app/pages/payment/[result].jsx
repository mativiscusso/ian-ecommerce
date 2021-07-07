import React from 'react'
import { useRouter } from 'next/router'

export default function PaymentResult() {
    const router = useRouter()
    const { result } = router.query

    return (
        <div>
            <h2>Su pago fue {result && result}</h2>
            <small>Usted sera redirigido automaticamente</small>
        </div>
    )
}
