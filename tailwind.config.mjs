/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme tokens (see AGENTS.md). Keep to these; don't add new systems.
        paper: '#f7f6f3', // page background
        ink: '#15110d', // primary text
        slate: '#5c6470', // secondary text / muted
        accent: {
          DEFAULT: '#1e3a8a', // navy blue — links, highlights
          soft: '#e4e9f5', // tinted backgrounds / badges
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        prose: '46rem',
      },
    },
  },
  plugins: [],
};
