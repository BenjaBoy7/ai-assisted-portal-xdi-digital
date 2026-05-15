import type { ApplicationFormData } from '../../types/application'

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), ms)
  })

export const submitApplication = async (_payload: ApplicationFormData) => {
  await delay(1800)

  if (Math.random() < 0.2) {
    throw new Error('Mock submission failed.')
  }

  return { status: 'ok' }
}
