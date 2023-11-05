import React from 'react'
import {RiPagesFill} from "react-icons/ri"
import { useThemeContext } from '../Context/themeContext'
import hero from "../images/hero.svg"
const Home = () => {
  const {darkMode} = useThemeContext()
  return (
    <>
    <section className={darkMode ? "modetran h-screen bg-gray-950 text-white" : "modetran h-screen bg-white text-black"} >
      <div className='relative lg:top-24 top-14 lg:gap-0 gap-9 flex flex-col lg:flex-row items-center justify-between w-11/12 lg:w-10/12 mx-auto py-5 px-3  '> 
        {/* image */}
        <div className={darkMode ? 'modetran lg:w-4/12 lg:px-7 lg:py-9 rounded-full bg-gray-800' : 'modetran lg:w-4/12 lg:px-7 lg:py-9 rounded-full bg-stone-100' } >
          <img className='h-80 ' src={hero}/>
        </div>
        {/* text */}
        <div className='lg:w-6/12 py-2' >
          <h1 className={darkMode ? 'lg:text-3xl text-teal-200 text-2xl' : 'lg:text-3xl text-2xl'} > Welcome to CodeBlogs! </h1>
          <h1 className='text-lg my-3' > Create better designed websites, products and applications. Browse to find the images that fit your messaging, automagically customise the color to match your brand and use it as a normal image, embedded code or directly in your design workflow. </h1>
          <button className={darkMode ? 'modetran flex gap-1 items-center text-green-500 border-white border-2 px-3 py-1.5 rounded-md' : 'modetran flex gap-1 items-center text-green-900 border-teal-900 border-2 px-3 py-1 rounded-md'} > <RiPagesFill/> Explore Blogs </button>
        </div>
      </div>
    </section>
    </>
  )
}

export default Home