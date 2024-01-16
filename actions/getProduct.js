"use server"

import axios from "axios";

export const getProductById = cache(async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-product/${id}`
    );
    return response.data.product;
  } catch (error) {
    console.log(error);
  }
});
