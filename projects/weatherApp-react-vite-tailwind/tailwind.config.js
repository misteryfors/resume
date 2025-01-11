/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/background-main1x.jpg')",
      },
      screens: {
        xl: "1120px",
        lg: "960px",
        md: "720px",
        sm: "300px",
      },
      fontSize: {
        10: ['10px', '12px'],
        12: ['12px', '16px'], // Размер 12px с высотой строки 16px
        16: ['16px', '20px'], // Размер 16px с высотой строки 20px
        20: ['20px', '24px'], // Размер 20px с высотой строки 24px
        22: ['22px', '22px'],
        24: ['24px', '32px'], // Размер 24px с высотой строки 32px
        32: ['32px', '32px'], // Размер 32px с высотой строки 32px
        56: ['56px', '56px'],
        112: ['112px', '112px'], // Размер 112px с высотой строки 112px
      },
    },
  },
  plugins: [],
};
