module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)"
      },
      backgroundImage: {
        'grad': "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(59,130,246,0.12) 100%)"
      }
    },
  },
  plugins: [],
};
