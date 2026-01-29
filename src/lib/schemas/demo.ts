import { z } from 'zod'

export const demoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  preferredTime: z.string().optional(), // For non-calendar demo requests
  notes: z.string().optional(),
})

export type DemoFormData = z.infer<typeof demoSchema>
