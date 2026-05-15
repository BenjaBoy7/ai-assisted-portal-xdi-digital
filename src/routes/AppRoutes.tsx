import { Navigate, Route, Routes } from 'react-router-dom'

import { ApplicationWizardPage } from '../pages/ApplicationWizardPage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplicationWizardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
