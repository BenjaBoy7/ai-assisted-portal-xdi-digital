export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say'

export type SituationFieldName =
  | 'financialSituation'
  | 'employmentCircumstances'
  | 'reasonForApplying'

export interface ApplicationFormData {
  fullName: string
  nationalId: string
  dateOfBirth: string
  gender: Gender
  address: string
  city: string
  state: string
  country: string
  phoneNumber: string
  emailAddress: string
  maritalStatus: string
  numberOfDependents: number | null
  employmentStatus: string
  monthlyIncome: number | null
  housingStatus: string
  financialSituation: string
  employmentCircumstances: string
  reasonForApplying: string
}

export interface SavedApplicationState {
  currentStep: number
  data: ApplicationFormData
}

export const APPLICATION_LOCAL_STORAGE_KEY = 'social-support-application-v1'

export const defaultApplicationFormData: ApplicationFormData = {
  fullName: '',
  nationalId: '',
  dateOfBirth: '',
  gender: 'prefer_not_to_say',
  address: '',
  city: '',
  state: '',
  country: '',
  phoneNumber: '',
  emailAddress: '',
  maritalStatus: '',
  numberOfDependents: null,
  employmentStatus: '',
  monthlyIncome: null,
  housingStatus: '',
  financialSituation: '',
  employmentCircumstances: '',
  reasonForApplying: '',
}
