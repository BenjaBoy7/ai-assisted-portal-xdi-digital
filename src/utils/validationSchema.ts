import { z } from 'zod'

import type { ApplicationFormData } from '../types/application'

const validPhoneRegex = /^\+?[0-9\s()-]{7,20}$/
const validNationalIdRegex = /^[A-Za-z0-9]{6,20}$/

const requiredNonNegativeNumber = (requiredMessage: string, invalidMessage: string) =>
  z
    .preprocess((value) => {
      if (value === '' || value === null || value === undefined) {
        return null
      }

      const asNumber = Number(value)
      return Number.isNaN(asNumber) ? null : asNumber
    }, z.number({ message: invalidMessage }).min(0, invalidMessage).nullable())
    .refine((value) => value !== null, requiredMessage)

export const applicationFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  nationalId: z
    .string()
    .regex(validNationalIdRegex, 'National ID must be 6-20 alphanumeric characters.'),
  dateOfBirth: z.string().min(1, 'Date of birth is required.'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  address: z.string().min(5, 'Address is required.'),
  city: z.string().min(2, 'City is required.'),
  state: z.string().min(2, 'State is required.'),
  country: z.string().min(2, 'Country is required.'),
  phoneNumber: z
    .string()
    .regex(validPhoneRegex, 'Please enter a valid phone number.'),
  emailAddress: z.string().email('Please enter a valid email address.'),
  maritalStatus: z.string().min(1, 'Marital status is required.'),
  numberOfDependents: requiredNonNegativeNumber(
    'Dependents is required.',
    'Dependents must be a whole number greater than or equal to 0.',
  ).refine((value) => Number.isInteger(value), 'Dependents must be a whole number.'),
  employmentStatus: z.string().min(1, 'Employment status is required.'),
  monthlyIncome: requiredNonNegativeNumber(
    'Monthly income is required.',
    'Monthly income must be a number greater than or equal to 0.',
  ),
  housingStatus: z.string().min(1, 'Housing status is required.'),
  financialSituation: z
    .string()
    .trim()
    .min(20, 'Please provide more detail (at least 20 characters).'),
  employmentCircumstances: z
    .string()
    .trim()
    .min(20, 'Please provide more detail (at least 20 characters).'),
  reasonForApplying: z
    .string()
    .trim()
    .min(20, 'Please provide more detail (at least 20 characters).'),
})

export const stepFieldNames = {
  0: [
    'fullName',
    'nationalId',
    'dateOfBirth',
    'gender',
    'address',
    'city',
    'state',
    'country',
    'phoneNumber',
    'emailAddress',
  ],
  1: [
    'maritalStatus',
    'numberOfDependents',
    'employmentStatus',
    'monthlyIncome',
    'housingStatus',
  ],
  2: ['financialSituation', 'employmentCircumstances', 'reasonForApplying'],
} as const

type SchemaData = z.infer<typeof applicationFormSchema>
const _typeCheck: ApplicationFormData = {} as SchemaData
void _typeCheck
