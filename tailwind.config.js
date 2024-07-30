/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of your template files
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // For React applications
    './public/index.html',          // For HTML files
    // Add other paths if you have more templates
  ],
  
  // Define the theme and extend it with custom values
  theme: {
    extend: {
      colors: {
        primary: '#34ff8083',
        secondary: '#ffed4a',
        accent: '#e3342f',
        tableGreen: '#477148',
        background: '#19284c'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      // Add other customizations here
    },
  },
  
  // Add plugins if needed
  plugins: [
    // Example: require('@tailwindcss/forms'),
    // Add other plugins here
  ],
  
  // Optionally, enable dark mode
  darkMode: 'media', // or 'class' for class-based dark mode
}
