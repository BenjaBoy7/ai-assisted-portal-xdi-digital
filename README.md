# AI-Assisted Social Support Application Portal

Premium React front-end case study for a government-grade social support application flow.

## Features

- 3-step guided wizard with step-by-step validation
- Personal, family/financial, and situation description sections
- AI writing assistant for sensitive textareas in step 3
- Suggestion modal with accept, edit, and discard actions
- User-friendly error handling for AI request failures
- Local progress save/restore using localStorage
- Mock submission with loading, success, and error states
- Internationalization with English and Arabic support
- RTL layout handling for Arabic
- Mobile-first responsive layout
- Accessibility basics: ARIA labels, keyboard access, and visible focus states

## Tech Stack

- React + TypeScript
- Vite
- Material UI
- React Hook Form + Zod
- i18next + react-i18next
- Axios
- React Router

## Project Structure

src/
- components/
- context/
- hooks/
- i18n/
- pages/
- routes/
- services/
- styles/
- types/
- utils/

## Prerequisites

- Node.js 22.13+ recommended
- npm 10+

## Install Dependencies

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Configure Environment Variables

Copy `.env.example` to `.env` and configure at least one option:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### Option A (Recommended): Secure Backend Proxy

Set `VITE_AI_PROXY_URL` to your backend endpoint that securely calls OpenAI:

```env
VITE_AI_PROXY_URL=https://your-backend.example.com/ai-assist
```

### Option B (Development only): Direct OpenAI from Frontend

Set `VITE_OPENAI_API_KEY`:

```env
VITE_OPENAI_API_KEY=your_openai_key
```

Important: Avoid exposing production API keys in frontend apps. Use backend proxy in real deployments.

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Architecture Notes

- Application form state is managed by a context provider.
- Form values are validated using Zod through React Hook Form.
- Wizard step progression is blocked until current step fields pass validation.
- localStorage persists both current step and form values.
- AI writing assistant flow:
  - User enters context in a textarea.
  - User clicks Help Me Write.
  - Frontend calls OpenAI endpoint via proxy or direct API.
  - Suggestion appears in modal for edit/accept/discard.

## Future Improvements

- Add backend integration for real submission APIs
- Add automated tests with React Testing Library
- Add field-level localization for validation messages
- Add autosave indicator timestamps and conflict handling
- Add analytics for wizard drop-off and accessibility events
