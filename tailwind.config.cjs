/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "pure": "black",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "pure": "white",
        },

      }
    ],
  },
}
