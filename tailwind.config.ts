import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'theme-gradient':
          'radial-gradient(circle at 50% 50%, rgb(var(--gray-10)) 20%, transparent 80%), conic-gradient(from 45deg at 50% 50%, rgb(var(--gray-0)) 0%, rgb(var(--gray-10)) 25%, rgb(var(--gray-0)) 50%, rgb(var(--gray-10)) 75%, rgb(var(--gray-0)) 100%)',
      },
      colors: {
        slack: '#4a154b',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: 'var(--primary)',
        'sidebar-gray': 'var(--secondary)',
        'channel-gray': 'var(--channel-gray)',
        'icon-gray': 'var(--icon-gray)',
        'hover-gray': '#f8f8f814',
      },
      fontFamily: {
        lato: ['Lato', 'Arial', 'sans-serif'],
        outfit: ['Outfit', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
