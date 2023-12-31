'use client'
import { createContext, useEffect, useState } from 'react'

export const Context = createContext()

const Cart = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem('cart'))
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const initialCart = getInitialCart()
    if (initialCart && initialCart.length) {
      setCart(initialCart)
    }
  }, [])

  useEffect(() => {
    // write to local storage
    localStorage.setItem('cart', JSON.stringify(cart))

    let newTotal = 0
    cart.forEach((item) => (newTotal += item.price * item.qty))
    setTotal(newTotal)
  }, [cart])

  const openCart = () => {
    setIsOpen(true)
  }

  const closeCart = () => {
    setIsOpen(false)
  }

  const addItemToCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id)

    if (item) {
      // increase qty
      item.qty += qty
      setCart([...cart])
    } else {
      setCart([...cart, { ...product, qty }])
    }
  }

  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setCart([])
  }

  const exposed = {
    addItemToCart,
    removeItemFromCart,
    cart,
    openCart,
    closeCart,
    isOpen,
    total,
    clearCart,
  }

  return (
    <Context.Provider value={exposed}>
      <div>{children}</div>
    </Context.Provider>
  )
}

export default Cart
