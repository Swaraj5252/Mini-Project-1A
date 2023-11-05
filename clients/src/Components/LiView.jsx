import React from 'react'
import nothing from "../images/nothing.svg"
import { useThemeContext } from '../Context/themeContext'
import {AiFillCaretRight} from "react-icons/ai"

const LiView = ({filteredBlogs}) => {
  const {darkMode} = useThemeContext()
  return (
    <>
    {filteredBlogs.length === 0 ? <div className='max:h-screen h-screen effect mx-auto text-center lg:w-11/12'> 
    <h1 className='my-3' >No Blogs found...</h1>
    <img className='w-full h-52' src={nothing}/>
    </div>: null }
    <div className='flex flex-col gap-7'>
    {filteredBlogs.map((blog, index) => {
        return <>
        <div key={index} className="flex lg:flex-row gap-6 max-h-screen h-full flex-col justify-between " >
          <img className='lg:w-4/12 h-72' src={blog.image}/>
          <div className='lg:w-8/12 ' >
            <div className='flex flex-wrap items-center justify-between' > 
            <h1 className='text-xl' > {blog.title} </h1>
            <h1 className={darkMode ? "text-orange-200" : "text-orange-900" } > by - {blog.author} </h1>
            </div>
            <hr className={darkMode ? "border-white my-2" : "border-black my-2" } />
            <h1 className='my-2' > {blog.content.substring(0, 300)} .... <span className='underline' > read more </span> </h1>
            <h1 className='mb-3' > published on { new Date(blog.createdAt).toDateString() } </h1>
            <a className={darkMode ? "px-2 py-1 flex items-center w-fit gap-2 border-white border-2" : "px-2 py-1 flex items-center w-fit gap-2 border-black border-2"} href={`/singlePost/${blog._id}`}>
              Read More
              <AiFillCaretRight/>
            </a>
          </div>
        </div>
        <hr className={darkMode ? "border-white lg:hidden border-[1px]" : "border-black lg:hidden border-[1px]" } />
        </>
    })}
    </div>

    </>
  )
}

export default LiView