/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-cyan': 'var(--accent-cyan)',
        'accent-purple': 'var(--accent-purple)',
        'accent-green': 'var(--accent-green)',
        'accent-red': 'var(--accent-red)',
        'primary': 'var(--bg-primary)',
        'card': 'var(--bg-card)',
      },
    },
  },
  plugins: [],
}
