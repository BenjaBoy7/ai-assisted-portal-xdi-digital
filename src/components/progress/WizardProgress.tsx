import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface WizardProgressProps {
  currentStep: number
  onStepClick?: (step: number) => void
}

const steps = [
  { label: 'steps.personal', icon: <BadgeOutlinedIcon fontSize="small" /> },
  { label: 'steps.family', icon: <Groups2OutlinedIcon fontSize="small" /> },
  { label: 'steps.situation', icon: <DescriptionOutlinedIcon fontSize="small" /> },
] as const

export const WizardProgress = ({ currentStep, onStepClick }: WizardProgressProps) => {
  const { t } = useTranslation()
  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <Box className="wizard-progress" aria-label={t('common.portalTitle')}>
      <Box className="wizard-progress-header wizard-steps-track">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <Box
              component="button"
              type="button"
              key={step.label}
              className={`wizard-step ${isActive ? 'wizard-step-active' : ''} ${isCompleted ? 'wizard-step-completed' : ''}`}
              onClick={() => onStepClick?.(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onStepClick?.(index)
                }
              }}
              aria-current={isActive ? 'step' : undefined}
              aria-label={`Go to ${t(step.label)}`}
            >
              <span className="wizard-step-circle" aria-hidden>
                <span className="wizard-step-number">{index + 1}</span>
                <span className="wizard-step-icon">{step.icon}</span>
              </span>
              <span className="wizard-step-label">{t(step.label)}</span>
            </Box>
          )
        })}
      </Box>

      <Box className="wizard-progress-rail" role="presentation">
        <Box className="wizard-progress-fill" style={{ width: `${progressPercentage}%` }} />
      </Box>

      <Typography variant="body2" color="text.secondary" mt={1} className="wizard-step-count">
        {`${currentStep + 1} / ${steps.length}`}
      </Typography>
    </Box>
  )
}
