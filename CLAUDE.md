# Handover: notes for Claude

Handover is a training app for beginner techno DJs: an AI coach teaches transition styles step by step, scores them from the DJ's Pioneer DDJ-FLX4 over Web MIDI, and lets the DJ practise back-to-back (B2B) against an AI partner. Owner: Mert (MSc Ingenieurinformatik, Jade Hochschule). He writes in Turkish; answer in Turkish unless he writes in another language.

## Where things are

- `index.html` + `src/ui/` – clickable prototype of the five designed screens, sample data, no build. One file per screen in `src/ui/screens/`; hash routes (`#/ders`, `#/drill`, …). Serve with `tools/serve.ps1` (http://localhost:5173); Node is not installed.
- `legacy/index.html` – v0 prototype, live as a claude.ai artifact: set planner, prep coach, random B2B partner. Single file, no build, TR/EN/DE. No new features (DECISIONS).
- `design/` – screen designs (Design canvas exports). They need the canvas runtime; read them as reference, do not serve them.
- `docs/VISION.md` – what we are building and why.
- `docs/ARCHITECTURE.md` – the technical system and build order.
- `docs/REQUIREMENTS.md` – requirement list (master copy). Keep the Sheets tracker in sync when it changes.
- `docs/RESEARCH.md` – market and data-source research with sources.
- `docs/DECISIONS.md` – decision log. Add a dated line for every product or technical decision.
- `docs/REVIEW.md` – latest system review and open problems.
- `supabase/migrations/` – database schema. The Supabase project `gecis` is paused; the schema must be redesigned before it is reactivated (see REVIEW).

## Rules

- Audio never leaves the user's device. No copyrighted music on any server.
- No secrets in the repo. The Supabase publishable key may go in client code; nothing else.
- Repo is private, no license: all rights reserved.
- Desktop Chrome/Edge is the target for anything that uses the FLX4; phones are for planning only.
- Prefer measurable scoring (MIDI + beat grid) over guessing; every score must be explainable in one sentence.
- Small, focused commits on `main`; update DECISIONS.md and REQUIREMENTS.md in the same commit when they change.
