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

export const StepOnePersonalInfo = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  return (
    <Box className="form-grid-two-columns">
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.fullName')}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="nationalId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.nationalId')}
            error={Boolean(errors.nationalId)}
            helperText={errors.nationalId?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label={t('form.dateOfBirth')}
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.dateOfBirth)}
            helperText={errors.dateOfBirth?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={Boolean(errors.gender)}>
            <InputLabel id="gender-label">{t('form.gender')}</InputLabel>
            <Select
              {...field}
              labelId="gender-label"
              id="gender"
              label={t('form.gender')}
            >
              <MenuItem value="male">{t('options.male')}</MenuItem>
              <MenuItem value="female">{t('options.female')}</MenuItem>
              <MenuItem value="other">{t('options.other')}</MenuItem>
              <MenuItem value="prefer_not_to_say">
                {t('options.prefer_not_to_say')}
              </MenuItem>
            </Select>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.address')}
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.city')}
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.state')}
            error={Boolean(errors.state)}
            helperText={errors.state?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.country')}
            error={Boolean(errors.country)}
            helperText={errors.country?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.phoneNumber')}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="emailAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('form.emailAddress')}
            error={Boolean(errors.emailAddress)}
            helperText={errors.emailAddress?.message}
            fullWidth
          />
        )}
      />
    </Box>
  )
}
