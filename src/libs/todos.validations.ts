import { z } from 'zod';

export const TodoValidator = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(2, { message: 'Title must be 2 or more characters long' }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(2, { message: 'Description must be 2 or more characters long' }),
});
