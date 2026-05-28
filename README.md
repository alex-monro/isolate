# isolate

AI-powered audio stem separator. Upload any track and split it into vocals, drums, bass, and melody as separate downloadable files.

**Live demo:** [tryisolate.xyz](https://tryisolate.xyz/)

![isolate banner](public/stem-selection.png)

## What it does

Drop in an MP3, WAV, or FLAC file (up to 50 MB, 7 minutes). Pick which stems you want extracted, and isolate runs your audio through the Demucs model on Replicate to give you clean, separated tracks ready to download.

## Why I built it

As a music producer, I wanted a simple tool to split stems. No upsell, no sign-up wall, no paywall. Just drag, drop, wait a few minutes, boom. I wanted a personal, highest quality stem splitter for myself and friends that works better than the ones built into DAWs.

## Tech stack

- **Next.js 15** with the App Router and Route Handlers
- **TypeScript** for type safety across the stack
- **Tailwind CSS** for styling
- **Zod** for runtime validation on the server
- **Replicate API** for the Demucs audio separation model
- **Vercel** for deployment

## Features

- Drag and drop or click-to-upload audio files
- Client-side validation for instant feedback (file type, size, duration)
- Server-side Zod validation as the security boundary
- Custom toast notifications for error messages
- Audio preview player before processing
- Selective stem extraction (pick only what you need)
- Responsive design that works on mobile and desktop

## What I learned

This project taught me the difference between "it works" and "it's production-ready":

- **TypeScript is not enough.** It checks types at build time but disappears at runtime. Zod fills that gap by validating real data from real users.
- **Client and server validation serve different purposes.** Client is for UX, server is for security. You need both.
- **Middleware is not a security boundary.** Auth and validation belong inside route handlers, not in middleware that can be bypassed.
- **Environment variables behave differently at build time vs runtime.** Moving checks inside request handlers prevents build failures while still catching misconfiguration.
- **Memory cleanup matters.** Creating object URLs without revoking them leaks memory in long-running sessions.

## Running locally

```bash
git clone https://github.com/alex-monro/isolate..git
cd isolate.
npm install
```

Create a `.env.local` file with your Replicate API token:

```
REPLICATE_API_TOKEN=your_token_here
```

Then start the dev server:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

## Project structure

```
app/
  api/process/       Route handler for the Replicate API call
  how-it-works/      Static info page
  page.tsx           Main upload and processing UI
components/          Reusable UI components (UploadZone, StemSelector, etc.)
lib/
  validation.ts      Zod schemas for server-side validation
```

## What's next

- Rate limiting to protect the API budget
- User accounts and history of past splits
- Longer file support with background job processing
- Waveform visualization during playback
