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
        playfair: ['var(--font-playfair)'],
        lato: ['var(--font-lato)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        slidedown: 'slidedown 0.5s ease-in-out',
        'gradient-xy': 'gradient-xy 3s ease infinite',
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
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
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
              50: '#e5e5e5',
              100: '#cccccc',
              200: '#999999',
              300: '#666666',
              400: '#333333',
              500: '#000000', // main
              600: '#000000',
              700: '#000000',
              800: '#000000',
              900: '#000000',
              DEFAULT: '#000000',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#fff5f6',
              100: '#ffe5e7',
              200: '#ffc2c4',
              300: '#ff9fa1',
              400: '#ff7c7e',
              500: '#FF8789', // main
              600: '#e06c6e',
              700: '#b84e50',
              800: '#8f383a',
              900: '#662223',
              DEFAULT: '#FF8789',
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: '#f5f5f5',
              100: '#eaeaea',
              200: '#d5d5d5',
              300: '#bfbfbf',
              400: '#aaaaaa',
              500: '#ffffff', // main
              600: '#cccccc',
              700: '#999999',
              800: '#666666',
              900: '#333333',
              DEFAULT: '#ffffff',
              foreground: '#000000',
            },
            secondary: {
              50: '#fbeaec',
              100: '#f5cfd3',
              200: '#eea3a9',
              300: '#e7777f',
              400: '#e04b55',
              500: '#881D1F', // main
              600: '#6c1719',
              700: '#501113',
              800: '#340b0c',
              900: '#180506',
              DEFAULT: '#881D1F',
              foreground: '#ffffff',
            },
            foreground: '#ffffff',
          },
        },
      },
    }),
  ],
}
