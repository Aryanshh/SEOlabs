# CLAUDE.md — Architecture, Engineering & SEO Master Reference

> **Repository:** SEOlabs (`seolabs.space`)  
> **Target Audience:** Claude Code, AI agents, and software engineers working on this codebase.  
> **Security Notice:** This file contains architecture specifications, SEO audit findings, code standards, and implementation histories. It contains **no credentials, private keys, database passwords, or secret environment values**.

---

## 1. Project Overview & Brand Identity

* **Brand Names:** `SEOlabs` (primary compound brand) & `SEO Labs` (spaced alternate brand)
* **Production Domain:** `https://seolabs.space`
* **Canonical URL Policy:** Strictly apex domain (`https://seolabs.space`) with permanent 301 redirects from `www.seolabs.space`.
* **Platform Category:** Algorithmic Search Engine Results Page (SERP) Simulator, Generative Engine Optimization (GEO) Testing Lab, and Topical Authority Analyzer.
* **Core Value Proposition:** Allows digital marketers, technical SEOs, and growth engineering teams to test search intent, title pixel truncation, schema markup, and CTR distributions in an offline, zero-risk simulation lab before search engine crawlers index changes.

### Primary Target Keywords
1. **`seolabs`** — Exact brand query.
2. **`seo labs`** — Spaced brand query.
3. **`seo simulator`** — Core transactional product category.
4. **`serp simulator`** — High-volume technical SEO utility query.
5. **`google serp simulator`** — Direct commercial intent tool query.
6. **`seo split testing`** — Pillar informational guide and feature query.

---

## 2. Technical Stack & File Architecture

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript (Strict mode enabled)
* **Styling:** Vanilla CSS with modern custom properties (`src/app/theme.css`, `globals.css`)
* **Authentication:** NextAuth.js (Credentials provider)
* **ORM & Database:** Prisma ORM connected to PostgreSQL
* **Structured Data:** Schema.org JSON-LD (`@graph` format)
* **Search Crawling Directives:** Native Next.js App Router Route Handlers (`robots.ts`, `sitemap.ts`)

### Key Directories
```text
SEOlabs/
├── docs/                        # Specifications, guides, milestone reports
│   └── content/                 # Content specifications (Pillar guides, About copy)
├── prisma/
│   └── schema.prisma            # Database schema (User, Experiment, Simulation models)
├── public/
│   ├── icon.svg                 # Brand search radar SVG icon
│   ├── llms.txt                 # AI search engine & LLM crawler documentation
│   ├── manifest.webmanifest     # Web application manifest
│   └── sitemap.xml              # Static fallback sitemap
├── src/
│   ├── app/
│   │   ├── (auth)/              # Isolated authentication route group
│   │   │   ├── layout.tsx       # Auth metadata & canonical declaration
│   │   │   ├── login/           # Sign-in view
│   │   │   └── register/        # Registration view
│   │   ├── (dashboard)/         # Authenticated private user area (noindex)
│   │   │   ├── layout.tsx       # Dashboard sidebar & session provider
│   │   │   └── dashboard/       # Overview, SEO Studio, Split Arena, Analytics
│   │   ├── about/               # Public About & Methodology page
│   │   │   └── page.tsx         # E-E-A-T academic research foundation
│   │   ├── api/                 # Backend API routes (noindex)
│   │   ├── guides/              # High-authority pillar guides
│   │   │   └── seo-split-testing/
│   │   │       └── page.tsx     # 2,600-word empirical split testing guide
│   │   ├── layout.tsx           # Global HTML, viewport, metadata & JSON-LD
│   │   ├── page.tsx             # Interactive landing page & SERP mockup
│   │   ├── robots.ts            # Dynamic robots.txt generation
│   │   ├── sitemap.ts           # Dynamic XML sitemap generator
│   │   └── theme.css            # Design system, variables, animations
│   ├── components/              # Shared UI components & Icons
│   └── lib/
│       ├── auth.ts              # NextAuth configuration
│       └── prisma.ts            # Resilient Prisma client with URI encoding sanitization
├── next.config.mjs              # Security headers, 301 redirects, X-Robots-Tag rules
└── package.json
```

---

## 3. SEO Architecture & Audit History

### The Root Cause: Why `seolabs.space` Ranked for *"seolabs space"* but Not *"seolabs"*
Using the **`claude-seo`** audit framework (`seo-technical`, `seo-content`, `seo-schema`, and `seo-agentic`), the following root causes were identified and resolved:

