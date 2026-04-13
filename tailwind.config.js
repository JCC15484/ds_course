/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
      },
      animation: {
        'pixel-bounce': 'pixelBounce 1s infinite',
        'pixel-pulse': 'pixelPulse 2s infinite',
        'pixel-slide-in': 'pixelSlideIn 0.5s ease-out',
        'pixel-fade-in': 'pixelFadeIn 0.8s ease-out',
      },
      keyframes: {
        pixelBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pixelPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        pixelSlideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pixelFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
