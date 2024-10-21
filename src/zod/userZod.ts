import { z } from "zod";

export const dailyNoteSchema = z.object({
  note: z.string().min(1),
  title: z.string().min(1),
  isCanonEvent: z.boolean(),
  images: z.array(z.string()).optional(),
});

export const loginDetailsSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(7, "Password must be 7 min letters"),
});

export type TLoginDetails = z.infer<typeof loginDetailsSchema>;

export const signupDetailsSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(7, "Password must be 7 letters"),
});

export type TSignupDetails = z.infer<typeof signupDetailsSchema>;
