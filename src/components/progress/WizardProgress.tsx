import { Box, Chip, LinearProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface WizardProgressProps {
  currentStep: number
}

const stepLabels = ['steps.personal', 'steps.family', 'steps.situation']

export const WizardProgress = ({ currentStep }: WizardProgressProps) => {
  const { t } = useTranslation()

  return (
    <Box className="wizard-progress" aria-label="Application progress">
      <Box className="wizard-progress-header">
        {stepLabels.map((label, index) => (
          <Chip
            key={label}
            label={`${index + 1}. ${t(label)}`}
            className={index === currentStep ? 'step-chip-active' : 'step-chip'}
            color={index === currentStep ? 'primary' : 'default'}
            variant={index === currentStep ? 'filled' : 'outlined'}
          />
        ))}
      </Box>

      <LinearProgress
        variant="determinate"
        value={((currentStep + 1) / stepLabels.length) * 100}
        sx={{ height: 10, borderRadius: 12 }}
      />

      <Typography variant="body2" color="text.secondary" mt={1}>
        {`Step ${currentStep + 1} of ${stepLabels.length}`}
      </Typography>
    </Box>
  )
}
