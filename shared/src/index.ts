import { z } from "zod";

export const profileSchema = z.object({
  userId: z.string().min(1),
  displayName: z.string().min(1),
  plan: z.enum(["free", "team"])
});

export const problemSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1)
  })
});

export type Profile = z.infer<typeof profileSchema>;
export type Problem = z.infer<typeof problemSchema>;

export function problem(code: string, message: string): Problem {
  return { error: { code, message } };
}

