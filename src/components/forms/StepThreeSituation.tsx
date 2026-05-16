import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { ApplicationFormData, SituationFieldName } from '../../types/application'

interface StepThreeSituationProps {
  onHelpMeWrite: (field: SituationFieldName, label: string) => void
  isGenerating: boolean
  apiError: string
}

export const StepThreeSituation = ({
  onHelpMeWrite,
  isGenerating,
  apiError,
}: StepThreeSituationProps) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  return (
    <Box className="form-grid-single-column">
      {apiError ? <Alert severity="error">{apiError}</Alert> : null}

      <div className="situation-block">
        <Typography className="situation-block-title" variant="subtitle1">
          {t('form.financialSituation')}
        </Typography>
        <div className="text-area-with-assist">
          <Controller
            name="financialSituation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                hiddenLabel
                placeholder={t('form.financialSituation')}
                inputProps={{ 'aria-label': t('form.financialSituation') }}
                multiline
                minRows={5}
                error={Boolean(errors.financialSituation)}
                helperText={errors.financialSituation?.message}
                fullWidth
              />
            )}
          />
          <Button
            className="situation-help-btn"
            onClick={() =>
              onHelpMeWrite('financialSituation', t('form.financialSituation'))
            }
            variant="outlined"
            disabled={isGenerating}
            startIcon={<AutoFixHighRoundedIcon fontSize="small" />}
            aria-label={`${t('form.helpMeWrite')} ${t('form.financialSituation')}`}
          >
            {t('form.helpMeWrite')}
          </Button>
        </div>
      </div>

      <div className="situation-block">
        <Typography className="situation-block-title" variant="subtitle1">
          {t('form.employmentCircumstances')}
        </Typography>
        <div className="text-area-with-assist">
          <Controller
            name="employmentCircumstances"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                hiddenLabel
                placeholder={t('form.employmentCircumstances')}
                inputProps={{ 'aria-label': t('form.employmentCircumstances') }}
                multiline
                minRows={5}
                error={Boolean(errors.employmentCircumstances)}
                helperText={errors.employmentCircumstances?.message}
                fullWidth
              />
            )}
          />
          <Button
            className="situation-help-btn"
            onClick={() =>
              onHelpMeWrite(
                'employmentCircumstances',
                t('form.employmentCircumstances'),
              )
            }
            variant="outlined"
            disabled={isGenerating}
            startIcon={<AutoFixHighRoundedIcon fontSize="small" />}
            aria-label={`${t('form.helpMeWrite')} ${t('form.employmentCircumstances')}`}
          >
            {t('form.helpMeWrite')}
          </Button>
        </div>
      </div>

      <div className="situation-block">
        <Typography className="situation-block-title" variant="subtitle1">
          {t('form.reasonForApplying')}
        </Typography>
        <div className="text-area-with-assist">
          <Controller
            name="reasonForApplying"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                hiddenLabel
                placeholder={t('form.reasonForApplying')}
                inputProps={{ 'aria-label': t('form.reasonForApplying') }}
                multiline
                minRows={5}
                error={Boolean(errors.reasonForApplying)}
                helperText={errors.reasonForApplying?.message}
                fullWidth
              />
            )}
          />
          <Button
            className="situation-help-btn"
            onClick={() => onHelpMeWrite('reasonForApplying', t('form.reasonForApplying'))}
            variant="outlined"
            disabled={isGenerating}
            startIcon={<AutoFixHighRoundedIcon fontSize="small" />}
            aria-label={`${t('form.helpMeWrite')} ${t('form.reasonForApplying')}`}
          >
            {t('form.helpMeWrite')}
          </Button>
        </div>
      </div>
    </Box>
  )
}
