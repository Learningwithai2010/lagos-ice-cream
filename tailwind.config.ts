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
          DEFAULT: '#FFFAF5',
          50: '#FEFCF8',
          100: '#FFFAF5',
          200: '#FFF0F7',
          300: '#FFE0EE',
        },
        ink: {
          DEFAULT: '#1B2D4D',
          light: '#3D5070',
        },
        stone: {
          warm: '#78716C',
          light: '#A8A29E',
          border: '#E7E0D0',
        },
        raspberry: {
          DEFAULT: '#2E5090',   /* Primary Blue */
          50:  '#EEF3FA',
          100: '#CFDAEF',
          200: '#A0B5DF',
          300: '#7091CF',
          400: '#4A90E2',       /* Secondary Blue — hover states, links */
          500: '#2E5090',       /* Primary Blue — CTAs, nav accents */
          600: '#264480',
          700: '#1E3870',
          800: '#162B56',
          900: '#0E1E3C',
        },
        pink: {
          DEFAULT: '#E8B4D0',   /* Accent Pink — secondary CTAs, badges */
          wash:  '#FFF0F7',
          50:    '#FFF0F7',
          100:   '#F9D6EB',
          200:   '#EFAED3',
          300:   '#E07CB8',
        },
        gold: {
          DEFAULT: '#D4A574',   /* Gold/Bronze — award wall, cone details */
          light:   '#EDD5B0',
          dark:    '#B8883A',
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
        'card': '0 1px 3px rgba(27,45,77,0.04), 0 4px 12px rgba(27,45,77,0.06)',
        'card-hover': '0 4px 8px rgba(27,45,77,0.06), 0 16px 32px rgba(27,45,77,0.1)',
        'raspberry': '0 8px 24px rgba(46,80,144,0.25)',
        'raspberry-lg': '0 16px 48px rgba(46,80,144,0.2)',
        'warm': '0 4px 16px rgba(212,165,116,0.3)',
      },
      backgroundImage: {
        'hero-warm': 'linear-gradient(160deg, #FFFAF5 0%, #FFF0F7 50%, #FFE0EE 100%)',
        'raspberry-gradient': 'linear-gradient(135deg, #2E5090 0%, #1E3870 100%)',
        'warm-gradient': 'linear-gradient(135deg, #FFFAF5 0%, #FFF0F7 100%)',
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
