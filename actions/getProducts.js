import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-products`
    );
    return response.data.products
  } catch (error) {
    console.log(error);
  }
};
