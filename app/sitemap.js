import { getProducts } from "../actions/getProducts";

export default async function sitemap() {
  const products = await getProducts();
  
  const prodUrls =
    products.map((prod) => {
      return {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/${prod._id}`,
        lastModified: prod.updatedAt,
      };
    }) ?? [];

  return [
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/authenticity`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/faq`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/terms-of-service`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/products`,
      lastModified: new Date(),
    },
    ...prodUrls,
  ];
}
