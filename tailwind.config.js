import { heroui, lightLayout } from '@heroui/react'

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
        dark: {
          colors: {
            primary: '#084b83',

            secondary: '#F7A278',
            background: '#0a0a0a',
          }, // dark theme colors
        },
        light: {
          colors: {
            primary: '#084b83',

            secondary: '#F7A278',
          },
        },
        // ... custom themes
      },
    }),
  ],
}
