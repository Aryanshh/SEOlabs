// SEOlabs Algorithmic Simulation & SERP Testing Engine
// Simulates Google RankBrain, Helpful Content System, AI Overviews (GEO), and SERP CTR dynamics

export interface SeoInput {
  searchEngine: string; // GOOGLE, AI_OVERVIEW, BING, YOUTUBE, AMAZON, LOCAL_MAPS
  contentType: string; // BLOG_ARTICLE, PRODUCT_PAGE, LANDING_PAGE, PILLAR_GUIDE, CASE_STUDY, LOCAL_SERVICE
  searchIntent: string; // INFORMATIONAL, COMMERCIAL, TRANSACTIONAL, NAVIGATIONAL
  title: string;
  metaDescription?: string;
  urlSlug?: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  body: string;
  schemaType?: string; // ARTICLE, FAQ_PAGE, PRODUCT, LOCAL_BUSINESS, HOW_TO, NONE
  schemaMarkup?: string;
  internalLinksCount?: number;
  externalLinksCount?: number;
  userLevel: number;
  // Variant B for split testing
  isSplitTest?: boolean;
  variantBTitle?: string;
  variantBMeta?: string;
}

export interface FactorDetail {
  score: number; // 0.0 - 1.0
  weight: number; // percentage weight
  feedback: string;
}

export interface SimulationTimelinePoint {
  month: number;
  label: string;
  predictedRank: number;
  projectedClicks: number;
  crawlStatus: string;
}

export interface SeoSimulationResult {
  predictedRank: number;
  predictedCtr: number;
  monthlyImpressions: number;
  monthlyClicks: number;
  trafficValue: number;
  geoCitationScore: number;
  eeatScore: number;
  helpfulContentScore: number;
  overallSeoScore: number;
  richSnippetEligible: boolean;
  algorithmFactors: Record<string, FactorDetail>;
  recommendations: string[];
  timeline: SimulationTimelinePoint[];
  serpSnippet: {
    title: string;
    url: string;
    metaDescription: string;
    isTruncated: boolean;
    pixelWidth: number;
  };
  variantBComparison?: {
    predictedRank: number;
    predictedCtr: number;
    monthlyClicks: number;
    overallScore: number;
    winMargin: number; // positive means Variant A wins, negative means Variant B wins
    winner: 'VARIANT_A' | 'VARIANT_B' | 'TIE';
    summary: string;
  };
}

const ENGINE_FACTOR_WEIGHTS: Record<string, Record<string, number>> = {
  GOOGLE: {
    title_optimization: 0.18,
    search_intent_match: 0.20,
    content_depth: 0.16,
    eeat_signals: 0.14,
    helpful_content_score: 0.12,
    schema_markup: 0.08,
    snippet_ctr_appeal: 0.07,
    domain_authority: 0.05,
  },
  AI_OVERVIEW: {
    factual_density: 0.24,
    direct_answer_structure: 0.22,
    information_gain: 0.18,
    eeat_signals: 0.16,
    schema_markup: 0.10,
    domain_authority: 0.10,
  },
  BING: {
    exact_match_title: 0.22,
    meta_tag_quality: 0.18,
    content_depth: 0.16,
    social_signals: 0.14,
    multimedia_richness: 0.12,
    schema_markup: 0.10,
    domain_authority: 0.08,
  },
  YOUTUBE: {
    title_ctr_appeal: 0.28,
    search_intent_match: 0.22,
    content_relevance: 0.20,
    tag_keyword_density: 0.15,
    user_satisfaction: 0.15,
  },
  AMAZON: {
    commercial_intent: 0.28,
    bullet_point_clarity: 0.22,
    keyword_placement: 0.20,
    price_value_signals: 0.15,
    review_trust_signals: 0.15,
  },
  LOCAL_MAPS: {
    geo_targeting: 0.30,
    local_schema_markup: 0.22,
    service_keyword_density: 0.20,
    trust_and_reviews: 0.18,
    domain_authority: 0.10,
  },
};

const POWER_WORDS = [
  'best', 'guide', 'top', 'proven', 'how to', 'review', 'ultimate',
  'complete', 'fast', 'free', 'checklist', 'step-by-step', 'comparison',
  'versus', 'vs', 'tools', 'template', 'strategy', 'framework', '2026'
];

