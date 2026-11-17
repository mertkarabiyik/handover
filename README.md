# Handover

**Get ready for your first house party.**

Handover is a prep coach for beginner DJs. It helps you plan a set, see which transitions will be hard before you play them, rehearse those transitions, and practise reacting to another DJ in a back-to-back (B2B).

## What it does

**Set**
- Add tracks with title, artist, BPM, Camelot key, energy (1–10) and length. A tap-tempo button finds the BPM if you don't know it.
- Every transition is rated **Clean**, **Careful** or **Hard**, with the reason: BPM difference (including half- and double-time), key relation on the Camelot wheel, and sharp energy jumps.
- The crate is ranked by how well each track follows the last track of the set.
- Auto-arrange orders the set to start low, peak around three quarters in and ease off at the end. Every bulk change can be undone.
- Energy curve and summary: track count, total length, BPM range, transitions per level.
- Copy the set list as plain text.

**Prep**
- Set a goal: date, set length and occasion (house party, event, open decks). A countdown and three readiness bars show how far along you are.
- Careful and Hard transitions from your set land in a practice list automatically. Rehearse them on your controller and log *nailed it* or *missed*.
- A pre-party checklist covers files, backup tracks, cables and the set list.

**B2B practice**
- A virtual partner plays a track from your library; you pick what comes next from six options.
- Right after you choose, you see how clean the transition is and, if there was a better option in your crate, which one and why.
- Optional 20-second time limit and a round summary.

Interface languages: Turkish, English and German. The browser language is picked on first visit and can be changed from the menu.

## How it is built

A single self-contained file, `index.html`: HTML, CSS and plain JavaScript with no build step and no dependencies apart from Google Fonts. Data is stored in the browser's `localStorage`; nothing is sent to a server.

To run it locally, open `index.html` in a browser.

## Roadmap

1. **Validation** – talk to 5–10 learner DJs; use it for a real first set (February 2027).
2. **Own address** – publish from this repository.
3. **Controller rehearsal** – connect a Pioneer DDJ-FLX4 over Web MIDI and score transitions (pitch, EQ and fader timing).
4. **Accounts** – optional sign-in by email link, sync across devices, shareable sets.
5. **Discover** – genre charts with BPM/key fit to your set, listening through official embedded players, links to buy tracks.

Audio files never leave the user's device; Handover does not host or stream copyrighted music.

## Project documents

- [`docs/VISION.md`](docs/VISION.md) – product definition (Turkish)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) – technical system and build order
- [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) – requirements
- [`docs/RESEARCH.md`](docs/RESEARCH.md) – market and data-source research
- [`docs/DECISIONS.md`](docs/DECISIONS.md) – decision log
- [`docs/REVIEW.md`](docs/REVIEW.md) – latest system review
- [`design/`](design/) – screen designs
- [`supabase/migrations/`](supabase/migrations/) – database schema (project paused)

## Status

Early prototype. All rights reserved.
