/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'michroma': ['Michroma', 'sans-serif'],
        'sans': ['Nunito Sans', 'sans-serif'],
        'title': ['Michroma', 'sans-serif'],
        'heading': ['Michroma', 'sans-serif'],
        'paragraph': ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}