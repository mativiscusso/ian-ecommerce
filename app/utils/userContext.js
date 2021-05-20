import React, { createContext, useState, useEffect } from 'react'
import { getDefaultValues } from '@apollo/client/utilities'
import { useLazyQuery } from '@apollo/client'
import { USER_ACTIVE } from 'graphql/queries'

export const UserContext = createContext(getDefaultValues)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    let userLoading = false
    const [currentUser, { data, loading }] = useLazyQuery(USER_ACTIVE)

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
                localStorage.setItem(
                    'vendure-auth-token',
                    result.headers.get('vendure-auth-token')
                )
                return result.json()
            })
            .then(({ data }) => {
                if (data.logout) {
                    setUser(undefined)
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
                if (res) {
                    currentUser()
                    if (data) {
                        setUser(data)
                    }
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
                if (res) {
                    currentUser()
                    if (data) {
                        setUser(data)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const verifyUser = (mutation, token) => {
        let result
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
        return result
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
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
