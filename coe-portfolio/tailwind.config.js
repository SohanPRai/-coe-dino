/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg:     '#ffffff',
          navy:   '#f0f4ff',
          darker: '#e8ecf8',
          cyan:   '#0066cc',   // deep blue accent
          blue:   '#3b82f6',
          purple: '#f97316',   // orange — complementary to blue (used as secondary accent)
          light:  '#1a1a2e',
        }
      },
      fontFamily: {
        // All three slots now resolve to monospace / Space Mono
        space: ['"Space Mono"', '"Courier New"', 'monospace'],
        sans:  ['"Space Mono"', '"Courier New"', 'monospace'],
        mono:  ['"Space Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        // Hard flat offset shadows — blue default, orange on hover
        neon:         '7px 7px 0 #0066cc',
        'neon-strong': '9px 9px 0 #f97316',
        'neon-purple': '7px 7px 0 #f97316',
        glass:        '7px 7px 0 #0066cc',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
        'glow-gradient':  'radial-gradient(circle at center, rgba(0,102,204,0.10) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
