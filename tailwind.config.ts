import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // On crée des animations CSS pures ici
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'text-slide': 'textSlide 8s cubic-bezier(0.075, 0.82, 0.165, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        textSlide: {
          '0%, 20%': { transform: 'translateY(0%)' },
          '25%, 45%': { transform: 'translateY(-33.33%)' },
          '50%, 70%': { transform: 'translateY(-66.66%)' },
          '75%, 95%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;