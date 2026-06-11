import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFFBEF',
          50: '#FFFDF7',
          100: '#FFFBEF',
          200: '#FFF5D6',
          300: '#FCECC0',
        },
        ink: {
          DEFAULT: '#1C1917',
          light: '#44403C',
        },
        stone: {
          warm: '#78716C',
          light: '#A8A29E',
          border: '#E7E0D0',
        },
        raspberry: {
          DEFAULT: '#8B2F82',
          50: '#F9F0F8',
          100: '#F0D6EE',
          200: '#D9A0D4',
          300: '#BE6AB7',
          400: '#A6449E',
          500: '#8B2F82',
          600: '#7A2872',
          700: '#641F5E',
          800: '#4E1849',
          900: '#38112F',
        },
        amber: {
          warm: '#D97706',
          light: '#FEF3C7',
        },
        success: '#16A34A',
        open: '#15803D',
        closed: '#B45309',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,8vw,5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem,5vw,3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem,3.5vw,2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem,2.5vw,1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(28,25,23,0.04), 0 4px 12px rgba(28,25,23,0.06)',
        'card-hover': '0 4px 8px rgba(28,25,23,0.06), 0 16px 32px rgba(28,25,23,0.1)',
        'raspberry': '0 8px 24px rgba(139,47,130,0.25)',
        'raspberry-lg': '0 16px 48px rgba(139,47,130,0.2)',
        'warm': '0 4px 16px rgba(217,119,6,0.2)',
      },
      backgroundImage: {
        'hero-warm': 'linear-gradient(160deg, #FFFBEF 0%, #FFF5D6 50%, #FCECC0 100%)',
        'raspberry-gradient': 'linear-gradient(135deg, #8B2F82 0%, #641F5E 100%)',
        'warm-gradient': 'linear-gradient(135deg, #FFFBEF 0%, #FFF5D6 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'bounce-dot': 'bounceDot 0.6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'chat-bounce': 'chatBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceDot: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        chatBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.02)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
