'use server'

export const getProducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-products`, {
      headers: {
        'Cache-Control': 'no-store' // Disables caching for this request
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

/* import axios from 'axios'

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-products`,
    )
    return response.data.products
  } catch (error) {
    console.log(error)
  }
}
 */