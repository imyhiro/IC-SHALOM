/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales de Shalom
        shalom: {
          black: '#0a0a0a',
          dark: '#111111',
          gray: '#1a1a1a',
          light: '#f5f5f5',
          white: '#ffffff',
          gold: '#d4a853',
          'gold-light': '#e8c97a',
          amber: '#f59e0b',
          orange: '#ea580c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flame': 'flame 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flame: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 20px rgba(212, 168, 83, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 40px rgba(212, 168, 83, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'fire-gradient': 'linear-gradient(180deg, #ea580c 0%, #d4a853 50%, #f59e0b 100%)',
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(212, 168, 83, 0.4)',
        'glow-orange': '0 0 30px rgba(234, 88, 12, 0.4)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
