import { FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const PortalShell = ({ children }: { children: React.ReactNode }) => {
  const { i18n, t } = useTranslation()

  return (
    <div className="app-page-bg">
      <Paper className="portal-shell" elevation={0}>
        <header className="portal-header">
          <div>
            <p className="eyebrow">Government Services</p>
            <h1>{t('common.portalTitle')}</h1>
          </div>

          <FormControl size="small" className="language-switcher">
            <InputLabel id="language-label">{t('common.language')}</InputLabel>
            <Select
              labelId="language-label"
              id="language"
              value={i18n.language}
              label={t('common.language')}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              inputProps={{ 'aria-label': t('common.language') }}
            >
              <MenuItem value="en">{t('common.english')}</MenuItem>
              <MenuItem value="ar">{t('common.arabic')}</MenuItem>
            </Select>
          </FormControl>
        </header>

        <p className="save-notice">{t('common.saveNotice')}</p>

        {children}
      </Paper>
    </div>
  )
}
