import { getDefaultValues } from '@apollo/client/utilities'
import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext(getDefaultValues)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) ?? []
    setCart(localCart)
  }, [])

  const addToCart = (prod) => {
    const localCart = JSON.parse(localStorage.getItem('cart')) ?? []
    localCart.push(prod)
    localStorage.setItem('cart', JSON.stringify(localCart))
    setCart(localCart)
  }

  const emptyCart = () => {
    localStorage.setItem('cart', JSON.stringify([]))
    return setCart([])
  }

  const updateQtyItem = (e, limitStock) => {
    const id = e.currentTarget.id
    const newQty = e.target.value

    if (limitStock != undefined) {
      if (newQty <= limitStock) {
        const cartModified = cart.map((item) => {
          if (item.id === id) {
            item.quantity = newQty
          }
          return item
        })

        localStorage.setItem('cart', JSON.stringify(cartModified))
        return setCart(cartModified)
      }
    } else {
      const cartModified = cart.map((item) => {
        if (item.id === id) {
          item.quantity = newQty
        }
        return item
      })

      localStorage.setItem('cart', JSON.stringify(cartModified))
      return setCart(cartModified)
    }
  }

  const deleteItemCart = (e) => {
    const id = e.currentTarget.id
    const cartFiltered = cart.filter((item) => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(cartFiltered))
    return setCart(cartFiltered)
  }

  function totalCalculator (items) {
    return items
      .map((item) => {
        const priceDefault = item.prices.find(
          (price) => price.list.isDefaultOnSite === true
        )
        return priceDefault.value * item.quantity
      })
      .reduce((sum, i) => sum + i, 0)
      .toFixed(2)
  }

  function totalQtyCalculator (items) {
    const suma = items.reduce((sum, currentValue) => {
      return sum + Number(currentValue.quantity)
    }, 0)
    return suma
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        emptyCart,
        updateQtyItem,
        deleteItemCart,
        totalCalculator,
        totalQtyCalculator
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
