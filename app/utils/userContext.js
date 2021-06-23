import React, { createContext, useState } from 'react'
import { getDefaultValues } from '@apollo/client/utilities'

export const UserContext = createContext(getDefaultValues)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const [cart, setCart] = useState([])

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
