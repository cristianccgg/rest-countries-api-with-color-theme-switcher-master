module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // Colores para modo claro
        "light-very-dark-blue-text": "hsl(200, 15%, 8%)",
        "light-very-light-gray-background": "hsl(0, 0%, 98%)",
        "light-white-text-elements": "hsl(0, 0%, 100%)",

        // Colores para modo oscuro
        "dark-dark-blue-elements": "hsl(209, 23%, 22%)",
        "dark-very-dark-blue-background": "hsl(207, 26%, 17%)",
        "dark-very-dark-blue-text": "hsl(200, 15%, 8%)",
        "dark-gray-input": "hsl(0, 0%, 52%)",
      },
    },
  },

  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
    },
  },

  plugins: [],
};
