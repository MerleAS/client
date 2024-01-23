'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useStore } from '../../../../util/store'
import { getTotalAmount } from '../../../../util/getTotalAmount'
import { validateDiscount } from '../../../../actions/validateDiscount'
import { postOrder } from '../../../../actions/postOrder'

import ZodForm from './zodForm'
import OrderSummary from './orderSummary'
import Merle from '../../../../public/icons/SVG/merle.svg'

import { schema } from '../../../../constants'

const Checkout = () => {

  const searchParams = useSearchParams()
  const { cartItems, dispatch } = useStore()

  const [isLoading, setIsLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState({
    label: '',
    valid: false,
    value: 0,
    _id: null,
  })

  const vippsHandler = async (formData) => {
    setIsLoading(true)
    try {
      const response = await postOrder(formData, cartItems, discountCode)
      setIsLoading(false)

      if (
        response.data.soldOutProducts &&
        response.data.soldOutProducts.length > 0
      ) {
        const soldOutProducts = response.data.soldOutProducts

        // filter out soldoutProducts from localstorage

        dispatch({
          type: 'SET_ERROR',
          message: `Dessverre ble følgende produkter nettopp kjøpt av noen andre: ${soldOutProducts.map(
            (prod) => `${prod.title},`,
          )}`,
          value: true,
        })
      } else {
        localStorage.removeItem("cartItems")
        window.location.href = response.data.url
      }
    } catch (error) {
      setIsLoading(false)
      dispatch({
        type: 'SET_ERROR',
        message: 'Noe gikk galt, prøv på nytt.',
        value: true,
      })
    }
  }

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: null,
      country: '',
      city: '',
      address: '',
      address2: '',
      postalCode: null,
      shipping: {
        label: 'helt-hjem',
        price: 0,
      },
      payment: 'card',
    },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const params = searchParams.get("order")
    if (params) {
      const order = JSON.parse(params)
      console.log("c", order.cartItems)
      localStorage.setItem("cartItems", JSON.stringify(order.cartItems))
      dispatch({type: "EXISTING", cartItems: order.cartItems})
    }
  }, [])

  return (
    <>
      <Link
        href="/"
        className="w-full h-[30px] mt-5 text-xl flex items-center justify-center md:h-[50px] md:w-[65%]"
      >
        <Merle height="80" width="200" />
      </Link>

      <div className="flex flex-col md:flex-row-reverse w-full gap-x-[5%] lg:gap-x-[10%] mt-8 px-[5%] lg:px-[10%] pb-[15%] h-fit ">
        <OrderSummary
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          getTotalAmount={getTotalAmount}
          validateDiscount={() => validateDiscount(discountCode, setDiscountCode)}
          cartItems={cartItems}
          shippingRadioValue={watch('shipping')}
        />

        <div className="flex flex-col space-y-[5%] w-full md:w-[50%] lg/xl:w-[55%]">
          <ZodForm
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            handleSubmit={handleSubmit}
            vippsHandler={vippsHandler}
            isLoading={isLoading}
            disabled={cartItems.length === 0}
          />
        </div>
      </div>
    </>
  )
}

export default Checkout
