# Project memory

## Product intent & audience

- Next.js web app with a public-facing site and an admin section
- Features: home page, admin dashboard, admin login, public "cek-status" page, and a floating chat widget on the home page
- End-users can check status and chat with an AI assistant; admins manage content/data

## Brand personality & voice

- User communicates in Bahasa Indonesia; assistant responses in Indonesian
- Tone: helpful and direct

## Visual design & UX direction

- ChatWidget: floating chat bubble at bottom-left; WhatsApp button stays at bottom-right
- Chat UI includes quick-start question buttons, typing indicator, and theme-consistent styling
- Component-based layout; reusable widgets mounted per page as needed

## Decisions, constraints & rationale

- Framework: Next.js
- Chat API route at `src/app/api/chat/route.ts` — hardcoded default n8n webhook URL (`https://n8n-mhibh3zdycgy.eu7.sumopod.my.id/webhook/psa-chat-webhook/chat`) so no `.env.local` is required for chat to work
- API forwards user messages to n8n and returns the reply; includes 30-second timeout and error handling
- ChatWidget component at `src/components/ChatWidget.tsx`; mounted in `src/app/page.tsx`
- Known routes/pages: home, admin, admin login, cek-status, `/api/chat`
- Build succeeds without errors; dev server runs automatically

## Open questions & assumptions

- Whether the n8n webhook URL should become env-configurable later
- "cek-status" purpose still assumed a public status-checking feature — needs confirmation
- Admin authentication mechanism and protected routes not yet detailed
- Database/backend/data source for status data unknown
- Deployment target unknown
- Visual design system, styling approach, and component library still not formally established