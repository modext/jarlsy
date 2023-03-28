const plugin = require("tailwindcss/plugin");

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible"
    },
    ".backface-hidden": {
      "backface-visibility": "hidden"
    }
  });
});
module.exports = {
  mode: "jit",
  purge: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textIndent: {
      1: "0.25rem",
      2: "0.5rem"
    },
    extend: {
      scale: {
        101: "1.01"
      },
      margin: {
        marginLeft: "17rem"
      },
      inset: {
        "5/6": "78.5%",
        "6/8": "-19%"
      },
      padding: {
        small: "1.08rem"
      },
      height: {
        small: "50vw",
        large: "90vh",
        sec: "95vh",
        prHeight: "23.5rem",
        panel: "87.5vh",
        h: "84.8%",
        heightImg: "13.5rem"
      },
      width: { secFull: "96%", w87: "87%", widthImg: "13.5rem" },
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(0rem)"
          },
          "100%": {
            transform: "translateX(-140rem)"
          }
        }
      },
      animation: {
        slide: "slide 119s ease-in-out 25s infinite"
      },
      boxShadow: {
        dark: "0 0px .4rem rgba(79, 79, 79, 0.6)",
        sm_dark: "0 0px 0.5rem rgb(0 0 0 / 11%)",
        darkest: "0 0 .49rem rgba(231, 231, 231, 0.5)",
        darker: "1px 0px .7rem rgb(121 121 121 / 34%)"
      },
      zIndex: {
        "-1": "-10"
      },
      fontSize: { ui: "1.055rem", small: ".945rem", nav: "1.4rem" },
      fontFamily: {
        brand: "Rubik,serif",
        secondary: "Satisfy, cursive",
        logo: "Poppins, sans-serif"
      }
    }
  },
  variants: {
    extend: {
      colors: {
        brand: "#FF385C"
      },
      scale: ["hover", "group-hover"],
      fill: ["hover", "focus"]
    }
  },
  plugins: [require("tailwindcss-typography")(), backfaceVisibility]
};
