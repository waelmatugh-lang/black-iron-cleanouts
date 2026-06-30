import type { Config } from 'tailwindcss';

/**
 * Scale Design — 3-layer token system
 * Layer 1 (primitive): the raw brand palette below (navy / blue / green / steel)
 * Layer 2 (semantic):  CSS variables in globals.css (--bg, --fg, --primary, ...)
 * Layer 3 (component): Tailwind utilities consume the semantic tokens
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primitive brand palette (sampled from the Black Iron logo)
        navy: {
          50: '#eef4fb',
          100: '#d6e3f3',
          200: '#aec7e6',
          300: '#7ba2d3',
          400: '#4d7ab8',
          500: '#2f5d9b',
          600: '#234a7e',
          700: '#1c3b66',
          800: '#152c4d',
          900: '#0f2238',
          950: '#0a1626',
        },
        forest: {
          50: '#edf7f0',
          100: '#d2ecd9',
          200: '#a7d9b6',
          300: '#71be8b',
          400: '#43a065',
          500: '#27824a',
          600: '#1c6b3b',
          700: '#185631',
          800: '#15452a',
          900: '#113824',
          950: '#082014',
        },
        steel: {
          50: '#f6f8fa',
          100: '#eceff3',
          200: '#d5dce4',
          300: '#b0bcca',
          400: '#8595a9',
          500: '#65778e',
          600: '#505f74',
          700: '#424d5e',
          800: '#3a4350',
          900: '#343b45',
          950: '#22272e',
        },
        // Semantic tokens (theme-able via CSS variables)
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-fg': 'rgb(var(--primary-fg) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        // Type scale: 12 14 16 18 20 24 30 36 48 60
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(15 34 56 / 0.04), 0 8px 24px -12px rgb(15 34 56 / 0.18)',
        lift: '0 12px 40px -16px rgb(15 34 56 / 0.30)',
      },
      maxWidth: {
        content: '80rem',
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
        screens: { '2xl': '80rem' },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
