import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface AiSeoAnalysis {
  intentMatch: string;
  informationGain: string;
  snippetCritique: string;
  strategicAdvice: string;
  suggestedAltTitles: string[];
  suggestedFaqItems: { question: string; answer: string }[];
}

export async function analyzeSeoContentWithAi(params: {
  searchEngine: string;
  searchIntent: string;
  targetKeyword: string;
  title: string;
  metaDescription?: string;
  body: string;
}): Promise<AiSeoAnalysis> {
  const { searchEngine, searchIntent, targetKeyword, title, metaDescription, body } = params;

  // If Gemini is available, run prompt
  if (genAI && apiKey) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `
You are the world's leading Search Engine Algorithm Strategist & Generative Engine Optimization (GEO) expert for SEOlabs.
Analyze the following webpage draft:

SEARCH ENGINE TARGET: ${searchEngine}
SEARCH INTENT: ${searchIntent}
PRIMARY TARGET KEYWORD: "${targetKeyword}"
TITLE TAG: "${title}"
META DESCRIPTION: "${metaDescription || 'None'}"

CONTENT BODY SAMPLE:
"${body.slice(0, 3000)}"

Respond strictly in valid JSON format with this exact structure:
{
  "intentMatch": "Direct assessment of how well this meets the user's explicit and implicit search intent",
  "informationGain": "Evaluation of whether this page adds unique insights or regurgitates existing SERP results",
  "snippetCritique": "Critique of the title tag and meta description for click-through rate in search results",
  "strategicAdvice": "2-3 high-impact tactical steps to dominate the search results for this query",
  "suggestedAltTitles": ["Alternative high-CTR Title 1", "Alternative high-CTR Title 2", "Alternative high-CTR Title 3"],
  "suggestedFaqItems": [
    { "question": "Relevant FAQ Question 1?", "answer": "Direct 2-sentence answer for Google FAQ rich snippet & AI Overview citation." },
    { "question": "Relevant FAQ Question 2?", "answer": "Direct 2-sentence answer for Google FAQ rich snippet & AI Overview citation." }
  ]
}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonStr = text.substring(jsonStart, jsonEnd + 1);
        return JSON.parse(jsonStr) as AiSeoAnalysis;
      }
    } catch (err) {
      console.warn('Gemini API call skipped or failed, falling back to local analysis:', err);
    }
  }

  // Fallback intelligent heuristic analysis
  const hasIntentWord = body.toLowerCase().includes('how') || body.toLowerCase().includes('best');
  return {
    intentMatch: `Content demonstrates ${hasIntentWord ? 'strong' : 'moderate'} alignment with ${searchIntent.toLowerCase()} search intent for "${targetKeyword}". Ensure all user sub-questions are answered above the fold.`,
    informationGain: `To stand out against indexed competitors, inject original data, proprietary benchmarks, or direct case studies rather than surface-level definitions.`,
    snippetCritique: title.length >= 45 && title.length <= 60
      ? `Title tag length is optimal for Google desktop and mobile SERPs without truncation risk.`
      : `Refine title tag to 50-60 characters and lead with the primary keyword "${targetKeyword}".`,
    strategicAdvice: `1. Structure key concepts into bulleted takeaways for Google AI Overview snippet capture. 2. Implement JSON-LD FAQ schema. 3. Interlink 3-4 related topic cluster pages to build topical authority.`,
    suggestedAltTitles: [
      `The Ultimate ${targetKeyword} Guide for 2026 [Tested Strategies]`,
      `How to Master ${targetKeyword}: Step-by-Step Walkthrough`,
      `Best ${targetKeyword} Frameworks & Examples (Full Breakdown)`
    ],
    suggestedFaqItems: [
      {
        question: `What is the most effective approach to ${targetKeyword}?`,
        answer: `The most effective approach combines thorough search intent matching, structured semantic headings, and verifiable first-hand experience.`
      },
      {
        question: `How long does it take for a ${targetKeyword} page to rank?`,
        answer: `Most newly indexed pages take between 3 to 6 months to emerge from the Google sandbox and achieve peak organic ranking.`
      }
    ]
  };
}
