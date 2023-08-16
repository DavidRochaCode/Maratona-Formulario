/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cor1': '#0ec0c1',
        'cor2': '#210123',
        'primary': '#0ec0c1',
      },
      backgroundImage: {
        'back': "url('../../public/blob-scene-bg.png')",

      },
    },
  },
  plugins: [],
}
