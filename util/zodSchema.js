import { z } from "zod";

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
  });