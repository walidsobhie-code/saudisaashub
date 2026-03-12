/** @type {import('tailwindcss').Config} */
module.exports = {
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
    },
  },
  plugins: [],
}
