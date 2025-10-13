import * as z from "zod";
export const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .min(5, "Email must be at least 5 characters.")
      .max(32, "Email must be at most 32 characters.")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address."
      ),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(5, "Password must be at least 5 characters.")
      .max(40, "Password must be at most 40 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  });