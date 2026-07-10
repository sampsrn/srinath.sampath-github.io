// ============================================================================
// THE EDIT POINT — change name, photo, tagline, bio, location, and links here.
// No markup edits needed to update this content. See AGENTS.md.
// ============================================================================

export interface ProfileLinks {
  /** Full LinkedIn profile URL. Empty string hides the link. */
  linkedin: string;
  /** Full GitHub profile URL. Empty string hides the link. */
  github: string;
  /** Email address (no mailto:). Empty string hides the link. */
  email: string;
}

export interface Profile {
  name: string;
  /** Path under /public, resolved via asset(). */
  photo: string;
  /** Short headline under the name. */
  tagline: string;
  /** Longer intro blurb shown in the Description section + meta description. */
  description: string;
  location: string;
  links: ProfileLinks;
}

export const profile: Profile = {
  name: 'Srinath Sampath',
  // Placeholder monogram. To use a real photo: drop the file in /public and set
  // this to its filename (e.g. 'me.jpg'). That's the only change needed.
  photo: 'me.svg',
  tagline: 'Engineering Leadership · GenAI & RAG Architecture · Cloud Data Platforms',
  description:
    'Hands-on engineering leader and solution architect with 17+ years building cloud-native ' +
    'data platforms and GenAI-enabled products across life sciences, clinical research, and media. ' +
    'I currently lead three engineering teams (25+ engineers) at Thermo Fisher Scientific — setting ' +
    'architecture direction while personally building agentic AI and Retrieval-Augmented Generation ' +
    '(RAG) systems that automate pharmacovigilance case processing end-to-end. Deep fluency in AWS ' +
    'serverless, Aurora PostgreSQL, Python, and modern LLM tooling, with full ownership of the SDLC, ' +
    'architecture standards, and budget from business case through production.',
  location: 'Tennessee, USA',
  links: {
    linkedin: 'https://www.linkedin.com/in/srinath-sampath',
    github: 'https://github.com/sampsrn',
    email: 'srinath.sampath01@gmail.com',
  },
};

/**
 * Prefix a public asset path with the site's base URL so paths stay portable.
 * Resolves to `/` at the custom-domain root. Always route image/asset URLs
 * through this helper (see AGENTS.md golden rule #3).
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}
