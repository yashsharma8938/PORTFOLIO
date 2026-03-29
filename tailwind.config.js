/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          blue: '#4F8EF7',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
        },
        dark: {
          950: '#050508',
          900: '#0A0A0F',
          800: '#111118',
          700: '#1A1A24',
          600: '#22222F',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(79,142,247,0.3)' },
          to: { boxShadow: '0 0 25px rgba(139,92,246,0.6)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse at center top, #0f0f1f 0%, #050508 60%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
