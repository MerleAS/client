import { z } from "zod";

import HeltHjem from "./public/icons/SVG/heltHjem.svg";
import Posten from "./public/icons/SVG/posten.svg";
import Card from "./public/icons/SVG/card.svg";
import Vipps from "./public/icons/SVG/vipps.svg";

export const schema = z.object({
  name: z.string().min(2, { message: "Fyll inn et gyldig navn" }),
  email: z.string().email("Ugyldig epost addresse"),
  phone: z
    .number()
    .positive()
    .min(10000000, { message: "Ugyldig telefonnummer" })
    .max(100000000, { message: "Ugyldig telefonnummer" }),
  country: z.string().min(2),
  city: z.string(),
  address: z.string().min(2).max(40),
  address2: z.string().optional(),
  postalCode: z.number().min(2),
  shipping: z.object({
    label: z.string(),
    price: z.number()
  }),
  payment: z.string(),
});

export const paymentOptions = [
  {
    label: "Card",
    value: "card",
    icon: <Card height="30" width="30" />,
    description: "Ingen ekstra kostnader",
    price: null,
  },
  {
    label: "Vipps",
    value: "vipps",
    icon: <Vipps height="30" width="30" />,
    description: "Ingen ekstra kostnader",
    price: null,
  },
];

export const shippingOptions = [
  {
    label: "Helt Hjem",
    value: "helt-hjem",
    icon: <HeltHjem height="30" width="30" />,
    description: "Leveres om 4-7 virkedager",
    price: 139,
  },
  {
    label: "Posten",
    value: "posten",
    icon: <Posten height="30" width="30" />,
    description: "Leveres om 4-7 virkedager",
    price: 129,
  },
];

export const COUNTRIES = ["Norge"];

export const CLIENT_URL = "https://www.merle.no"
