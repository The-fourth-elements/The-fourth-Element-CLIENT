import { nextui } from '@nextui-org/react';

const config = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				md: '1.5rem',
				lg: '2rem',
			},
		},
	},
	plugins: [
		nextui({
			themes: {
				light: {
					layout: {},
					colors: {},
				},
				dark: {
					layout: {},
					colors: {},
				},
				modern: {
					extend: 'dark',
					colors: {
						background: '#1E1E1E',
						foreground: '#ffffff',
						primary: {
							50: '#fffaec',
							100: '#f26522',
							200: '#ffe6a5',
							300: '#ffd26d',
							400: '#ffb332',
							500: '#d93b20',
							600: '#fe8100',
							700: '#cc5e02',
							800: '#a1490b',
							900: '#823e0c',
							DEFAULT: '#e85721',
							foreground: '#ffffff',
						},
						secondary:{
							600: '#d93b20',
							700: '#fe8100',
							800: '#cc5e02',
							900: '#a1490b',
						},
						focus: '#F182F6',
					},
					layout: {
						fontSize: {
							tiny: '0.75rem', // text-tiny
							small: '0.875rem', // text-small
							medium: '1rem', // text-medium
							large: '1.125rem', // text-large
						},
						disabledOpacity: '0.3',
						radius: {
							small: '1px',
							medium: '2px',
							large: '4px',
						},
						borderWidth: {
							small: '1px',
							medium: '2px',
							large: '3px',
						},
					},
				},
				navcolor: {
					extend: 'dark',
					colors: {
						background: '#0D001A',
						foreground: '#ffffff',
						primary: '#1E1E1E',
						secondary: '#c2c2c2',
						orange: '#F26522',
						boxGreyHard: '#B7B7B7',
					},
				},
			},
		}),
	],
};
export default config;