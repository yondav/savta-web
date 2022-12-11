/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
        accent: {
          blue: 'var(--accent-blue)',
          red: 'var(--accent-red)',
          green: 'var(--accent-green)',
          orange: 'var(--accent-orange)',
          pink: 'var(--accent-pink)',
          purple: 'var(--accent-purple)',
        },
        bright: {
          blue: 'var(--bright-blue)',
          red: 'var(--bright-red)',
          green: 'var(--bright-green)',
          orange: 'var(--bright-orange)',
          pink: 'var(--bright-pink)',
          purple: 'var(--bright-purple)',
        },
        medium: {
          blue: 'var(--medium-blue)',
          red: 'var(--medium-red)',
          green: 'var(--medium-green)',
          orange: 'var(--medium-orange)',
          pink: 'var(--medium-pink)',
          purple: 'var(--medium-purple)',
        },
        light: {
          blue: 'var(--light-blue)',
          red: 'var(--light-red)',
          green: 'var(--light-green)',
          orange: 'var(--light-orange)',
          pink: 'var(--light-pink)',
          purple: 'var(--light-purple)',
        },
      },
    },
  },
  plugins: [],
};
