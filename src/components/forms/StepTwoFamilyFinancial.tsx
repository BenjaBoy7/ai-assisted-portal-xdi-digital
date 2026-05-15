import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { ApplicationFormData } from '../../types/application'

export const StepTwoFamilyFinancial = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  return (
    <Box className="form-grid-two-columns">
      <Controller
        name="maritalStatus"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.maritalStatus)}>
            <InputLabel id="marital-status-label">
              {t('form.maritalStatus')}
            </InputLabel>
            <Select
              {...field}
              labelId="marital-status-label"
              id="maritalStatus"
              label={t('form.maritalStatus')}
            >
              <MenuItem value="single">{t('options.single')}</MenuItem>
              <MenuItem value="married">{t('options.married')}</MenuItem>
              <MenuItem value="divorced">{t('options.divorced')}</MenuItem>
              <MenuItem value="widowed">{t('options.widowed')}</MenuItem>
            </Select>
            <FormHelperText>{errors.maritalStatus?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="numberOfDependents"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label={t('form.numberOfDependents')}
            onChange={(event) => field.onChange(event.target.value)}
            error={Boolean(errors.numberOfDependents)}
            helperText={errors.numberOfDependents?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="employmentStatus"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.employmentStatus)}>
            <InputLabel id="employment-status-label">
              {t('form.employmentStatus')}
            </InputLabel>
            <Select
              {...field}
              labelId="employment-status-label"
              id="employmentStatus"
              label={t('form.employmentStatus')}
            >
              <MenuItem value="employed">{t('options.employed')}</MenuItem>
              <MenuItem value="unemployed">{t('options.unemployed')}</MenuItem>
              <MenuItem value="selfEmployed">{t('options.selfEmployed')}</MenuItem>
              <MenuItem value="student">{t('options.student')}</MenuItem>
              <MenuItem value="retired">{t('options.retired')}</MenuItem>
            </Select>
            <FormHelperText>{errors.employmentStatus?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="monthlyIncome"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label={t('form.monthlyIncome')}
            onChange={(event) => field.onChange(event.target.value)}
            error={Boolean(errors.monthlyIncome)}
            helperText={errors.monthlyIncome?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="housingStatus"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.housingStatus)}>
            <InputLabel id="housing-status-label">
              {t('form.housingStatus')}
            </InputLabel>
            <Select
              {...field}
              labelId="housing-status-label"
              id="housingStatus"
              label={t('form.housingStatus')}
            >
              <MenuItem value="owner">{t('options.owner')}</MenuItem>
              <MenuItem value="renter">{t('options.renter')}</MenuItem>
              <MenuItem value="shared">{t('options.shared')}</MenuItem>
              <MenuItem value="homeless">{t('options.homeless')}</MenuItem>
            </Select>
            <FormHelperText>{errors.housingStatus?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  )
}
