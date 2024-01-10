import axios from "axios";
import { cache } from "react";

export const getProducts = cache(async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-products`
    );
    return response.data.products;
  } catch (error) {
    console.log(error);
  }
});
