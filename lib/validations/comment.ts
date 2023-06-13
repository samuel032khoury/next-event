import { z } from "zod";

export const commentValidator = z.object({
  email: z.string().email().toLowerCase(),
  name: z.string().nonempty('Name is required'),
  text: z.string().nonempty('Comment text is required'),
});
