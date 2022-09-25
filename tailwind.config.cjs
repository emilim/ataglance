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
          "--back": "#e5e5e5",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "pure": "white",
          "--back": "#1f242d",
        },

      }
    ],
  },
}
