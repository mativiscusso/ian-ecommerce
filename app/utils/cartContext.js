import { createContext, useEffect, useState } from 'react'

import { getDefaultValues } from '@apollo/client/utilities'
import { useLazyQuery } from '@apollo/client'
import { ORDER_ACTIVE } from 'graphql/queries'

export const CartContext = createContext(getDefaultValues)

export const CartProvider = ({ children }) => {
    const [cartLenght, setCartLenght] = useState(null)
    const [activeOrder, { data, error }] = useLazyQuery(ORDER_ACTIVE)

    useEffect(() => {
        activeOrder()
        if (data) {
            setCartLenght(totalQuantity(data.activeOrder.lines))
            console.log(data)
        }
        if (error) {
            console.log(error)
        }
    }, [activeOrder, data, error])

    const totalQuantity = (cart) => {
        const qty = cart.reduce((acc, item) => {
            return item.quantity + acc
        }, 0)
        return qty
    }

    return (
        <CartContext.Provider
            value={{
                cartLenght,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
