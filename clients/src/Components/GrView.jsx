import React from 'react'
import { useThemeContext } from '../Context/themeContext'
import nothing from "../images/nothing.svg"

const GrView = ({filteredBlogs}) => {
  const {darkMode} = useThemeContext()
  return (
    <>
    {filteredBlogs.length === 0 ? <div className='max:h-full h-screen effect mx-auto text-center w-full lg:w-11/12'> 
    <h1 className='my-3' >No Blogs found...</h1>
    <img className='w-full h-52' src={nothing}/>
    </div>: null }
    <div className="grid h-full effect gap-12 gap-y-8 lg:grid-cols-2 sm:grid-cols-1 sm:grid-col-2">
    {filteredBlogs.map((blog, index) => {
        return <>
        <div key={index} >
          <img src={blog.image} alt={blog.title} className="object-cover rounded-md w-full"/>
          <div className="text-center">
            <h1><a className="px-1 text-2xl" href={`/singlePost/${blog._id}`}> {blog.title} </a></h1>
            <h1 className={darkMode ? 'text-orange-200 text-lg' : 'text-orange-800 text-lg'} > by - {blog.author} </h1>
            <h1 className='underline' > {new Date(blog.createdAt).toDateString()} </h1>
          </div>
          <hr className={darkMode ? "my-3 border-white px-3 block lg:hidden w-full mx-auto" : "my-3 px-3 border-black block lg:hidden w-full mx-auto"} /> 
        </div>
        </>
    })}
    </div>
    </>
  )
}

export default GrView