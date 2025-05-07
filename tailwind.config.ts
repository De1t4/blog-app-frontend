import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderColor:{
          doubleBorder:'border-image:linear-gradient(to right, #0a2170, #3182ce) border-image-slice:1;'
      },
      colors:{
        'gold':"#F3BF3A"
      }
  
    },

  }
  ,
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar'),
    nextui()
  ],
}
export default config