const INTENT_MARKERS: Record<string, string[]> = {
  INFORMATIONAL: ['what is', 'how to', 'guide', 'tutorial', 'tips', 'learn', 'examples', 'explained', 'why'],
  COMMERCIAL: ['best', 'top', 'review', 'vs', 'versus', 'comparison', 'alternatives', 'pricing', 'features'],
  TRANSACTIONAL: ['buy', 'order', 'deal', 'discount', 'coupon', 'service', 'hire', 'get', 'purchase'],
  NAVIGATIONAL: ['official', 'login', 'portal', 'dashboard', 'website', 'support', 'download'],
};

// Estimate pixel width for standard Google desktop SERP (Arial 20px)
function estimatePixelWidth(text: string): number {
  let width = 0;
  for (const char of text) {
    if (/[ijlI.,']/.test(char)) width += 5;
    else if (/[frtJ -]/.test(char)) width += 7;
    else if (/[mwMW]/.test(char)) width += 15;
    else if (/[A-Z]/.test(char)) width += 12;
    else width += 9;
  }
  return width;
}

export function analyzeTitleTag(title: string, targetKeyword: string): { score: number; pixelWidth: number; isTruncated: boolean; feedback: string } {
  if (!title || title.trim().length === 0) {
    return { score: 0.1, pixelWidth: 0, isTruncated: false, feedback: 'Missing title tag. Add a compelling 50-60 character title.' };
  }

  const px = estimatePixelWidth(title);
  const isTruncated = px > 600 || title.length > 65;
  let score = 0.5;

  // Length scoring
  if (title.length >= 45 && title.length <= 60 && !isTruncated) {
    score += 0.25;
  } else if (title.length < 30) {
    score -= 0.15;
  } else if (isTruncated) {
    score -= 0.15;
  }

  // Keyword check
  const normalizedTitle = title.toLowerCase();
  const normalizedKeyword = targetKeyword.toLowerCase().trim();
  if (normalizedKeyword && normalizedTitle.includes(normalizedKeyword)) {
    score += 0.2;
    // Extra boost if target keyword is within the first 30 characters
    if (normalizedTitle.indexOf(normalizedKeyword) < 25) {
      score += 0.1;
    }
  } else {
    score -= 0.25;
  }

  // Power word presence
  const hasPowerWord = POWER_WORDS.some(w => normalizedTitle.includes(w));
  if (hasPowerWord) score += 0.1;

  // Has number or brackets (higher SERP CTR)
  if (/\d/.test(title) || /[[({]/.test(title)) score += 0.05;

  const clamped = Math.min(Math.max(score, 0.15), 1.0);
  let feedback = 'Strong title tag with great keyword placement and CTR triggers.';
  if (!normalizedTitle.includes(normalizedKeyword)) {
    feedback = `Target keyword "${targetKeyword}" is missing from title tag.`;
  } else if (isTruncated) {
    feedback = `Title tag exceeds Google SERP pixel limit (~600px). It will be truncated with ellipsis (...). Shorten by ${px - 580}px.`;
  } else if (title.length < 35) {
    feedback = 'Title tag is slightly short. Expand with value proposition or branding.';
  }

  return { score: clamped, pixelWidth: px, isTruncated, feedback };
}

export function analyzeMetaDescription(meta: string = '', targetKeyword: string): { score: number; feedback: string } {
  if (!meta || meta.trim().length === 0) {
    return { score: 0.3, feedback: 'No meta description provided. Google will extract an unoptimized snippet from page text.' };
  }

  let score = 0.5;
  const len = meta.length;
  if (len >= 130 && len <= 160) score += 0.3;
  else if (len < 80) score -= 0.1;
  else if (len > 165) score -= 0.1;

  if (targetKeyword && meta.toLowerCase().includes(targetKeyword.toLowerCase().trim())) {
    score += 0.2;
  }

  const ctaWords = ['discover', 'learn', 'read', 'see', 'explore', 'compare', 'find out', 'check out', 'get', 'try'];
  if (ctaWords.some(c => meta.toLowerCase().includes(c))) score += 0.1;

  const clamped = Math.min(Math.max(score, 0.2), 1.0);
  let feedback = 'Solid meta description with clear search intent & CTA.';
  if (len > 165) feedback = 'Meta description is over 160 characters and may get cut off on mobile SERPs.';
  else if (!meta.toLowerCase().includes(targetKeyword.toLowerCase().trim())) feedback = `Include your primary keyword "${targetKeyword}" in meta description for bolding on SERPs.`;

  return { score: clamped, feedback };
}

export function analyzeContentDepth(body: string, contentType: string): { score: number; wordCount: number; readingTime: number; feedback: string } {
  const words = body.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTime = Math.ceil(wordCount / 200);

  const targetMinWords: Record<string, number> = {
    BLOG_ARTICLE: 1200,
    PILLAR_GUIDE: 2400,
    PRODUCT_PAGE: 400,
    LANDING_PAGE: 600,
    CASE_STUDY: 900,
    LOCAL_SERVICE: 500,
  };

  const minTarget = targetMinWords[contentType] || 1000;
  let score = 0.4;

  if (wordCount >= minTarget) score += 0.35;
  else score += (wordCount / minTarget) * 0.3;

  // Check structure: Headings (##, ###), bullet lists (*, -), tables (|)
  const hasH2 = /^##\s+/m.test(body) || /<h2>/i.test(body);
  const hasH3 = /^###\s+/m.test(body) || /<h3>/i.test(body);
  const hasBullets = /^[-*]\s+/m.test(body) || /<li>/i.test(body);
  const hasTable = /\|.*\|/.test(body);

  if (hasH2) score += 0.1;
  if (hasH3) score += 0.05;
  if (hasBullets) score += 0.05;
  if (hasTable) score += 0.05;

  const clamped = Math.min(Math.max(score, 0.2), 1.0);
  let feedback = `Comprehensive content depth (${wordCount} words) with strong structural hierarchy.`;
  if (wordCount < minTarget * 0.5) {
    feedback = `Thin content risk: ${wordCount} words is significantly below the ${minTarget} word benchmark for ${contentType.replace(/_/g, ' ')}.`;
  } else if (!hasH2) {
    feedback = 'Break up your content with H2 and H3 subheadings for better crawlability and scannability.';
  }

  return { score: clamped, wordCount, readingTime, feedback };
}

export function analyzeSearchIntent(title: string, body: string, searchIntent: string): { score: number; feedback: string } {
  const markers = INTENT_MARKERS[searchIntent] || INTENT_MARKERS.INFORMATIONAL;
  const fullText = (title + ' ' + body).toLowerCase();
  const matched = markers.filter(m => fullText.includes(m));

  let score = 0.4;
  if (matched.length >= 3) score += 0.5;
  else if (matched.length >= 1) score += 0.3;

  const clamped = Math.min(Math.max(score, 0.2), 1.0);
  const feedback = matched.length >= 2
    ? `Accurately satisfies ${searchIntent.toLowerCase()} search intent signals.`
    : `Align your content more tightly with ${searchIntent.toLowerCase()} intent (e.g. use terms like: ${markers.slice(0, 3).join(', ')}).`;

  return { score: clamped, feedback };
}

export function analyzeKeywordOptimization(body: string, targetKeyword: string, secondaryKeywords: string[]): { score: number; density: number; feedback: string } {
  if (!targetKeyword) return { score: 0.3, density: 0, feedback: 'Specify a primary target keyword.' };

  const words = body.toLowerCase().split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  if (totalWords === 0) return { score: 0.1, density: 0, feedback: 'No content to analyze.' };

  const kw = targetKeyword.toLowerCase().trim();
  const kwParts = kw.split(/\s+/);
  const regex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
  const matches = (body.match(regex) || []).length;

  const density = totalWords > 0 ? (matches * kwParts.length / totalWords) * 100 : 0;
  let score = 0.5;

  if (density >= 0.8 && density <= 2.4) {
    score += 0.3; // Natural, optimal density
  } else if (density > 3.2) {
    score -= 0.3; // Keyword stuffing penalty
  } else if (density < 0.4) {
    score -= 0.2; // Under-optimized
  }

  // Check secondary keywords coverage
  if (secondaryKeywords && secondaryKeywords.length > 0) {
    const coveredSec = secondaryKeywords.filter(sk => body.toLowerCase().includes(sk.toLowerCase().trim()));
    const ratio = coveredSec.length / secondaryKeywords.length;
    score += ratio * 0.2;
  }

  const clamped = Math.min(Math.max(score, 0.15), 1.0);
  let feedback = `Target keyword density is balanced (${density.toFixed(1)}%).`;
  if (density > 3.0) {
    feedback = `Keyword stuffing alert! Density (${density.toFixed(1)}%) exceeds 3%. Diversify with semantic LSI synonyms.`;
  } else if (density < 0.5) {
    feedback = `Primary keyword mentioned too infrequently (${density.toFixed(1)}% density). Mention it naturally in key sections.`;
  }

  return { score: clamped, density: Math.round(density * 10) / 10, feedback };
}

export function analyzeEEAT(body: string, userLevel: number): { score: number; feedback: string } {
  let score = 0.4;
  const lower = body.toLowerCase();

  // First-hand Experience cues
  const experienceCues = ['we tested', 'our team', 'hands-on', 'in our experiment', 'we found that', 'over 30 days', 'in our experience'];
  if (experienceCues.some(c => lower.includes(c))) score += 0.18;

  // Expertise & Data cues
  const expertiseCues = ['according to', 'research shows', 'data indicates', '%', 'study', 'benchmark', 'methodology'];
  if (expertiseCues.some(c => lower.includes(c))) score += 0.15;

  // Trust & Transparency cues
  const trustCues = ['sources', 'updated', 'disclosure', 'author', 'verified', 'disclaimer'];
  if (trustCues.some(c => lower.includes(c))) score += 0.12;

  // Authority level boost (user level in lab represents domain authority)
  const authorityBoost = Math.min(userLevel * 0.008, 0.15);
  score += authorityBoost;

  const clamped = Math.min(Math.max(score, 0.25), 1.0);
  const feedback = clamped > 0.75
    ? 'High E-E-A-T signals detected: Strong first-hand experience, transparent data citations, and clear expertise.'
    : 'Boost E-E-A-T: Include explicit first-hand testing notes ("In our test..."), specific data points, and author attribution.';

  return { score: clamped, feedback };
}

export function analyzeGEO(body: string, title: string, schemaType: string): { score: number; feedback: string } {
  let score = 0.35;
  const lower = body.toLowerCase();

  // Direct definitional sentence in first paragraphs (SearchGPT / AI Overviews loves direct definitions)
  if (/\bis (a|an|the|defined as)\b/i.test(body.slice(0, 500))) score += 0.2;

  // Markdown lists / structured tables
  if (/^[-*]\s+/m.test(body) || /\|.*\|/.test(body)) score += 0.15;

  // Structured schema
  if (['FAQ_PAGE', 'HOW_TO', 'ARTICLE'].includes(schemaType)) score += 0.15;

  // Question headers
  if (/^##\s+(what|how|why|can|is|which)\b/im.test(body)) score += 0.15;

  const clamped = Math.min(Math.max(score, 0.2), 1.0);
  const feedback = clamped > 0.75
    ? 'High Generative Engine Optimization (GEO): Content is structured for seamless citation in AI Overviews & SearchGPT.'
    : 'Improve GEO: Add a concise 2-sentence direct answer block at the beginning of sections and incorporate FAQ markup.';

  return { score: clamped, feedback };
}

export function analyzeSchema(schemaType: string = 'ARTICLE'): { score: number; richSnippetEligible: boolean; feedback: string } {
  const isRich = ['FAQ_PAGE', 'HOW_TO', 'PRODUCT', 'LOCAL_BUSINESS'].includes(schemaType);
  if (schemaType === 'NONE') {
    return { score: 0.3, richSnippetEligible: false, feedback: 'No structured data. Missing rich snippet opportunities on SERPs.' };
  }
  return {
    score: isRich ? 0.95 : 0.8,
    richSnippetEligible: isRich,
    feedback: isRich
      ? `${schemaType} Schema detected: High probability of unlocking interactive Google Rich Snippet features (accordion, stars, or steps).`
      : 'Standard Schema applied. Good baseline technical SEO hygiene.',
  };
}

// Organic CTR curve model based on SERP position
function getCtrForRank(rank: number, hasRichSnippet: boolean, isAiOverview: boolean): number {
  const baseCurve: Record<number, number> = {
    1: 31.8,
    2: 15.6,
    3: 9.8,
    4: 6.4,
    5: 4.8,
    6: 3.7,
    7: 2.9,
    8: 2.3,
    9: 1.9,
    10: 1.5,
  };

  const integerRank = Math.min(Math.max(Math.round(rank), 1), 15);
  let ctr = baseCurve[integerRank] || (integerRank <= 10 ? 1.5 : 0.5);

  if (hasRichSnippet) ctr *= 1.25; // 25% lift from rich snippets
  if (isAiOverview) ctr *= 1.35; // Citation from AI overview acts as persistent top-of-page link

  return Math.round(ctr * 10) / 10;
}

export function runSeoSimulation(input: SeoInput): SeoSimulationResult {
  const engineWeights = ENGINE_FACTOR_WEIGHTS[input.searchEngine] || ENGINE_FACTOR_WEIGHTS.GOOGLE;

  // Run all modular analyzers
  const titleResult = analyzeTitleTag(input.title, input.targetKeyword);
  const metaResult = analyzeMetaDescription(input.metaDescription, input.targetKeyword);
  const depthResult = analyzeContentDepth(input.body, input.contentType);
  const intentResult = analyzeSearchIntent(input.title, input.body, input.searchIntent);
  const kwResult = analyzeKeywordOptimization(input.body, input.targetKeyword, input.secondaryKeywords);
  const eeatResult = analyzeEEAT(input.body, input.userLevel);
  const geoResult = analyzeGEO(input.body, input.title, input.schemaType || 'ARTICLE');
  const schemaResult = analyzeSchema(input.schemaType);

  const domainAuthScore = Math.min(0.4 + (input.userLevel * 0.012), 1.0);
  const helpfulScore = Math.min(Math.round((depthResult.score * 0.4 + eeatResult.score * 0.35 + geoResult.score * 0.25) * 100), 100);

  // Map to engine factor radar
  const factorMap: Record<string, { score: number; feedback: string }> = {
    title_optimization: { score: titleResult.score, feedback: titleResult.feedback },
    exact_match_title: { score: titleResult.score, feedback: titleResult.feedback },
    title_ctr_appeal: { score: titleResult.score, feedback: titleResult.feedback },
    search_intent_match: { score: intentResult.score, feedback: intentResult.feedback },
    content_depth: { score: depthResult.score, feedback: depthResult.feedback },
    factual_density: { score: geoResult.score, feedback: geoResult.feedback },
    direct_answer_structure: { score: geoResult.score, feedback: geoResult.feedback },
    information_gain: { score: Math.min(depthResult.score * 0.6 + eeatResult.score * 0.4, 1.0), feedback: 'Evaluates unique value added beyond existing SERP competitors.' },
    eeat_signals: { score: eeatResult.score, feedback: eeatResult.feedback },
    helpful_content_score: { score: helpfulScore / 100, feedback: helpfulScore > 75 ? 'Passes Google Helpful Content system filters.' : 'Needs more unique editorial perspective and practical utility.' },
    schema_markup: { score: schemaResult.score, feedback: schemaResult.feedback },
    local_schema_markup: { score: schemaResult.score, feedback: schemaResult.feedback },
    snippet_ctr_appeal: { score: metaResult.score, feedback: metaResult.feedback },
    meta_tag_quality: { score: metaResult.score, feedback: metaResult.feedback },
    domain_authority: { score: domainAuthScore, feedback: `Simulated authority tier: Level ${input.userLevel}.` },
    commercial_intent: { score: intentResult.score, feedback: intentResult.feedback },
    bullet_point_clarity: { score: depthResult.score, feedback: depthResult.feedback },
    keyword_placement: { score: kwResult.score, feedback: kwResult.feedback },
    price_value_signals: { score: 0.7, feedback: 'Transactional signals present.' },
    review_trust_signals: { score: eeatResult.score, feedback: eeatResult.feedback },
    geo_targeting: { score: 0.8, feedback: 'Local geographic intent anchored.' },
    service_keyword_density: { score: kwResult.score, feedback: kwResult.feedback },
    trust_and_reviews: { score: eeatResult.score, feedback: eeatResult.feedback },
    social_signals: { score: 0.65, feedback: 'Social graph open graph tags verified.' },
    multimedia_richness: { score: (input.body.includes('![') || input.body.includes('<img')) ? 0.9 : 0.5, feedback: 'Image & media asset optimization.' },
    content_relevance: { score: depthResult.score, feedback: depthResult.feedback },
    tag_keyword_density: { score: kwResult.score, feedback: kwResult.feedback },
    user_satisfaction: { score: (helpfulScore / 100), feedback: 'Estimated long-click dwell time satisfaction.' },
  };

  const factors: Record<string, FactorDetail> = {};
  let weightedScoreSum = 0;
  let totalWeight = 0;

  for (const [factorKey, weight] of Object.entries(engineWeights)) {
    const analysis = factorMap[factorKey] || { score: 0.6, feedback: 'Standard baseline.' };
    factors[factorKey] = {
      score: Math.round(analysis.score * 100) / 100,
      weight,
      feedback: analysis.feedback,
    };
    weightedScoreSum += analysis.score * weight;
    totalWeight += weight;
  }

  const overallComposite = totalWeight > 0 ? (weightedScoreSum / totalWeight) : 0.7;
  const overallSeoScore = Math.round(overallComposite * 100);

  // Calculate Predicted SERP Rank (1.0 is highest rank)
  // High scores approach 1.1 - 2.5; low scores drift to 12 - 25
  let predictedRank: number;
  if (overallSeoScore >= 92) {
    predictedRank = 1.0 + Math.round((Math.random() * 0.8) * 10) / 10;
  } else if (overallSeoScore >= 84) {
    predictedRank = 2.0 + Math.round((Math.random() * 1.5) * 10) / 10;
  } else if (overallSeoScore >= 75) {
    predictedRank = 4.0 + Math.round((Math.random() * 3.0) * 10) / 10;
  } else if (overallSeoScore >= 65) {
    predictedRank = 8.0 + Math.round((Math.random() * 4.0) * 10) / 10;
  } else {
    predictedRank = 14.0 + Math.round((Math.random() * 8.0) * 10) / 10;
  }

  const isAiOverview = input.searchEngine === 'AI_OVERVIEW';
  const predictedCtr = getCtrForRank(predictedRank, schemaResult.richSnippetEligible, isAiOverview);

  // Traffic volume estimation
  const estimatedSearchVolume = 4800 + Math.round((input.userLevel * 300) + (input.targetKeyword.length % 5) * 1500);
  const monthlyImpressions = Math.round(estimatedSearchVolume * (predictedRank <= 10 ? 0.95 : 0.25));
  const monthlyClicks = Math.round((monthlyImpressions * (predictedCtr / 100)));
  const cpcBaseline = input.searchIntent === 'COMMERCIAL' || input.searchIntent === 'TRANSACTIONAL' ? 3.4 : 1.8;
  const trafficValue = Math.round(monthlyClicks * cpcBaseline * 100) / 100;

  const geoCitationScore = Math.round(geoResult.score * 100);
  const eeatScore = Math.round(eeatResult.score * 100);

  // Recommendations
  const recommendations: string[] = [];
  const sortedFactors = Object.entries(factors).sort((a, b) => a[1].score - b[1].score);
  for (const [name, data] of sortedFactors.slice(0, 3)) {
    if (data.score < 0.8) {
      recommendations.push(`${name.replace(/_/g, ' ').toUpperCase()}: ${data.feedback}`);
    }
  }
  if (recommendations.length === 0) {
    recommendations.push('Outstanding optimization! Your page is primed for top-tier SERP indexing and AI Overview citation.');
  }

  // 12-Month Projection Timeline
  const timeline: SimulationTimelinePoint[] = [
    { month: 1, label: 'M1 - Discovery', predictedRank: Math.min(predictedRank + 18, 30), projectedClicks: Math.round(monthlyClicks * 0.05), crawlStatus: 'Initial Crawl & Indexing' },
    { month: 2, label: 'M2 - Sandbox', predictedRank: Math.min(predictedRank + 12, 24), projectedClicks: Math.round(monthlyClicks * 0.15), crawlStatus: 'Algorithmic Sandboxing' },
    { month: 3, label: 'M3 - Momentum', predictedRank: Math.min(predictedRank + 6, 18), projectedClicks: Math.round(monthlyClicks * 0.35), crawlStatus: 'Entity Relationship Mapping' },
    { month: 6, label: 'M6 - Core Update', predictedRank: Math.min(predictedRank + 2, 12), projectedClicks: Math.round(monthlyClicks * 0.70), crawlStatus: 'Quality Rater Re-evaluation' },
    { month: 9, label: 'M9 - Peak Growth', predictedRank: Math.max(predictedRank, 1.0), projectedClicks: Math.round(monthlyClicks * 0.95), crawlStatus: 'High Topical Authority' },
    { month: 12, label: 'M12 - Evergreen', predictedRank: Math.max(predictedRank, 1.0), projectedClicks: monthlyClicks, crawlStatus: 'Stable SERP Baseline' },
  ];

  // Live SERP Snippet Preview Data
  const serpSnippet = {
    title: input.title || 'Untitled Document',
    url: `https://example.com${input.urlSlug?.startsWith('/') ? input.urlSlug : '/' + (input.urlSlug || 'article')}`,
    metaDescription: input.metaDescription || (input.body.slice(0, 150) + '...'),
    isTruncated: titleResult.isTruncated,
    pixelWidth: titleResult.pixelWidth,
  };

  // Optional Variant B Split Test Evaluation
  let variantBComparison: SeoSimulationResult['variantBComparison'];
  if (input.isSplitTest && input.variantBTitle) {
    const varBTitleAnalysis = analyzeTitleTag(input.variantBTitle, input.targetKeyword);
    const varBMetaAnalysis = analyzeMetaDescription(input.variantBMeta || '', input.targetKeyword);

    const scoreDelta = (varBTitleAnalysis.score - titleResult.score) * 0.6 + (varBMetaAnalysis.score - metaResult.score) * 0.4;
    const varBOverallScore = Math.min(Math.max(Math.round(overallSeoScore + (scoreDelta * 20)), 15), 100);

    let varBRank = predictedRank - (scoreDelta * 3);
    varBRank = Math.max(Math.round(varBRank * 10) / 10, 1.0);

    const varBCtr = getCtrForRank(varBRank, schemaResult.richSnippetEligible, isAiOverview);
    const varBClicks = Math.round(monthlyImpressions * (varBCtr / 100));

    const winMargin = Math.round((monthlyClicks - varBClicks));
    const winner = winMargin > 20 ? 'VARIANT_A' : winMargin < -20 ? 'VARIANT_B' : 'TIE';

    variantBComparison = {
      predictedRank: varBRank,
      predictedCtr: varBCtr,
      monthlyClicks: varBClicks,
      overallScore: varBOverallScore,
      winMargin,
      winner,
      summary: winner === 'VARIANT_A'
        ? `Variant A wins by +${Math.abs(winMargin)} estimated monthly clicks due to tighter keyword placement and higher CTR triggers.`
        : winner === 'VARIANT_B'
        ? `Variant B wins by +${Math.abs(winMargin)} estimated monthly clicks with a stronger search hook and optimal pixel width.`
        : 'Both variants perform virtually identically on search engine algorithms.',
    };
  }

  return {
    predictedRank: Math.round(predictedRank * 10) / 10,
    predictedCtr,
    monthlyImpressions,
    monthlyClicks,
    trafficValue,
    geoCitationScore,
    eeatScore,
    helpfulContentScore: helpfulScore,
    overallSeoScore,
    richSnippetEligible: schemaResult.richSnippetEligible,
    algorithmFactors: factors,
    recommendations,
    timeline,
    serpSnippet,
    variantBComparison,
  };
}
