/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "synthwave",
      "night",
      "dracula",
      "cupcake",
      "corporate",
      "luxury",
      "forest",
      "lofi",
      "wireframe",
      "black",
      "business",
    ],
  },
  plugins: [require("daisyui")],
};
