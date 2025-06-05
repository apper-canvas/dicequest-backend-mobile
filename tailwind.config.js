/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B4513',
          light: '#A0522D',
          dark: '#654321'
        },
        secondary: {
          DEFAULT: '#FFD700',
          light: '#FFED4E',
          dark: '#DAA520'
        },
        accent: '#DC143C',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        parchment: {
          light: '#F4E4C1',
          DEFAULT: '#E8D7B3',
          dark: '#D4C4A8'
        },
        fantasy: {
          brown: '#2C1810',
          coffee: '#3E2723'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Crimson Text', 'serif'],
        fantasy: ['Cinzel', 'serif'],
        heading: ['Cinzel', 'serif']
      },
      backgroundImage: {
        'parchment': 'linear-gradient(45deg, #F4E4C1 0%, #E8D7B3 100%)',
        'wood': 'linear-gradient(90deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
        'fantasy-bg': 'linear-gradient(135deg, #2C1810 0%, #3E2723 100%)'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'magical': '0 0 20px rgba(255, 215, 0, 0.3)',
        'dice': '0 8px 25px rgba(0, 0, 0, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.1)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'dice-roll': 'diceRoll 0.8s ease-out',
        'level-up': 'levelUp 1s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }
        },
        diceRoll: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) scale(1)' },
          '25%': { transform: 'rotateX(90deg) rotateY(90deg) scale(1.1)' },
          '50%': { transform: 'rotateX(180deg) rotateY(180deg) scale(1.2)' },
          '75%': { transform: 'rotateX(270deg) rotateY(270deg) scale(1.1)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) scale(1)' }
        },
        levelUp: {
          '0%': { transform: 'scale(1)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}