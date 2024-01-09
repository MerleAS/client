import { CLIENT_URL } from "../constants";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
