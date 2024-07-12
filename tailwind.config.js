/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "1Very-Dark-Blue-Light-Mode-Text": "hsl(200, 15%, 8%)",
        "2Very-Light-Gray-Light-Mode-Background": "hsl(0, 0%, 98%)",
        "3White-Dark-Mode-Text-&-Light-Mode-Elements": "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
