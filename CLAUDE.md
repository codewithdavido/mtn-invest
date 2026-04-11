#CLAUDE.md
strictly follow the project rules and Next.js guidelines defined in @AGENTS.md.

# MTNInvest Project Guide

This project is a modern Next.js 15+ application focused on the MTNInvest platform. 
It uses TypeScript, Tailwind CSS, and follows a clean, component-based architecture.

## Technical Standards
- **Routing:** App Router (`src/app/`)
- **Styling:** Tailwind CSS using the custom `mtn` color palette defined in `tailwind.config.js`.
- **Fonts:** Sans: `DM Sans`, Mono: `IBM Plex Mono`.
- **Rules:** Follow the "Next.js Agent Rules" inside @AGENTS.md for all code generation.

## Component Guidelines
- Use the `mtn` prefix for brand colors (e.g., `bg-mtn-yellow`, `text-mtn-gray-900`).
- Use `box-shadow: card` for containers and `box-shadow: card-hover` for interactive elements.
- Maintain simple English for variables and comments.

## Brand Identity
- **Primary Yellow:** #FFCC00 (`mtn-yellow`)
- **Primary Text:** #111827 (`mtn-gray-900`)
- **Secondary Text:** #4B5563 (`mtn-gray-600`)
- **Backgrounds:** #F8F9FA (`mtn-gray-50`)

## Terminal Commands
- Dev Server: `npm run dev`
- Build: `npm run build`
- Type Check: `npx tsc`