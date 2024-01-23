'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { useStore } from '../../util/store'
import { getTotalAmount } from '../../util/getTotalAmount'

import Sidebar from '../UI/sidebar'
import ProductList from '../views/productList'
import Button from '../UI/button'
import CartIcon from '../../public/icons/SVG/cartIcon.svg'
import Cross from '../../public/icons/SVG/cross.svg'

const Cart = () => {
  const { cartItems, dispatch, cartActive } = useStore()

  const amountHandler = (item, type) => {
    if (type === 'increment' && item.amount + 1 <= item.in_stock) {
      dispatch({
        type: 'CHANGE_AMOUNT',
        product: item,
        operation: 'increment',
      })
    } else if (type === 'decrement' && item.amount - 1 > 0) {
      dispatch({
        type: 'CHANGE_AMOUNT',
        product: item,
        operation: 'decrement',
      })
    }
  }

  const [isClosing, setIsClosing] = useState(false)

  const closeModalHandler = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      dispatch({ type: 'TOGGLE_CART', bool: false })
    }, 600)
  }

  useEffect(() => {
    const c = localStorage.getItem('cartItems')
    if (c) {
      dispatch({ type: 'EXISTING', cartItems: JSON.parse(c) })
    }
  }, [])

  const headerContent = <p className="text-xl">Your Cart</p>

  const bodyContent = (
    <div className="h-[65%] w-[90%] m-[5%] overflow-scroll">
      <ProductList
        products={cartItems}
        amountHandler={amountHandler}
        dispatch={dispatch}
      />
    </div>
  )

  const footerContent = (
    <div className="border-t border-gray-300 w-full h-[20%] flex flex-col items-center justify-center space-y-4 p-4">
      <div className="flex items-center justify-start w-full">
        <p>
          TOTAL: {cartItems.length > 0 && getTotalAmount(cartItems)}
          {cartItems.length === 0 && 0} Kr
        </p>
      </div>
      {cartItems.length > 0 && (
        <div className="w-full h-[80%] flex items-center justify-center">
          <Link
            href="/checkout"
            onClick={() => dispatch({ type: 'TOGGLE_CART', bool: false })}
          >
            <Button>CHECKOUT</Button>
          </Link>
        </div>
      )}
    </div>
  )

  return (
    <>
      {!cartActive && (
        <div
          className="flex items-center justify-center hover:scale-105 cursor-pointer"
          onClick={() => dispatch({ type: 'TOGGLE_CART', bool: true })}
        >
          <CartIcon width="20" height="20" />
        </div>
      )}
      {cartActive && (
        <Cross
          height="20"
          width="20"
          onClick={() => closeModalHandler()}
          className="hover:scale-105 cursor-pointer"
        />
      )}
      <Sidebar
        isActive={cartActive}
        isClosing={isClosing}
        setIsActive={(bool) => dispatch({ type: 'TOGGLE_CART', bool: bool })}
        headerContent={headerContent}
        bodyContent={bodyContent}
        footerContent={footerContent}
        closeModalHandler={closeModalHandler}
        orientation="right"
      />
    </>
  )
}

export default Cart
