import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {RxUpdate} from "react-icons/rx"
import { useLoginContext } from '../Context/loginContext'
import { useThemeContext } from '../Context/themeContext'
import { USER_LOGOUT, UPDATE_START, UPDATE_SUCCESS, UPDATE_FAILURE } from '../action'
const Account = ({user}) => {
    const {darkMode} = useThemeContext()
    const {dispatch} = useLoginContext()
    const [about, setAbout] = useState(user?.about)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleUpdate = async (e) => {
        e.preventDefault()
        dispatch({type: UPDATE_START})
        try {
            const updatedUser = {
                userId: user._id, username, email, about
            }
            const res = await axios.put(`/users/${user._id}/`, updatedUser)
            dispatch({type: UPDATE_SUCCESS, payload: res.data})
            setSuccess(true)
        } catch (err) {
            setError(true)
            dispatch({type: UPDATE_FAILURE})
            alert(err)
        }
    }

    const handeLogout = async () => {
        dispatch({type: USER_LOGOUT})
        window.location.replace("/login")
    }

  return (
    <>
    <section className={darkMode ? 'modetran h-full bg-neutral-950 text-white' : 'modetran h-full bg-neutral-100 text-black'} >
        <div className='pt-10 gap-2 w-11/12 mx-auto' >
            <div className='flex lg:flex-row flex-col items-start justify-between'>

            {/* form */}
            <div className='lg:w-8/12 w-full' >
                <div className='flex items-center justify-between' >
                    <h1 className='text-xl' > Account Settings - </h1>
                    <button onClick={handeLogout} className={darkMode ? "px-2 py-1 text-white rounded-md bg-red-500" : "px-2 py-1 text-white rounded-md bg-red-600"} >Logout</button>
                </div>
                <hr className={darkMode ? " border-white modetran my-3" : " border-black modetran my-3" } />
                    <form className='flex flex-col gap-4' >
                        <div className='gap-1 flex flex-col' >
                        <h1> Username </h1>
                        <input onChange={(e) => setUsername(e.target.value)} className={darkMode ? 'modetran lg:w-8/12 rounded-md px-2 py-2 border-2 border-white bg-inherit' : 'modetran lg:w-8/12 px-2 rounded-md py-2 border-2 border-black bg-inherit'} value={username} />
                        </div>
                        <div className='gap-1 flex flex-col' >
                        <h1> Email-Id </h1>
                        <input onChange={(e) => setEmail(e.target.value)} className={darkMode ? 'modetran lg:w-8/12 rounded-md px-2 py-2 border-2 border-white bg-inherit' : 'modetran lg:w-8/12 px-2 rounded-md py-2 border-2 border-black bg-inherit'} value={email} />
                        </div>
                        <div className='gap-1 flex flex-col' >
                        <h1> About Me  </h1>
                        <textarea onChange={(e) => setAbout(e.target.value)} rows={3} value={about} className={darkMode ? 'modetran lg:w-8/12 rounded-md px-2 py-1 border-2 border-white bg-inherit' : 'modetran lg:w-8/12 px-2 rounded-md py-1 border-2 border-black bg-inherit'} />
                        </div>
                        <button onClick={handleUpdate} className={darkMode ? "px-2 py-1 flex gap-2 items-center bg-inherit border-2 border-white w-fit text-white rounded-md" : "px-2 text-black py-1 border-2 flex gap-2 items-center w-fit rounded-md border-black"} > Update <RxUpdate/> </button>
                        {success &&
                        <h1 className='text-green-400' > Profile Updated Succesfully! </h1>
                        }
                    </form>
                </div>
            {/* image */}
            <div className='lg:w-4/12 w-full' > </div>
        </div>
        <div className='py-4 mt-4' >
            <h1 className='text-2xl' > My Blogs - </h1>
            <hr className={darkMode ? "border-white border-[1px] my-1" : "border-black border-[1px] my-1"} />
            <div className="grid h-full effect gap-12 gap-y-8 lg:grid-cols-3 sm:grid-cols-1 sm:grid-col-2">
                {user.myBlogs.map((blog, index) => {
                    return <>
                    <div className='my-4' key={index} >
                    <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" alt={blog.title} className="object-cover rounded-md w-full"/>
                    <div className="text-center">
                        <h1><a className="px-1 text-2xl" href={`/singlePost/${blog._id}`}> {blog.title} </a></h1>
                        {/* <h1 className={darkMode ? 'text-orange-200 text-lg' : 'text-orange-800 text-lg'} > by - {blog.author} </h1> */}
                        <h1 className='underline' > {new Date(blog.createdAt).toDateString()} </h1>
                    </div>
                    <hr className={darkMode ? "my-3 border-white px-3 block lg:hidden w-full mx-auto" : "my-3 px-3 border-black block lg:hidden w-full mx-auto"} /> 
                    </div>
                    </>
                })}
            </div>
        </div>
        </div>
    </section>
    </>
  )
}

export default Account