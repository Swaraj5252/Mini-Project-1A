import React, {useState, useEffect} from 'react'
import { useThemeContext } from '../Context/themeContext'
import { useLoginContext } from '../Context/loginContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SingleAuthor = () => {
    const {darkMode} = useThemeContext()
    const [author, setAuthor] = useState([])
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    useEffect(() => {
        const getAuthor = async () => {
        try {
            const res = await axios.get("/users/" + path)
            setAuthor(res.data)
        } catch (err) {
            console.log(err);
        }
        }
        getAuthor()
    }, [path])
  return (
    <>
    <section className={darkMode ? "modetran bg-black text-white h-full" : "modetran bg-gray-100 text-black h-full"} >
    <div className='bottom-0 top-10 h-full pt-10 pb-3 px-2 mx-auto lg:w-10/12'>
        {/* flex part [user info here] */}
        <div className='flex items-center lg:flex-row justify-between lg:px-0 px-3 flex-col-reverse lg:gap-0 gap-5'>
            {/* author info */}
            <div className='lg:w-9/12 text-xl flex flex-col gap-2' >
                <div className='text-2xl lg:w-11/12' >
                    <h1> Know about the author - </h1>
                    <hr className={darkMode ? "border-white mt-3 mb-1" : "border-black mt-3 mb-1" } />
                </div>
                <h1> Author - <br/> {author.username} </h1>
                <h1> Email Id - <br/> {author.email} </h1>
                <h1> <span className=''> About the Author - </span> <br/> {author?.about} </h1>
            </div>
        {/* author image */}
            <div className='lg:w-3/12' >
                <img className='rounded-full object-cover h-[370px] lg:h-72' src='https://images.unsplash.com/photo-1618568949779-895d81686151?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aXNuZXNzbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'/>
            </div>
        </div>
        <hr className={darkMode ? "border-white mt-8 mb-4" : "border-black mt-8 mb-4" } />
        <h1 className='text-xl' > My Blogs -  </h1>
        <div className="grid gap-12 my-4 gap-y-8 lg:grid-cols-3 sm:grid-cols-1 sm:grid-col-2">
        {author.myBlogs?.map((blog, index) => {
            return <>
            <div>
            <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" alt={blog.title} className="object-cover rounded-md w-full"/>
            <div className="text-center">
            <h1><a className="px-1 text-2xl" href={`/singlePost/${blog._id}`}> {blog.title} </a></h1>
            <h1 className={darkMode ? 'text-orange-200 text-lg' : 'text-orange-800 text-lg'} > by - {blog.author} </h1>
            <h1 className='underline' > {new Date(blog.createdAt).toDateString()} </h1>
            </div>
            <hr className={darkMode ? " border-white mt-2 px-3 block lg:hidden w-full mx-auto" : " mt-2 px-3 border-black block lg:hidden w-full mx-auto"} /> 
            </div>
            </>
        })}
    </div>
    </div>           
    </section>
    </>
  )
}

export default SingleAuthor