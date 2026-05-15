import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AiSuggestionModalProps {
  open: boolean
  suggestion: string
  onAccept: (value: string) => void
  onDiscard: () => void
}

export const AiSuggestionModal = ({
  open,
  suggestion,
  onAccept,
  onDiscard,
}: AiSuggestionModalProps) => {
  const { t } = useTranslation()
  const [editedSuggestion, setEditedSuggestion] = useState(suggestion)

  useEffect(() => {
    setEditedSuggestion(suggestion)
  }, [suggestion])

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={onDiscard}>
      <DialogTitle>{t('ai.modalTitle')}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {t('ai.modalDescription')}
        </Typography>

        <TextField
          autoFocus
          multiline
          minRows={7}
          fullWidth
          value={editedSuggestion}
          onChange={(event) => setEditedSuggestion(event.target.value)}
          inputProps={{ 'aria-label': t('ai.modalTitle') }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onDiscard}>
          {t('ai.discard')}
        </Button>
        <Button
          variant="contained"
          onClick={() => onAccept(editedSuggestion)}
          disabled={!editedSuggestion.trim()}
        >
          {t('ai.accept')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
