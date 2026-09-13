/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['Orbitron', 'system-ui', 'sans-serif'],
      },
      colors: {
        nexus: {
          bg: '#03060d',
          panel: '#0a121f',
          cyan: '#22d3ee',
          blue: '#38bdf8',
          teal: '#2dd4bf',
          amber: '#fbbf24',
          red: '#f43f5e',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(34, 211, 238, 0.35), 0 0 60px rgba(34, 211, 238, 0.15)',
        'glow-sm': '0 0 12px rgba(34, 211, 238, 0.4)',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.82' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        scan: 'scan 6s linear infinite',
        flicker: 'flicker 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
