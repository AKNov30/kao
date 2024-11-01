/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-navbar': 'calc(80vh)',
      },
      margin: {
        '66px': '66px',
      },
      screens: {
        '3xl': '1920px', // หน้าจอ 1920px
        '4xl': '2560px', // หน้าจอ 2K
        '5xl': '3200px', // หน้าจอ 3K
        '6xl': '3840px', // หน้าจอ 4K
        '8xl': '7680px', // หน้าจอ 8K
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}