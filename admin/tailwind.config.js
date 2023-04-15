module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/sections/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sidebar-pattern": "url('../assets/images/sidebarPattern.jpg')",
        "login-pattern": "url('../assets/images/loginPattern.jpg')",
      },
      colors: {
        primary: "#003580",
        secondary: "#0071c2",
        tertiary: "#febb02",

        greyLight1: "#f7f7f7",
        greyLight2: "#eeeeee",

        // $color-secondary-dark: #ff7730;

        // $color-tertiary-light: #2998ff;
        // $color-tertiary-dark: #5643fa;
      },
      lineHeight: {
        12: "1.2",
        13: "1.3",
        16: "1.6",
      },
    },
    screens: {
      lg: { max: "1800px" },
      md: { max: "990px" },
      sm: { max: "600px" },
      xs: { max: "400px" },
      minmd: "1700px",
      minlg: "2100px",
    },
    fontFamily: {
      IBMPlex: ["IBM Plex Sans", "sans-serif"],
    },
  },
  plugins: [],
};
