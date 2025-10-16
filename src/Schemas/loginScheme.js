import * as z from "zod";
export const formSchema = z.object({
  identifier: z
    .string()
    .min(1, "Identifier is required.")
    .min(5, "Identifier must be at least 5 characters.")
    .max(32, "Identifier must be at most 32 characters."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(5, "Password must be at least 5 characters.")
    .max(40, "Password must be at most 40 characters.")
});
