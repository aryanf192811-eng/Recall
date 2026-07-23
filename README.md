# RECALL — Public Incident Archive

> *The record that cannot be erased.*

A civic newspaper and permanent incident archive documenting India's protest narrative — built for citizens, lawyers, and journalists who believe nothing should be forgotten.

---

## What It Is

RECALL is a cinematic, interactive journalism platform that combines the permanence of a legal archive with the storytelling power of a documentary. Every incident is linked to what triggered it and what it led to — building a living, verifiable causality map of events.

This is not a social media feed. It is a public record.

---

## Features

- **Cinematic Editions** — scrollytelling lead stories where the causality tree builds node by node as you read
- **Causality Web** — D3.js force graph mapping every incident to its causes and consequences
- **Permanent Archive** — searchable, filterable, verifiable incident database
- **Ground Network** — verified contributor system with bylined reports from across India
- **Breaking Coverage** — live update feeds for fast-moving situations
- **Legal Watch** — annotated FIRs and court orders in plain language
- **Accountability Column** — named entities with full incident histories
- **Intel Dashboard** — editor verification queue and contributor management
- **Field Report Submission** — 7-step structured contributor flow

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Routing | React Router DOM v6 |
| Graph | D3.js v7 |
| Maps | D3-geo + TopoJSON |
| Fonts | Playfair Display · Lora · Inter · JetBrains Mono |
| State | React Context + useReducer |
| CMS | Sanity.io (production) |
| Search | Meilisearch |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis |
| Media | Cloudinary + AWS S3 |
| Hosting | Vercel + Cloudflare |

---

## Project Structure

```
src/
├── components/
│   ├── Masthead.tsx
│   ├── IncidentCard.tsx
│   ├── CausalityGraph.tsx
│   ├── IndiaMap.tsx
│   ├── SidePanel.tsx
│   └── ...
├── pages/
│   ├── Edition.tsx          # /
│   ├── Archive.tsx          # /archive
│   ├── CausalityWeb.tsx     # /web
│   ├── IncidentDetail.tsx   # /archive/incident/:id
│   ├── BreakingNews.tsx     # /breaking/:id
│   ├── LiveUpdates.tsx      # /live/:id
│   ├── FieldReport.tsx      # /submit
│   ├── IntelDashboard.tsx   # /intel
│   ├── AccessTerminal.tsx   # /login
│   ├── OfficerProfile.tsx   # /officer/:id
│   └── EthicsCode.tsx       # /ethics
├── data/
│   ├── incidents.ts
│   ├── entities.ts
│   └── editions.ts
├── context/
│   └── AppContext.tsx
└── types/
    └── index.ts
```

---

## Contributor Tiers

| Role | Access |
|---|---|
| Viewer | Browse, search, share |
| Contributor | Submit incidents (pending review) |
| Editor | Verify submissions, publish editions |

---

## Design Principles

- **Editorial over algorithmic** — editor-curated, not feed-ranked
- **Verification before publication** — every incident has a status: Verified / Reported / Disputed
- **Permanent by design** — nothing is deleted, corrections are logged
- **No tracking** — no analytics that profile readers

---

## Revenue Model

- Civic-tech grants (CPJ, Internews, Open Society Foundations)
- Crowdfunded micro-donations from readers
- Direct sponsorships from human rights organizations and legal defense funds

---

## Status

`MVP in development` — presented to lawyers and journalists for review before public launch.

---

Built by [@aryanf192811-eng](https://github.com/aryanf192811-eng)
