# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the user. Implemented: Vite, TypeScript, and plain HTML/CSS with bundled static audio. Final delivery targets GitHub Pages; current handoff is locally runnable.

## Users

A four-year-old child, using Google Chrome on a laptop or mobile phone. The parent commissions and hosts the app.

## Product Purpose

Teach recognition of colors through spoken Bengali and English names and selection of a matching color.

## Operating Context

The child selects Bengali or English using one language switch. All UI copy and spoken color names follow that choice. Each clip speaks only the color name (e.g. নীল or Blue), never a sentence or both languages together. The child selects colors using a mouse or touch.

## Capabilities and Constraints

- Correct selections receive an animation and sound effect.
- Incorrect selections receive a distinct animation and sound effect.
- Voice assets may be generated or sourced; personal voice recordings are unavailable.
- Host as a static site on GitHub Pages.
- The user explicitly authorized completing the full app autonomously while away and leaving a local preview running.
- Do not write or modify test files. Verify manually; ask before testing connected mobile devices.
- Do not stage or commit without explicit instruction.

## Evidence on Hand

The project directory was empty at discovery. No existing design, audio, application, or Git repository was present.

Account-free local audio generation was subsequently demonstrated using Meta MMS Bengali and English models. Two bilingual MP3 previews, source WAVs, attribution, and generation provenance are in `audio-preview/`. The generator is `scripts/generate_voice_preview.py`. The models carry CC-BY-NC-4.0 terms. Audio decoding was checked; pronunciation and suitability for the child still need listening review. No paid API or account was used.

## Product Principles

- Keep the child's interaction simple.
- Make spoken Bengali and English central to learning.
- Provide immediate audiovisual feedback.
- Support both mouse and touch interaction.

## Implemented Scope

Ten colors, a five-round game, a separate explore-and-listen page, exactly four choices drawn from all ten colors, gentle wrong feedback, hints after two mistakes, star rewards, replay, pause, automatic OS reduced-motion support, always-on sound effects, and persistent language only. Local MP3 files live in `public/audio/bn/` and `public/audio/en/`. No accounts, cloud API calls, tracking, or runtime model downloads. The sticker-album visual direction is recorded in the surface brief. The user delegated completion; no standing build-path preference was inferred or saved.

## Verification Limits

Generated audio passes token/decoding/clipping checks; subjective pronunciation remains a listening-review item. Connected physical mobile devices must not be tested without permission. Browser viewport emulation is allowed. GitHub deployment itself is not performed by the local-only handoff.

Brand stays “Colorful Kids” in both languages; no settings panel. The existing MMS speech was rejected for pronunciation quality. Replacement Google AI Studio Gero masculine color and feedback recordings are installed (26 clips); AUDIO-SCRIPT.md is the recording contract.
