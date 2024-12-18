import defaultTheme from 'tailwindcss/defaultTheme';

export default  {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", ...defaultTheme.fontFamily.sans],
        barlow: ["Barlow", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        fade: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      animation: {
        fade: 'fade 1.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
