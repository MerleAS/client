import axios from 'axios'

export const validateDiscount = async (discountCode, setDiscountCode) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/discount/validate-discount-code`,
    {
      discountCode: discountCode,
    },
  )
  const discount = response.data.discount
  setDiscountCode(discount)
}
