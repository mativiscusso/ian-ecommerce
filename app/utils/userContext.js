import { createContext, useState, useEffect } from 'react'
import { getDefaultValues } from '@apollo/client/utilities'
import { useQuery } from '@apollo/client'
import { USER_ACTIVE } from 'graphql/queries'

export const UserContext = createContext(getDefaultValues)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const [cart, setCart] = useState([])

    const { data, error } = useQuery(USER_ACTIVE)

    useEffect(() => {
        if (data && !error) {
            setUser(data)
        }
    }, [data, error])

    const totalQuantity = (cart) => {
        if (cart === null || cart === undefined || cart.length === 0) {
            return 0
        } else {
            const qty = cart.lines.reduce((acc, item) => {
                return item.quantity + acc
            }, 0)
            return qty
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                totalQuantity,
                cart,
                setCart,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
