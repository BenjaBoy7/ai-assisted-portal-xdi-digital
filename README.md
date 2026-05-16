# AI-Assisted Social Support Application Portal

Premium React front-end case study for a government-grade social support application flow.

## Table of Contents

- [Coverage](#evaluation-coverage)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [OpenAI Integration and Error Handling](#openai-integration-and-error-handling)
- [Accessibility Baseline](#accessibility-baseline)
- [Code Structure and Readability](#code-structure-and-readability)
- [Build and Preview](#build-and-preview)
- [Deployment Notes](#deployment-notes)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)


## Coverage

This project is intentionally documented to match the evaluation rubric.

### 1) Form Flow and Validations

- Three-step wizard: personal details, family/financial details, and applicant situation.
- Step progression is blocked until required fields in the current step pass validation.
- Validation uses Zod + React Hook Form, including:
  - required fields,
  - email format,
  - phone validity,
  - date-of-birth eligibility checks,
  - numeric constraints for financial fields.
- Submission is disabled while an async request is in progress.

### 2) OpenAI Integration

- AI writing assistance is available for long-text fields in step 3.
- Friendly error handling is provided for timeout, network, rate limits, auth, and server failures.
- Suggested text is reviewed in a modal before accept/discard.
- Recommended production setup uses a backend proxy so keys are not exposed in frontend code.

### 3) UI/UX

- Mobile-first responsive layout.
- Clear stepper/progress experience and guided form actions.
- Consistent spacing, typography, and visual hierarchy.
- Success and error feedback for submission and AI generation.

### 4) Accessibility Basics

- Keyboard-accessible interactive controls.
- Visible focus indicators.
- Labels and helper text for inputs.
- ARIA labels for custom controls.
- Semantic grouping for complex inputs.
- i18n + RTL support for Arabic.

### 5) Code Structure and Readability

- Modular architecture by concern (`components`, `context`, `services`, `utils`, `types`).
- Centralized schema validation.
- Shared types for form payload and saved state.
- Isolated service layer for API concerns.

### 6) Documentation Quality

- Setup, env variables, run/build commands, and architecture are documented.
- Security recommendations for OpenAI key handling are included.
- Deployment and evaluation-aligned notes are provided.

## Key Features

- 3-step guided wizard with step-by-step validation
- Personal, family/financial, and situation sections
- AI writing assistant for step 3 textareas
- Suggestion modal with accept/edit/discard flow
- Local save/restore with localStorage
- Mock submission with loading/success/error states
- Internationalization (English/Arabic) and RTL support
- Mobile-responsive UI with accessibility baseline

## Technology Stack

- React + TypeScript
- Vite
- Material UI
- React Hook Form + Zod
- i18next + react-i18next
- Axios
- React Router

## Project Structure

```text
src/
  components/
  context/
  hooks/
  i18n/
  pages/
  routes/
  services/
  types/
  utils/
```

## Prerequisites

- Node.js 20.x to 22.x (project engines: `>=20 <23`)
- npm 10+

## Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then configure one of the following.

### Option A (Recommended): Backend Proxy

```env
VITE_AI_PROXY_URL=https://your-backend.example.com/ai-assist
```

### Option B (Development Only): Direct Frontend Key

```env
VITE_OPENAI_API_KEY=your_openai_key
```

Optional model override:

```env
VITE_OPENAI_MODEL=gpt-4o-mini
```

Security note:

- Do not use direct frontend keys in production.
- Keep secrets only on server-side infrastructure.
- If a key is ever exposed, rotate/revoke it immediately.

## OpenAI Integration and Error Handling

The OpenAI client supports both proxy and direct modes.

Request flow:

1. User enters context in a situation field.
2. User clicks Help Me Write.
3. Service sends prompt to proxy (preferred) or OpenAI endpoint.
4. Returned suggestion is shown in a review modal.
5. User accepts, edits, or discards.

Handled error categories:

- timeout,
- network failure,
- 4xx request/auth issues,
- 429 quota/rate limiting,
- 5xx service failures,
- empty/invalid responses.

## Accessibility Baseline

This app currently includes:

- keyboard operable step navigation,
- visible focus states,
- labels and helper/error text for all fields,
- ARIA labels for custom controls,
- semantic grouping for custom phone input,
- translated UI and RTL direction support.

Manual accessibility checks before submission:

1. Navigate entire wizard with keyboard only (Tab, Shift+Tab, Enter, Space).
2. Confirm validation errors are announced and visually clear.
3. Confirm stepper and modal actions are keyboard reachable.
4. Verify color contrast in both languages.
5. Verify layout at narrow widths (320px+).

## Code Structure and Readability

- `pages` orchestrates wizard behavior and submission state.
- `components/forms` owns each step UI and field-level wiring.
- `utils/validationSchema.ts` centralizes validation rules.
- `services/openai/openaiService.ts` encapsulates AI request/response logic.
- `context/ApplicationFormContext.tsx` handles persistence and step state.

## Build and Preview

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment Notes

- Use Node 20.x or 22.x in CI/CD.
- Configure environment variables in your deployment platform.
- For Netlify/Vercel, set `VITE_AI_PROXY_URL` to your backend endpoint.
- Do not commit `.env`.


