import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  category: z.enum([
    'AI Automation',
    'Travel Industry',
    'Case Studies',
    'Workflow Automation',
    'Integrations',
  ]),
  author: z.string().default('RomAIx Team'),
  readTime: z.number().positive().optional(),
  image: z
    .string()
    .refine(
      (val) => val.startsWith('/') || val.startsWith('http'),
      'Image must be a path starting with / or a URL'
    ),
  tags: z.array(z.string()).default([]),
});

export type BlogPostMetadata = z.infer<typeof blogPostSchema>;
