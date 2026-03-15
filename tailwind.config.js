/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A14',
        card: '#12122A',
        elevated: '#1A1A3E',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0B8',
        'text-muted': '#6B6B80',
        accent: {
          pink: '#FF6B9D',
          purple: '#8B5CF6',
          cyan: '#00D9A5',
          green: '#00D9A5',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 50%, #00D9A5 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,107,157,0.1) 0%, rgba(139,92,246,0.1) 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(0,217,165,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(255,107,157,0.4)',
        'glow-purple': '0 0 20px rgba(139,92,246,0.4)',
        'glow-cyan': '0 0 30px rgba(0,217,165,0.5)',
        'glow-green': '0 0 30px rgba(0,217,165,0.5)',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient-shift 4s ease infinite',
        'float': 'float 20s ease-in-out infinite',
        'text-reveal': 'textReveal 0.8s ease forwards',
        'particle': 'particleFloat 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'textReveal': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        'particleFloat': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -15px) rotate(90deg)' },
          '50%': { transform: 'translate(5px, -25px) rotate(180deg)' },
          '75%': { transform: 'translate(-5px, -15px) rotate(270deg)' },
        },
        'glowPulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
