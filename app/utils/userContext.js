import React, { createContext, useState, useEffect } from 'react'
import { getDefaultValues } from '@apollo/client/utilities'
import { useLazyQuery, useApolloClient } from '@apollo/client'
import { USER_ACTIVE } from 'graphql/queries'

export const UserContext = createContext(getDefaultValues)

export const UserProvider = ({ children }) => {
    let userLoading = false
    const [user, setUser] = useState(undefined)
    const [statusRequest, setStatusRequest] = useState(undefined)
    const [currentUser, { data, loading }] = useLazyQuery(USER_ACTIVE)
    const client = useApolloClient()

    useEffect(() => {
        currentUser()
        if (data) {
            setUser(data)
            userLoading = false
        }
    }, [currentUser, data])

    if (loading) {
        userLoading = true
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
                    return true
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const login = (mutation, user) => {
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
            .then((res) => {
                if (res.data.login.__typename === 'CurrentUser') {
                    setStatusRequest({ status: true, msg: 'Ok' })
                    currentUser()
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
                    if (data) {
                        setUser(data)
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
                    if (data) {
                        setUser(data)
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
    console.log(statusRequest)
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
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
