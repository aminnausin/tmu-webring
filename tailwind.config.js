// tailwind.config.js
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}', // add your component directories here
    ],
    theme: {
        extend: {
            fontFamily: {
                'dm-sans': ['DM Sans', 'sans-serif'], // Add DM Sans to the sans font stack
            },
        },
    },
    plugins: [],
};