1. **Exact Domain String Match vs. Entity Disambiguation**:
   * *Issue:* The query `seolabs space` matched the root domain name and TLD (`seolabs` + `.space`) where competition was near zero.
   * *Issue:* For competitive single queries (`seolabs`, `seo labs`, `seo simulator`), Google's RankBrain and Knowledge Graph evaluate whether the term is an established primary entity. Because visible copy lacked explicit alias pairing, Google hesitated to rank it for generic brand queries.
   * *Fix:* Implemented explicit **Canonical Alias Declarations** pairing both spellings across titles, H1s, lead copy, FAQs, and schema.

2. **JavaScript Rendering Blocker in `robots.ts`**:
   * *Issue:* `src/app/robots.ts` previously disallowed `/_next/`. In Next.js, all client-side hydration chunks and CSS live under `/_next/static/`. Googlebot's Web Rendering Service (WRS) was blocked from downloading stylesheets and scripts, causing headless crawls to fail mobile-friendliness and dynamic rendering.
   * *Fix:* Removed `/_next/` from `disallow`. Configured explicit allow rules for major search engines and modern AI crawlers.

3. **Title Tag Display Truncation (>600px width)**:
   * *Issue:* The previous title (`SEOlabs — The Algorithmic SERP Flight Simulator & GEO Testing Lab`) was 65 characters long, exceeding Google's desktop display threshold (~580px / 55-60 characters). Google was clipping or rewriting the title snippet.
   * *Fix:* Replaced with a 50-character high-impact title tag: `SEOlabs (SEO Labs) — Official SERP & SEO Simulator`.

4. **H1 Semantic Tokenization**:
   * *Issue:* The previous H1 contained `SEOlabs™` which fragmented tokenization (`SEOlabs™` ≠ `SEOlabs`), followed by an abstract marketing tagline.
   * *Fix:* Refactored H1 to: `SEOlabs (SEO Labs): The Algorithmic SEO Simulator & SERP Lab`.

5. **Thin Content & Brand Authority**:
   * *Issue:* The original landing page had only 601 words, falling below topical authority guidelines for software products.
   * *Fix:* Added an in-depth "Platform Architecture" section and FAQ entities, raising the word count to an authoritative ~1,000 words. Added `/about` and `/guides/seo-split-testing` to create an interconnected topical cluster.

6. **Host Fragmentation (www vs. non-www)**:
   * *Issue:* `www.seolabs.space` and `seolabs.space` responded independently without a permanent 301 redirect, splitting inbound PageRank and brand equity.
   * *Fix:* Added a permanent 301 redirect rule in `next.config.mjs` routing all `www` requests to the apex domain.

---

## 4. Summary of Implemented Solutions

### A. Metadata & Schema Calibration (`src/app/layout.tsx`)
* **Title Tag:** `SEOlabs (SEO Labs) — Official SERP & SEO Simulator`
* **Meta Description:** `SEOlabs (SEO Labs) is the official algorithmic SEO simulator and SERP flight deck. Test Google RankBrain, Helpful Content signals, and CTR curves before crawling.` (160 characters).
* **Schema.org JSON-LD Entities:**
  * `WebSite`: Primary name `SEOlabs`, with alternate names `['SEO Labs', 'seolabs', 'seo labs', 'SEOlabs (SEO Labs)', 'SEOlabs Platform', 'SEO Labs Platform', 'seolabs.space']`.
  * `Organization`: Declares legal name `SEOlabs (SEO Labs)` and includes a nested `Brand` object matching both terms.
  * `SoftwareApplication` / `WebApplication`: Declares `name: 'SEOlabs (SEO Labs) SEO Simulator'` under categories `BusinessApplication, DeveloperApplication, SEOApplication`.
  * `BreadcrumbList`: Implements breadcrumb hierarchy for search result display.
  * `FAQPage`: Schema markup for algorithm simulation questions.

### B. Robots & Crawler Directives (`src/app/robots.ts`)
* Allows all public indexable routes (`/`, `/about`, `/guides/*`, `/login`, `/register`).
* Disallows only private administrative and user paths:
  * `/api/`
  * `/dashboard/`
  * `/admin/`
* Explicitly declares user-agent groups for:
  * `Googlebot`
  * `Bingbot`
  * `OAI-SearchBot` (ChatGPT Search)
  * `Claude-SearchBot` (Anthropic)
  * `PerplexityBot`
  * `Applebot`
