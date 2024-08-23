import WishList from "./src/Components/WishListComponents/WishList";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "base-1": ["1.0625rem", "1.25rem"], //17px-20px
        "base-2": ["1.0625rem", "1.0625rem"], //17px-17px
        "base-3": ["1.25rem", "1.5rem"], // 20px-24px
        "base-4": ["1.0625rem", "1.375rem"], //17px-22px
        "base-5": ["1.375rem", "1.125rem"], //22px-18px
        "input-text": ["1.0625rem", "2.625rem"], //17px-22px
        price: ["1.0625rem", "1.7318rem"], //17px-27.7px
        itemName: ["1rem", "1.44rem"], //16px-23px
        "base-5": ["1.125rem", "1.625rem"], //18px-26px
        h3: ["4.25rem", "4.75rem"], //68px-76px
        h2: ["2.125rem", "2.75rem"], //34px-44px
        priceText: ["1.5rem", "1.5rem"], // 20px-24px
      },
      width: {
        "3/10": "30%",
        "7/10": "70%",
        categoryCard: "16.875rem", //270px
        itemCardImage: "16.875rem", //270px
        "10-per": "12.5%",
        "90-per": "87.5%",
      },
      height: {
        108: "28rem", //448px
        15: "3.75rem", //60px
        categoryCard: "26.25rem", //420px
        itemCardImage: "21.875rem", //350px
        WishList: "8.125rem", //130px
        200: "200px",
      },
      colors: {
        primary: "#f5f5f5",
        "banner-bg": "#f6e6cf",
        "card-bg": "#f7f7f7",
        "hover-color": "#c8815f",
        "gray-text": "#999999",
        black11: "#111111",
      },
      padding: {
        15: "3.75rem", //60px
        WishList: "0.625rem", //10px
      },
      borderRadius: {
        "5xl": "4rem", //64px
      },
      transitionTimingFunction: {
        "in-out": "cubic-bezier(0, 0, 0.2, 1)",
      },
      gap: {
        4.5: "0.875rem",
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      zIndex: {
        999: 999999999,
      },
    },
  },
  plugins: [],
};
