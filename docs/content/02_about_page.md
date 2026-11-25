# ABOUT US PAGE & ACADEMIC METHODOLOGY SPECIFICATION

**Target URL:** `/about/`  
**Primary Focus:** Academic Mission, Research Methodology, Team Responsibilities & Provenance  
**Search Intent:** Navigational & Informational  

---

## 1. On-Page SEO & Metadata Configuration

```html
<!-- Rank Math / Yoast On-Page Fields -->
<title>About SEO Experiment Lab — Academic Mission & Research Methodology</title>
<meta name="description" content="Learn about the research foundation of SEO Experiment Lab. An academic project dedicated to bringing scientific rigor, z-test validation, and transparency to SEO." />
<link rel="canonical" href="https://YOURDOMAIN.COM/about/" />

<!-- Open Graph Tags -->
<meta property="og:type" content="article" />
<meta property="og:title" content="About SEO Experiment Lab — Scientific SEO Research" />
<meta property="og:description" content="Discover how SEO Experiment Lab bridges the gap between academic statistical rigor and practical search engine optimization." />
<meta property="og:url" content="https://YOURDOMAIN.COM/about/" />
```

### Structured Data (JSON-LD Organization & EducationalProject Schema)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SEO Experiment Lab",
  "url": "https://YOURDOMAIN.COM/",
  "logo": "https://YOURDOMAIN.COM/wp-content/uploads/logo.png",
  "description": "An academic SEO research and experimentation initiative designed to provide open-access statistical testing methodologies for website optimization.",
  "founders": [
    {
      "@type": "Person",
      "name": "Member 1",
      "jobTitle": "Lead Researcher — Experiments & Statistical Methodology"
    },
    {
      "@type": "Person",
      "name": "Member 2",
      "jobTitle": "Lead Engineer — Infrastructure, Architecture & Data Visualization"
    }
  ]
}
</script>
```

---

## 2. Page Content & Copy (Paste into WordPress Page Editor)

# About SEO Experiment Lab

**SEO Experiment Lab** was founded as an academic capstone initiative to address a glaring issue in digital marketing: the pervasive reliance on superstition, correlation, and unverified "best practices" in search engine optimization.

In most marketing environments, when an SEO professional makes changes to a website and organic traffic increases three weeks later, they claim credit for the improvement. However, in reality, search performance is subject to dozens of uncontrolled confounding variables:
- Google core algorithm rollouts
- Competitor updates and content releases
- Seasonal search query fluctuations
- Macroeconomic demand shifts
- Zero-click SERP feature volatility

Our mission is to make **scientific, empirical SEO testing** accessible to students, independent researchers, and small website owners without requiring five-figure enterprise software contracts.

---

## The Academic Foundation

Our methodology bridges classical statistics and technical web engineering:

1. **Causal Attribution over Correlation:** We replace uncontrolled "before-and-after" observations with cohort-based page-split testing.
2. **Statistical Rigor:** We utilize the **Two-Proportion Z-Test** and confidence intervals to ensure that observed click-through rate (CTR) gains exceed random variance at the standard \(\alpha = 0.05\) significance threshold (95% statistical confidence).
3. **Data Honesty & Transparency:** In all academic demonstrations and classroom environments where live Search Console access is restricted, we utilize clearly-labeled **controlled simulated datasets** to model real search bot and visitor distributions accurately.

---

## Team Structure & Operational Split

Our project is executed as a synchronized two-member engineering and research team:

### Member 1: Experiments & Statistical Methodology
- **Experiment Design & Hypothesis Formulation:** Constructs scientific test protocols isolating on-page variables (Title tags, meta descriptions, heading structures).
- **Statistical Engine & Analysis:** Formulates mathematical models (two-proportion z-tests, p-value calculations, minimum sample size criteria) to determine definitive winning variants.
- **Academic Research & Content Strategy:** Leads qualitative SERP research, competitor gap analysis, and academic reporting synthesis.

### Member 2: Infrastructure, Architecture & Visualization
- **Systems Architecture & DevOps:** Deploys and manages the cloud VPS infrastructure, Nginx LEMP stack, Cloudflare edge security, and SSL encryption.
- **Analytics & Data Pipeline:** Integrates Google Search Console, Google Analytics 4, and database schemas.
- **Interactive Visualization & Dashboard:** Engineers the interactive frontend dashboard, statistical charts, and web calculation utilities.

---

## Technological Stack & Architectural Roadmap

The project is structured across two synchronized layers:

1. **The Public Educational Hub (Milestone I Deliverable):**  
   Built on WordPress, hosted on an enterprise-grade Nginx LEMP stack, accelerated by Cloudflare CDN, and optimized for Core Web Vitals. It serves as our top-of-funnel publishing channel for guides, calculators, and experiment documentation.
2. **The Experiment Platform App (Milestone II & III Roadmap):**  
   Engineered with **React, Tailwind CSS, Python (FastAPI), and PostgreSQL**, hosted on our dedicated application subdomain (`app.YOURDOMAIN.COM`), featuring automated GSC synchronization and AI-assisted hypothesis generation.

---

## Explore Our Work

- Read our foundational guide: [What is SEO Split Testing?](/guides/seo-split-testing/)
- Test your own numbers: [Interactive Two-Proportion Z-Test Calculator](/tools/seo-significance-calculator/)
- Connect with our research team or review our codebase on GitHub.
