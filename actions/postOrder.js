import axios from 'axios'

export const postOrder = async (formData, cartItems, discountCode) => {
  const order = {
    email: formData.email,
    phone: formData.phone,
    name: formData.name,
    country: formData.country,
    city: formData.city,
    address: formData.address,
    address2: formData.address2,
    postalCode: formData.postalCode,
    shipping: formData.shipping,
    paymentMethod: formData.payment,
    cartItems: cartItems,
    discountCode: discountCode,
  }
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/create-vipps-session`,
    order,
  )

  return response
}
