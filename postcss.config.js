export default {
  plugins: {
    tailwindcss: "./tailwind.config.js", // Specify the path to your Tailwind CSS configuration file
    autoprefixer: {},
    "postcss-prefixer": {
      prefix: "solisoma-modal-", // Specify your desired prefix here
    },
  },
};
