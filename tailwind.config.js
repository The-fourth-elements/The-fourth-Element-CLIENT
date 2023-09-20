import { nextui } from '@nextui-org/react'

const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    }
  },
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {}
        },
        dark: {
          layout: {},
          colors: {}
        },
        modern: {
          extend: 'dark',
          colors: {
            background: '#0D001A',
            foreground: '#ffffff',
            primary: {
              50: '#fffaec',
              100: '#fff4d3',
              200: '#ffe6a5',
              300: '#ffd26d',
              400: '#ffb332',
              500: '#ff9a0a',
              600: '#fe8100',
              700: '#cc5e02',
              800: '#a1490b',
              900: '#823e0c',
              DEFAULT: '#823e0c',
              foreground: '#ffffff'
            },
            focus: '#F182F6'
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '1px',
              medium: '2px',
              large: '4px'
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px'
            }
          }
        }
      }
    })
  ]
}
export default config