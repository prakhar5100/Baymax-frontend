/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
  
      boxShadow: {
        'glow': '0 0 10px #2b374b', // Custom glow shadow
      },
      fontFamily: {
        poppins : ['Poppins'],
        poppinsBold : ['Poppins-Bold']
      },
      backgroundImage: {
        "bg-image" : "url('src/assets/images/baymax_wallpaper.jpg')",
        "faq" : "url('src/assets/images/faq.jpg')"
      },
      dropShadow: {
        'glow': '0 0 10px rgba(255,255,255,0.5)', // Custom glow shadow
      },
    },
  },
  plugins: [],
}