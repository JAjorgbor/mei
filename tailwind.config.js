// tailwind.config.js
const { heroui } = require('@heroui/theme') // ✅ import from @heroui/theme not @heroui/react

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './scaffold/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)'], // 👈 Add your font variable here
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        slidedown: 'slidedown 0.5s ease-in-out',
      },
      keyframes: {
        slidedown: {
          '0%': {
            top: '-100%',
          },
          '100%': {
            top: '0',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              90: '#000000',
              100: '#000000',
              200: '#000000',
              300: '#000000',
              400: '#000000',
              600: '#000000',
              500: '#000000',
              foreground: '#ffffff',
              DEFAULT: '#000000',
            },
            secondary: { DEFAULT: '#FF8789', foreground: '#ffffff' },
            background: '#ffffff',
            foreground: '#000000',
          },
        },
        dark: {
          colors: {
            primary: {
              90: '#ffffff',
              100: '#ffffff',
              200: '#ffffff',
              300: '#ffffff',
              400: '#ffffff',
              600: '#ffffff',
              500: '#ffffff',
              DEFAULT: '#ffffff',
              foreground: '#000000',
            },
            secondary: '#881D1F',
            background: '#0a0a0a',
            foreground: '#ffffff',
          },
        },
      },
    }),
  ],
}
