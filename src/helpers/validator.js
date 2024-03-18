import { object } from "zod";
import z from "zod";
export const signInSchema = object({
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(2, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const validatePasswordConfirm = (password, confirmPassword) => {
  if (password === confirmPassword) return true;
  return false;
};

export const createAccountSchema = z.object({
  name: z.string().nonempty("User name is reqquired"),
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .refine((value) => /^(\+?\d{1,3}[-\s]?)?\d{10}$/i.test(value), {
      message: "Invalid phone number format",
    }),
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password mus be more than 8 characters")
    .max(40, "Password must be less than 40 characters"),
  confirmPassword: z
    .string()
    .nonempty("Confirm Password is required")
    .min(8, "Confirm Password mus be more than 8 characters")
    .max(40, "Confirm Password must be less than 40 characters"),
  role: z.enum(["STUDENT", "ADMIN", "MK-MANAGER", "MK-COORDINATOR & GUEST"]),
  status: z.enum(["ACTIVE", "DEACTIVE"]),
});