* Points directly to `https://seolabs.space/sitemap.xml`.

### C. Host Consolidation & Security Headers (`next.config.mjs`)
* **Permanent 301 Redirect:**
  ```javascript
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.seolabs.space' }],
        destination: 'https://seolabs.space/:path*',
        permanent: true,
      },
    ];
  }
  ```
* **Crawl Protection on Private Routes:**
  Adds `X-Robots-Tag: noindex, nofollow` to `/dashboard/:path*` and `/api/:path*`.
* **Security & Performance:**
  Enforces `Strict-Transport-Security` (HSTS: `max-age=63072000; includeSubDomains; preload`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`.

### D. Multi-Page Topical Cluster
1. **Homepage (`/`)**: High-converting simulator showcase with exact-match H1, interactive SERP card preview, platform architecture breakdown, and audience FAQs.
2. **About & Methodology (`/about`)**: Comprehensive documentation of research methodology, RankBrain neural matching, Helpful Content signal analysis, and information gain quantification.
3. **SEO Split Testing Pillar (`/guides/seo-split-testing`)**: In-depth empirical guide comparing cohort split testing against CRO testing, detailing statistical significance (two-proportion z-tests) and pre-testing with an SEO simulator.
4. **Dynamic Sitemap (`src/app/sitemap.ts`)**: Generates valid W3C XML sitemaps covering all 5 indexable endpoints with appropriate update cadences.
5. **AI Search File (`public/llms.txt`)**: Adheres to the `llmstxt.org` specification, defining `SEOlabs (SEO Labs)` for AI agent citations.

---

## 5. Development & Deployment Guidelines

### Local Verification Commands
Before committing any changes to the repository, ensure the build passes cleanly:

```bash
# 1. Typecheck and compile production bundle
npm run build

# 2. Start local production server
npm run start
```
*Expected Build Output: `✓ Generating static pages (20/20) with 0 errors`.*

### Production Server Deployment
The production application runs on a Linux server under systemd (`seolabs.service`) reverse-proxied by Nginx:

```bash
# Navigate to application root
cd /var/www/seolabs

# Pull latest commits
git pull origin main

# Build Next.js assets
npm run build

# Restart systemd daemon
sudo systemctl restart seolabs

# Check service status
sudo systemctl status seolabs --no-pager
```

### Google Search Console Maintenance
Whenever updates are deployed:
1. Open [Google Search Console](https://search.google.com/search-console).
2. Inspect `https://seolabs.space` and click **Request Indexing**.
3. Inspect new URLs (`/about`, `/guides/seo-split-testing`) and submit them.
4. Verify that `https://seolabs.space/sitemap.xml` is listed under **Sitemaps** with status *Success*.

---

## 6. Critical Invariants for Future Claude Sessions

When future Claude instances modify this repository, they **must adhere to these rules**:

1. **Strict Zero-Emoji Policy**:
   * Never insert emojis (e.g. 🚀, 🔍, 📊) into user-facing markup, headings, buttons, or metadata.
   * Use clean SVG icons (from `@/components/Icons`) or styled typography badges.

2. **Unslop Rule (Natural, Grounded Prose)**:
   * Avoid AI marketing clichés (e.g., *"In today's fast-paced digital landscape"*, *"Revolutionize your workflow"*, *"Supercharge your SEO"*).
   * Maintain authoritative, technical, and mathematically grounded terminology (e.g. *two-proportion z-tests*, *neural intent mapping*, *sub-pixel typography truncation*).

3. **Dual-Brand Consistency**:
   * Keep both `SEOlabs` and `SEO Labs` visible in key metadata and semantic body copy so Google's Knowledge Graph preserves equivalence for both search queries.

4. **Preserve Crawlability**:
   * Never re-add `/_next/` to `disallow` in `robots.ts`.
   * Keep `sitemap.ts` updated whenever a new public page or guide is added.
   * Maintain `X-Robots-Tag: noindex, nofollow` on internal dashboard routes.

5. **Secrets & Security Isolation**:
   * Never hardcode database credentials, tokens, or private keys into `.ts`, `.tsx`, `.mjs`, or `.md` files.
   * Read environment values strictly via `process.env.DATABASE_URL`, `process.env.NEXTAUTH_SECRET`, etc.
