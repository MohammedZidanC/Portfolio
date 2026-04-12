import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':       '#0a0a0a',
        'bg-secondary':     '#111111',
        'bg-tertiary':      '#1a1a1a',
        'accent-primary':   '#7c3aed',
        'accent-secondary': '#06b6d4',
        'accent-gold':      '#f59e0b',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        heading:  ['Syne', 'sans-serif'],
        body:     ['General Sans', 'sans-serif'],
        mono:     ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'blob-drift': 'blob-drift-1 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
