import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        dark: {
          background: '#1e1e2e',
          card: '#2e2e42',
          text: '#f5f5f7',
          input: '#3e3e5e',
          placeholder: '#b0b0c7',
        },
      },
      fontSize: {
        '10xl': '10rem', // 160px
        '11xl': '12rem', // 192px
        '12xl': '14rem', // 224px
      },
    },
  },
  plugins: [],
} satisfies Config
