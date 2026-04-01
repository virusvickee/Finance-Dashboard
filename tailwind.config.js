/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        pink: 'rgb(var(--pink) / <alpha-value>)',
        emerald: 'rgb(var(--emerald) / <alpha-value>)',
        amber: 'rgb(var(--amber) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        white: 'rgb(var(--foreground) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
