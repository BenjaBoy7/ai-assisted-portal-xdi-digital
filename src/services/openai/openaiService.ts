import axios from 'axios'

interface WritingAssistanceInput {
  prompt: string
  fieldLabel: string
  language: string
}

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

const toFriendlyError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'The request timed out. Please try again.'
    }

    if (!error.response) {
      return 'Network issue detected. Check your connection and retry.'
    }

    if (error.response.status >= 500) {
      return 'AI service is temporarily unavailable. Please try later.'
    }

    if (error.response.status === 401 || error.response.status === 403) {
      return 'AI service authorization failed. Please contact support.'
    }

    return 'AI request could not be completed.'
  }

  return 'Unexpected error while generating suggestion.'
}

export const getWritingAssistance = async ({
  prompt,
  fieldLabel,
  language,
}: WritingAssistanceInput) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined
  const proxyUrl = import.meta.env.VITE_AI_PROXY_URL as string | undefined

  if (!prompt.trim()) {
    throw new Error('Please provide some context before requesting help.')
  }

  try {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            language === 'ar'
              ? 'اكتب بلغة رسمية متعاطفة وواضحة تناسب طلب دعم اجتماعي حكومي.'
              : 'Write in a formal, empathetic, clear tone suitable for a government social support request.',
        },
        {
          role: 'user',
          content: `Help me draft ${fieldLabel}. Context: ${prompt}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 260,
    }

    const response = await axios.post(
      proxyUrl || OPENAI_URL,
      payload,
      proxyUrl
        ? {
            timeout: 15000,
          }
        : {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            timeout: 15000,
          },
    )

    const suggestion = response.data?.choices?.[0]?.message?.content?.trim()

    if (!suggestion) {
      throw new Error('AI returned an empty response. Please try again.')
    }

    return suggestion
  } catch (error) {
    if (!proxyUrl && !apiKey) {
      throw new Error(
        'OpenAI key is missing. Configure VITE_OPENAI_API_KEY or set VITE_AI_PROXY_URL.',
      )
    }

    throw new Error(toFriendlyError(error))
  }
}
