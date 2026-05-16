import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm, type Resolver } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { StepOnePersonalInfo } from '../components/forms/StepOnePersonalInfo'
import { StepThreeSituation } from '../components/forms/StepThreeSituation'
import { StepTwoFamilyFinancial } from '../components/forms/StepTwoFamilyFinancial'
import { PortalShell } from '../components/layout/PortalShell'
import { AiSuggestionModal } from '../components/modals/AiSuggestionModal'
import { WizardProgress } from '../components/progress/WizardProgress'
import { useApplicationFormContext } from '../context/ApplicationFormContext'
import { useDocumentDirection } from '../hooks/useDocumentDirection'
import { submitApplication } from '../services/api/mockSubmission'
import { getWritingAssistance } from '../services/openai/openaiService'
import type { ApplicationFormData, SituationFieldName } from '../types/application'
import { defaultApplicationFormData } from '../types/application'
import { applicationFormSchema, stepFieldNames } from '../utils/validationSchema'

const stepTitles = ['steps.personal', 'steps.family', 'steps.situation'] as const
type StepIndex = 0 | 1 | 2

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

interface ActiveAiRequest {
  field: SituationFieldName
  label: string
}

export const ApplicationWizardPage = () => {
  const { t, i18n } = useTranslation()
  const { data, currentStep, setCurrentStep, mergeData, resetAll } =
    useApplicationFormContext()

  useDocumentDirection(i18n.language)

  const formMethods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema) as Resolver<ApplicationFormData>,
    defaultValues: data,
    mode: 'onTouched',
  })

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle')
  const [submissionMessageOpen, setSubmissionMessageOpen] = useState(false)
  const [aiRequest, setAiRequest] = useState<ActiveAiRequest | null>(null)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const activeStep = Math.min(Math.max(currentStep, 0), 2) as StepIndex

  useEffect(() => {
    const subscription = formMethods.watch((values) => {
      mergeData(values as Partial<ApplicationFormData>)
    })

    return () => subscription.unsubscribe()
  }, [formMethods, mergeData])

  const stepTitle = useMemo(() => t(stepTitles[activeStep]), [activeStep, t])

  const handleNext = async () => {
    const isValid = await formMethods.trigger(stepFieldNames[activeStep], {
      shouldFocus: true,
    })

    if (!isValid) {
      return
    }

    setCurrentStep(Math.min(activeStep + 1, 2))
  }

  const handlePrevious = () => {
    setCurrentStep(Math.max(activeStep - 1, 0))
  }

  const handleStepSelect = (step: number) => {
    const boundedStep = Math.min(Math.max(step, 0), 2)
    setCurrentStep(boundedStep)
  }

  const closeAiModal = () => {
    setAiModalOpen(false)
    setAiSuggestion('')
    setAiRequest(null)
  }

  const requestWritingHelp = async (field: SituationFieldName, label: string) => {
    const currentValue = formMethods.getValues(field)

    if (!currentValue.trim()) {
      setAiError('Please provide a few details first, then request assistance.')
      return
    }

    setAiError('')
    setAiLoading(true)
    setAiRequest({ field, label })

    try {
      const suggestion = await getWritingAssistance({
        prompt: currentValue,
        fieldLabel: label,
        language: i18n.language,
      })

      setAiSuggestion(suggestion)
      setAiModalOpen(true)
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'Unknown AI error')
    } finally {
      setAiLoading(false)
    }
  }

  const acceptAiSuggestion = (nextValue: string) => {
    if (!aiRequest) {
      return
    }

    formMethods.setValue(aiRequest.field, nextValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

    closeAiModal()
  }

  const onSubmit = formMethods.handleSubmit(async (values) => {
    setSubmissionStatus('loading')

    try {
      await submitApplication(values)
      setSubmissionStatus('success')
      setSubmissionMessageOpen(true)
    } catch {
      setSubmissionStatus('error')
      setSubmissionMessageOpen(true)
    }
  })

  const startNewApplication = () => {
    formMethods.reset(defaultApplicationFormData)
    resetAll()
    setSubmissionStatus('idle')
    setCurrentStep(0)
  }

  return (
    <PortalShell>
      <WizardProgress currentStep={currentStep} onStepClick={handleStepSelect} />

      <Paper className="form-card" elevation={0}>
        {submissionStatus === 'success' ? (
          <Box className="submission-success-panel">
            <Alert
              severity="success"
              sx={{ width: '100%' }}
              action={
                <Button color="inherit" size="small" onClick={startNewApplication}>
                  {t('submission.restart')}
                </Button>
              }
            >
              <strong>{t('submission.successTitle')}</strong>
              <div>{t('submission.successBody')}</div>
            </Alert>
          </Box>
        ) : (
          <>
            <Typography variant="h5" className="step-title">
              {stepTitle}
            </Typography>

            <FormProvider {...formMethods}>
              <form onSubmit={onSubmit} noValidate>
                {activeStep === 0 ? <StepOnePersonalInfo /> : null}
                {activeStep === 1 ? <StepTwoFamilyFinancial /> : null}
                {activeStep === 2 ? (
                  <StepThreeSituation
                    onHelpMeWrite={requestWritingHelp}
                    isGenerating={aiLoading}
                    apiError={aiError}
                  />
                ) : null}

                <Box className="wizard-controls">
                  <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    disabled={activeStep === 0 || submissionStatus === 'loading'}
                  >
                    {t('form.previous')}
                  </Button>

                  {activeStep < 2 ? (
                    <Button variant="contained" onClick={handleNext}>
                      {t('form.next')}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submissionStatus === 'loading'}
                      startIcon={
                        submissionStatus === 'loading' ? (
                          <CircularProgress color="inherit" size={18} />
                        ) : undefined
                      }
                    >
                      {submissionStatus === 'loading'
                        ? t('form.submitting')
                        : t('form.submit')}
                    </Button>
                  )}
                </Box>
              </form>
            </FormProvider>
          </>
        )}
      </Paper>

      <AiSuggestionModal
        open={aiModalOpen}
        suggestion={aiSuggestion}
        onAccept={acceptAiSuggestion}
        onDiscard={closeAiModal}
      />

      <Snackbar
        open={submissionMessageOpen && submissionStatus === 'error'}
        autoHideDuration={5000}
        onClose={() => setSubmissionMessageOpen(false)}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {t('submission.error')}
        </Alert>
      </Snackbar>
    </PortalShell>
  )
}
