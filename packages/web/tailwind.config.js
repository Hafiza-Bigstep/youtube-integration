const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#652dbf',
          light: '#eaf1ff',
          darkLight: 'rgba(67,97,238,.15)',
        },
        secondary: {
          DEFAULT: '#805dca',
          light: '#ebe4f7',
          darkLight: 'rgb(128 93 202 / 15%)',
        },
        success: {
          DEFAULT: '#00ab55',
          light: '#ddf5f0',
          darkLight: 'rgba(0,171,85,.15)',
        },
        danger: {
          DEFAULT: '#e7515a',
          light: '#fff5f5',
          darkLight: 'rgba(231,81,90,.15)',
        },
        warning: {
          DEFAULT: '#e2a03f',
          light: '#fff9ed',
          darkLight: 'rgba(226,160,63,.15)',
        },
        info: {
          DEFAULT: '#2196f3',
          light: '#e7f7ff',
          darkLight: 'rgba(33,150,243,.15)',
        },
        dark: {
          DEFAULT: '#3b3f5c',
          light: '#eaeaec',
          darkLight: 'rgba(59,63,92,.15)',
        },
        black: {
          DEFAULT: '#0e1726',
          light: '#e3e4eb',
          darkLight: 'rgba(14,23,38,.15)',
          themeBlack: '#010e21 ',
        },
        white: {
          DEFAULT: '#ffffff',
          light: '#e0e6ed',
          dark: '#888ea8',
          themeWhite: '#F5F8FE',
        },
        gray: {
          DEFAULT: '#6B7280',
          lightGray: 'rgb(247, 247, 247)',
          themeGray: '#7C878E ',
        },
        purple: {
          DEFAULT: '#652dbf',
          Light: '#F4EDFF',
          BTNCOLOR: '#F0F8FF',
          BGCOLOR: '#FAF7FF',
        },
        btnColor: {
          myColor: 'rgb(101, 45, 191)',
          dark: 'rgb(101, 45, 195)',
          light: '#873cFF',
        },
        themeColor: {
          themeblue: 'rgb(0, 114, 177, 1)',
          light: 'rgb(248, 244, 255, 1)',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      spacing: {
        4.5: '18px',
      },
      boxShadow: {
        '3xl':
          '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
        themeShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 20px',
        cardShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      },
      zIndex: {
        100: '100',
      },
      inset: {
        20: '4.5rem',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-invert-headings': theme('colors.white.dark'),
            '--tw-prose-invert-links': theme('colors.white.dark'),
            h1: {
              fontSize: '40px',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'Playfair Display, serif',
            },
            h2: {
              fontSize: '32px',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'Playfair Display, serif',
            },
            h3: {
              fontSize: '28px',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'Playfair Display, serif',
            },
            h4: {
              fontSize: '24px',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'Playfair Display, serif',
            },
            h5: {
              fontSize: '20px',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'Playfair Display, serif',
            },
            h6: {
              fontSize: '16px',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'Playfair Display, serif',
            },
            p: { marginBottom: '0.5rem' },
            li: { margin: 0 },
            img: { margin: 0 },
          },
        },
      }),
      screens: {
        xs: '340px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontSize: {
        xs: '0.6rem',
        'sm:': '0.8rem',
        base: '1rem', // base font size
        lg: '1.125rem', // large font size
        xl: '1.25rem', // extra large font size
        '2xl': '1.5rem', // 2x extra large font size
        '3xl': '1.875rem', // 3x extra large font size
      },
    },
  },
  plugins: [],
};
