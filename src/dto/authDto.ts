import * as z from "zod";
export const SignupDto = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});


export const SignInDto = z.object({
    email:z.string().email('Not a valid email'),
  password: z.string().min(8, "Password must be at least 8 characters"),
})
