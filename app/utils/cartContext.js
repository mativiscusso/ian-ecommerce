import { createContext, useEffect, useState } from 'react'

import { getDefaultValues } from '@apollo/client/utilities'
import { useLazyQuery } from '@apollo/client'
import { ORDER_ACTIVE } from 'graphql/queries'

export const CartContext = createContext(getDefaultValues)

export const CartProvider = ({ children }) => {
    const [cartLenght, setCartLenght] = useState(0)
    const [cart, setCart] = useState([])
    const [activeOrder, { data, error }] = useLazyQuery(ORDER_ACTIVE)

    useEffect(() => {
        activeOrder()
        if (data !== undefined && data.activeOrder !== undefined) {
            console.log(data)
            setCart(data.activeOrder)
            setCartLenght(totalQuantity(data.activeOrder))
        }
        if (error) {
            console.log(error)
        }
    }, [activeOrder, data, error])

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
    console.log(cartLenght)
    return (
        <CartContext.Provider
            value={{
                cart,
                cartLenght,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
