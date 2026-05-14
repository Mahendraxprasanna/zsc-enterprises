/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      cream: '#F3EDE3', 
        cream2: '#F3EDE3',
        cream3: '#EDE5D8',
        cream4: '#E4D9C8',
        orange: '#E8650A',
        orange2: '#FF7A20',
        pink: '#D4186C',
        pink2: '#E8267E',
        dark: '#1A1208',
        dark2: '#2C1F0E',
        txt: '#2A1E10',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        jost: ['Jost', 'sans-serif'],
      },
      backgroundImage: {
        'brand-grad': 'linear-gradient(135deg, #E8650A, #D4186C)',
      },
    },
  },
  plugins: [],
}
