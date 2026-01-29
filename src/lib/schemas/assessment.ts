import { z } from 'zod'

export const assessmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  businessType: z.enum(['tour_operator', 'travel_agency', 'boutique_hotel', 'other'], {
    message: 'Please select your business type',
  }),
  currentChallenges: z.string().min(20, 'Please describe your challenges (at least 20 characters)'),
  monthlyInquiries: z.enum(['under_100', '100_500', '500_1000', 'over_1000'], {
    message: 'Please select monthly inquiry volume',
  }).optional(),
})

export type AssessmentFormData = z.infer<typeof assessmentSchema>
