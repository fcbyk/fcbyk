import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'message-pulse': 'message-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'message-pulse': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

export default config;