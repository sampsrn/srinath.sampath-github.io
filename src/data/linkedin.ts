// ============================================================================
// Curated LinkedIn posts — MANUAL curation only (no API/scraping). See AGENTS.md.
// Keep newest-first. `type: 'mine'` = your own post; 'shared' = someone else's.
// If `embed` (a LinkedIn iframe embed URL) is present, the card renders an
// iframe; otherwise it renders a link card.
//
// These two entries are EDITABLE PLACEHOLDERS demonstrating both render paths.
// Replace the urls/blurbs with real posts.
// ============================================================================

export interface Post {
  type: 'mine' | 'shared';
  author: string;
  date: string;
  blurb: string;
  url: string;
  /** Optional LinkedIn embed URL — when present, renders an iframe instead of a link card. */
  embed?: string;
}

export const posts: Post[] = [
  {
    type: 'mine',
    author: 'Srinath Sampath',
    date: 'Jun 2026',
    blurb:
      'How we cut pharmacovigilance case-processing time by 40% with an agentic RAG pipeline — ' +
      'vector retrieval over regulatory knowledge bases, LLM adverse-event extraction, and ' +
      'human-in-the-loop guardrails on a serverless AWS stack. (Placeholder — replace with a real post URL.)',
    url: 'https://www.linkedin.com/in/srinath-sampath',
  },
  {
    type: 'shared',
    author: 'AWS',
    date: 'May 2026',
    blurb:
      'A great write-up on orchestrating long-running LLM workflows with Step Functions — closely ' +
      'mirrors patterns we use in production. (Placeholder — replace with a real shared post URL.)',
    url: 'https://www.linkedin.com/company/amazon-web-services',
  },
];
