import { z } from 'zod';

const testimonialSchema = z.object({
  quote: z.string().min(1, 'Testimonial quote is required'),
  author: z.string().min(1, 'Testimonial author is required'),
  role: z.string().min(1, 'Author role is required'),
  company: z.string().min(1, 'Company name is required'),
});

const metricResultSchema = z.object({
  metric: z.string().min(1, 'Metric name is required'),
  before: z.string().min(1, 'Before value is required'),
  after: z.string().min(1, 'After value is required'),
  improvement: z.string().min(1, 'Improvement value is required'),
});

export const caseStudySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  client: z.string().min(1, 'Client name is required'),
  industry: z.enum(['Tour Operator', 'Travel Agency', 'Boutique Hotels', 'Other'], {
    message: 'Invalid industry type',
  }),
  metric: z.string().min(1, 'Primary metric is required'),
  metricValue: z.string().min(1, 'Metric value is required'),
  testimonial: testimonialSchema,
  results: z.array(metricResultSchema).min(1, 'At least one result metric required'),
  slug: z.string().min(1, 'Slug is required'),
  beforeWorkflow: z.string().optional(),
  afterWorkflow: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type CaseStudyMetadata = z.infer<typeof caseStudySchema>;
