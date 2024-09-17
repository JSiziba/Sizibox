/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                darkEbony: "#282842",
                hippieBlue: "#63A5B6",
                greyBg: "#F5F5F8",
                steelBlue: "#4482A9",
                cyan: "#5BA4E8"
            }
        },
    },
    plugins: [],
}

