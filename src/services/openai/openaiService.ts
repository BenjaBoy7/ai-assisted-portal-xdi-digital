import axios from 'axios'

interface WritingAssistanceInput {
  prompt: string
  fieldLabel: string
  language: string
}

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const DEFAULT_MODEL = 'gpt-4o-mini'

const toFriendlyError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const apiMessage =
      (error.response?.data as { error?: { message?: string } } | undefined)
        ?.error?.message || undefined

    if (error.code === 'ECONNABORTED') {
      return 'The request timed out. Please try again.'
    }

    if (!error.response) {
      return 'Network issue detected. Check your connection and retry.'
    }

    if (status && status >= 500) {
      return 'AI service is temporarily unavailable. Please try later.'
    }

    if (status === 401 || status === 403) {
      return 'AI service authorization failed. Please contact support.'
    }

    if (status === 429) {
      return 'AI usage limit reached. Please check your OpenAI billing/quota and retry.'
    }

    if (status === 404) {
      return (
        apiMessage ||
        'AI endpoint or model was not found. Verify the configured model and API URL.'
      )
    }

    if (status === 400) {
      return apiMessage || 'AI request is invalid. Please review request settings and retry.'
    }

    if (apiMessage) {
      return apiMessage
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
  const model =
    (import.meta.env.VITE_OPENAI_MODEL as string | undefined)?.trim() ||
    DEFAULT_MODEL

  if (!prompt.trim()) {
    throw new Error('Please provide some context before requesting help.')
  }

  try {
    const payload = {
      model,
      messages: [
        {
          role: 'system',
          content:
            language === 'ar'
              ? 'اكتب فقرة وصفية فقط بلغة رسمية متعاطفة وواضحة تناسب طلب دعم اجتماعي حكومي. لا تكتب رسالة أو بريد إلكتروني. لا تستخدم: الموضوع، عزيزي/السادة، العنوان، معلومات الاتصال، التحية، الخاتمة، التوقيع، أو نقاط تعداد.'
              : 'Write only a plain descriptive paragraph in a formal, empathetic, and clear tone suitable for a government social support request. Do not write a letter or email. Do not include subject lines, greetings, addresses, contact information, closings, signatures, or bullet points.',
        },
        {
          role: 'user',
          content: `Write a description-only draft for ${fieldLabel}. Use only the provided context and output a single paragraph. Context: ${prompt}`,
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
