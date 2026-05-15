import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import {
  APPLICATION_LOCAL_STORAGE_KEY,
  defaultApplicationFormData,
  type ApplicationFormData,
  type SavedApplicationState,
} from '../types/application'

interface ApplicationFormContextValue {
  data: ApplicationFormData
  currentStep: number
  setCurrentStep: (step: number) => void
  mergeData: (nextData: Partial<ApplicationFormData>) => void
  resetAll: () => void
}

const ApplicationFormContext = createContext<ApplicationFormContextValue | null>(null)

const readSavedState = (): SavedApplicationState | null => {
  try {
    const saved = window.localStorage.getItem(APPLICATION_LOCAL_STORAGE_KEY)

    if (!saved) {
      return null
    }

    return JSON.parse(saved) as SavedApplicationState
  } catch {
    return null
  }
}

const writeSavedState = (savedState: SavedApplicationState) => {
  window.localStorage.setItem(
    APPLICATION_LOCAL_STORAGE_KEY,
    JSON.stringify(savedState),
  )
}

export const ApplicationFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const savedState = readSavedState()

  const [data, setData] = useState<ApplicationFormData>(
    savedState?.data ?? defaultApplicationFormData,
  )
  const [currentStep, setCurrentStepState] = useState(savedState?.currentStep ?? 0)

  const setCurrentStep = useCallback(
    (step: number) => {
      setCurrentStepState(step)
      writeSavedState({ data, currentStep: step })
    },
    [data],
  )

  const mergeData = useCallback(
    (nextData: Partial<ApplicationFormData>) => {
      setData((previous) => {
        const merged = { ...previous, ...nextData }
        writeSavedState({ data: merged, currentStep })
        return merged
      })
    },
    [currentStep],
  )

  const resetAll = useCallback(() => {
    setData(defaultApplicationFormData)
    setCurrentStepState(0)
    window.localStorage.removeItem(APPLICATION_LOCAL_STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({ data, currentStep, setCurrentStep, mergeData, resetAll }),
    [data, currentStep, setCurrentStep, mergeData, resetAll],
  )

  return (
    <ApplicationFormContext.Provider value={value}>
      {children}
    </ApplicationFormContext.Provider>
  )
}

export const useApplicationFormContext = () => {
  const context = useContext(ApplicationFormContext)

  if (!context) {
    throw new Error(
      'useApplicationFormContext must be used inside ApplicationFormProvider.',
    )
  }

  return context
}
