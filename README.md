# SEOlabs — Algorithmic SERP Flight Simulator & Testing Lab

> **"Master the algorithm, intentionally."**  
> The flight simulator for search engines, AI discovery, and Generative Engine Optimization (GEO).

---

## 🚀 Overview

**SEOlabs** is cloned and reimagined from the **CreatorLabs** concept—transforming a social media content simulator into a high-powered **Search Engine & SERP Algorithmic Flight Simulator**.

Instead of guessing what will rank or waiting months for Googlebot to crawl and sandbox your articles, **SEOlabs** allows search strategists, content creators, and growth engineers to test page titles, meta snippets, heading hierarchies, semantic LSI keywords, and structured schema markup in a risk-free lab.

---

## ⚡ Core Features

### 1. 🔬 Modular Search Engine Simulation Engine (`src/lib/seo-engine.ts`)
- **Google Search**: Simulates RankBrain, Helpful Content System, Information Gain, and E-E-A-T signals.
- **AI Overviews & SearchGPT (GEO)**: Predicts Generative Engine Optimization citation probabilities based on direct definitional claims, tables, and entity structure.
- **Bing & Copilot**: IndexNow freshness, exact-match weighting, and rich snippet signals.
- **YouTube vSEO**: Semantic tag density, chapters, and query-intent match.
- **Amazon A9 / Cosmo**: Commercial purchasing intent and transactional keyword density.
- **Google Local Maps Pack**: Proximity weighting and NAP consistency.

### 2. 👁️ Live SERP Snippet Preview Component (`src/components/SerpPreview.tsx`)
- **Desktop SERP**: Live Arial 20px pixel-width calculation with truncation warnings at >600px.
- **Mobile SERP**: Authentic Google mobile search card.
- **AI Overview Citation**: Visualizes how LLMs cite and summarize your claims with quotation badges.
- **Social OpenGraph**: Visualizes preview cards for social discovery.

### 3. ⚡ A/B Split-Test Arena (`/dashboard/ab-testing`)
- Pit Variant A vs Variant B title and meta snippet head-to-head.
- Predicts CTR win margins, organic click lift, and SERP truncation differences.

### 4. 🎮 Full Gamification & Authority Tiers (`src/lib/gamification.ts`)
- **Tiers**:
  - `CRAWL_BOT` (Level 1–5)
  - `SERP_SCOUT` (Level 6–15)
  - `INDEX_STRATEGIST` (Level 16–30)
  - `ALGORITHM_ARCHITECT` (Level 31–45)
  - `SERP_OVERLORD` (Level 46+)
- **Badges**:
  - 🔍 *First Crawl*: Ran first SERP experiment
  - 🎯 *Page One Pioneer*: Predicted Top 10 Google ranking
  - 👑 *Position #1 Crown*: Predicted #1 search ranking
  - 🤖 *GEO Whisperer*: >80% citation probability in AI Overviews
  - 🛡️ *EEAT Titan*: Experience, Expertise, Authoritativeness score of 85+
  - 🧩 *Schema Architect*: Configured valid JSON-LD schema
  - 🧪 *Split-Test Scientist*: Ran head-to-head A/B experiment
  - ⚡ *Helpful Content Ace*: Scored 90+ on Google Helpful Content index
  - 📈 *Traffic Tycoon*: Simulated >5,000 monthly clicks

### 5. 🤖 AI Pro SEO Analysis (`src/lib/ai.ts`)
- Powered by **Google Gemini** for deep search intent critique, information gain evaluation, and strategic counterfactual recommendations.

### 6. 🎨 High-End Editorial Aesthetics
- Signature palette: Luxury paper cream (`#FCFBF7`) + Emerald Green (`#059669`) + Amber Coral (`#F59E0B`) + Obsidian Stone (`#1C1917`).
- Outfit typography paired with *Reenie Beanie* handwritten cursive accents.
- Soft noise grain overlay, ambient floating blobs, glassmorphic cards, and animated marquees.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database & ORM**: SQLite (`prisma/dev.db`) + Prisma ORM
- **Authentication**: NextAuth.js (Credentials Provider)
- **AI Integration**: Google Gemini (`@google/generative-ai`)
- **Styling**: Vanilla Modern CSS & CSS Variables (zero bloat, instant rendering)

---

## 🚦 Getting Started

### 1. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the landing page, or go straight to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to explore the flight deck.

### 2. Default Demo Account
- **Email**: `demo@seolabs.ai`
- **Password**: `password123`
*(Auto-provisioned with Level 8 SERP Scout status and initial experiments)*
