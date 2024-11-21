/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  
  ],
  theme: {  
    extend: {  
      colors: {  
        night: '#000F08',  
        lion: '#C19875',  
        mossGreen: '#8C9071',  
        viridian: '#57886C',  
        ashGray: '#A6C4B2',  
        mintCream: '#F4FFF8',  
        paleDogwood: '#F4D9CF',  
        melon: '#F3B3A6',  
      },  
    },  
  },
  plugins: [],
}