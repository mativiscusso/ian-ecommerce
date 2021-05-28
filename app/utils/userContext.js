import React, { createContext, useState, useEffect } from 'react'
import { getDefaultValues } from '@apollo/client/utilities'
import { useLazyQuery, useApolloClient } from '@apollo/client'
import { USER_ACTIVE, ORDER_ACTIVE } from 'graphql/queries'

export const UserContext = createContext(getDefaultValues)

export const UserProvider = ({ children }) => {
    let userLoading = false
    const [user, setUser] = useState(undefined)
    const [statusRequest, setStatusRequest] = useState(undefined)
    const [cartLenght, setCartLenght] = useState(0)
    const [cart, setCart] = useState([])

    const [
        activeOrder,
        { data: dataOrder, loading: loadingOrder, error: errorOrder },
    ] = useLazyQuery(ORDER_ACTIVE)
    const [
        currentUser,
        { data: dataUser, loading: loadingUser, error: errorUser },
    ] = useLazyQuery(USER_ACTIVE)

    const client = useApolloClient()

    useEffect(() => {
        currentUser()
        if (dataUser) {
            setUser(dataUser)
            activeOrder()
            if (dataOrder && dataOrder.activeOrder) {
                setCart(dataOrder.activeOrder)
                setCartLenght(totalQuantity(dataOrder.activeOrder))
            }
            userLoading = false
        }
    }, [currentUser, activeOrder, dataOrder, dataUser])

    if (loadingUser) {
        userLoading = true
    }

    const totalQuantity = (cart) => {
        if (cart === null) {
            return 0
        } else {
            const qty = cart.lines.reduce((acc, item) => {
                return item.quantity + acc
            }, 0)
            return qty
        }
    }

    const logout = (mutation) => {
        fetch('http://localhost:4000/shop-api', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mutation),
        })
            .then((result) => {
                client.clearStore()
                localStorage.clear()
                return result.json()
            })
            .then(({ data }) => {
                if (data.logout) {
                    setUser(undefined)
                    setStatusRequest(undefined)
                    setCart([])
                    setCartLenght(0)
                    return true
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const login = async (mutation, user) => {
        fetch('http://localhost:4000/shop-api', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { ...user },
            }),
        })
            .then((result) => {
                localStorage.setItem(
                    'vendure-auth-token',
                    result.headers.get('vendure-auth-token')
                )
                return result.json()
            })
            .then(async (res) => {
                if (res.data.login.__typename === 'CurrentUser') {
                    setStatusRequest({ status: true, msg: 'Ok' })
                    await currentUser()
                }
                if (res.data.login.__typename === 'InvalidCredentialsError') {
                    setStatusRequest({
                        status: false,
                        msg: 'Credenciales Invalidas',
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const register = (mutation, user) => {
        fetch('http://localhost:4000/shop-api', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { data: user },
            }),
        })
            .then((result) => {
                localStorage.setItem(
                    'vendure-auth-token',
                    result.headers.get('vendure-auth-token')
                )
                return result.json()
            })
            .then((res) => {
                if (res.data.registerCustomerAccount.__typename === 'Success') {
                    setStatusRequest({ status: true, msg: 'Ok' })
                } else {
                    setStatusRequest({
                        status: false,
                        msg: 'Verifique los campos email y password',
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const verifyUser = (mutation, token) => {
        fetch('http://localhost:4000/shop-api', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { token: token },
            }),
        })
            .then((result) => {
                localStorage.setItem(
                    'vendure-auth-token',
                    result.headers.get('vendure-auth-token')
                )
                return result.json()
            })
            .then((res) => {
                if (
                    res.data.verifyCustomerAccount.__typename === 'CurrentUser'
                ) {
                    currentUser()
                    if (dataUser) {
                        setUser(dataUser)
                    }
                } else {
                    throw new Error('User not verified')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const resetPassword = (mutation, token, password) => {
        fetch('http://localhost:4000/shop-api', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: { token: token, password: password },
            }),
        })
            .then((result) => {
                localStorage.setItem(
                    'vendure-auth-token',
                    result.headers.get('vendure-auth-token')
                )
                return result.json()
            })
            .then((res) => {
                if (res.data.resetPassword.__typename === 'CurrentUser') {
                    currentUser()
                    if (dataUser) {
                        setUser(dataUser)
                        setStatusRequest({ status: true, msg: 'Ok' })
                    }
                } else {
                    setStatusRequest({
                        status: false,
                        msg: 'Token invalido o expirado',
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <UserContext.Provider
            value={{
                user,
                userLoading,
                verifyUser,
                register,
                login,
                logout,
                resetPassword,
                statusRequest,
                setStatusRequest,
                cartLenght,
                cart,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
