import React, {useState, useEffect, useRef} from 'react'
import {useLocation } from 'react-router-dom';
import { format, render, cancel, register } from 'timeago.js';
import {BsArrowLeft, BsFillPencilFill, BsFillBookmarkFill} from "react-icons/bs"
import {FcLike} from "react-icons/fc"
import {MdOutlineDeleteOutline} from "react-icons/md"
import {FaCommentAlt} from "react-icons/fa"
import {AiOutlineHeart, AiFillFileImage} from "react-icons/ai"
import {RxUpdate} from "react-icons/rx"
import {LiaTimesSolid} from "react-icons/lia"
import { useThemeContext } from "../Context/themeContext"
import { useLoginContext } from '../Context/loginContext';
import { useBlogContext } from '../Context/blogContext';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import app from '../firebase';
import {SINGLE_POST} from "../action"

const SinglePost = () => {
    
    const location = useLocation()
    const commentRef = useRef()
    const path = location.pathname.split("/")[2]
    const {darkMode} = useThemeContext()
    const {user} = useLoginContext()
    const {dispatch} = useBlogContext()
    const [blog, setBlog] = useState({})
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/blogs/" + path)
            setBlog(res.data)
            setTitle(res.data.title);
            setContent(res.data.content)
            dispatch({type: SINGLE_POST, payload: res.data})
        }
        getPost()
    }, [path])

    const handleComment = async (e) => {
        e.preventDefault()
        const fileName = new Date().getTime() + image
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)
        // setCommentError(false)
        try {

            const res = await axios.post(`/blogs/${blog._id}/comments`, {
                comment: commentRef.current.value, user: user._id, name: user.username
            }) && window.location.reload()
            console.log(res);
        } catch (err) {
            // setCommentError(true)
            console.log(err);
        }
    }

    const handeUpdate = async (e) => {
        e.preventDefault()

        try {
            await axios.put(`/blogs/${blog._id}/`, {
                title, content
            })
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
        // setUpdateMode(false)
    }

    const handleDelete = async () => {
        console.log(blog.authorID)
        await axios.delete(`/blogs/${blog._id}/`, {
            authorID: blog.authorID
        })
        window.location.replace("/blogs")
    }
    
    const handleClick = async () => {
        try {
            const like = {userId: user._id}
            await axios.put(`/blogs/${blog._id}/like`, like);
            window.location.reload();  
        } catch (err) {
            console.log(err)
        }
    }

    return (
    <>
    <section className={darkMode ? "max-h-full h-full bg-gray-950 text-white" : "max-h-full h-full text-black"} >
        <div className='px-3 py-3' >
        <a className={darkMode ? "px-2 py-1 my-3 flex rounded-md items-center w-fit gap-2 border-white border-2" : "px-2 py-1 my-3 rounded-md flex items-center w-fit gap-2 border-black border-2"} href='/blogs'>
        <BsArrowLeft/> Go Back
        </a>
        <div className='lg:w-10/12 my-3' >
        <img className='lg:h-[450px] h-80 object-cover my-3 w-full rounded-md' src={blog.image}/>
        {updateMode && 
        <>
        <label htmlFor="fileInput">
            <div className={darkMode ? 'border-2 bg-inherit w-fit rounded-full p-2 my-2 border-white' : 'border-2 bg-inherit p-2 my-2 border-black w-fit rounded-full'} >
            <AiFillFileImage/>
            </div>
        </label>
        <input required id="fileInput" type="file"style={{ display: "none" }}  />
        </>
        }
        <div className='flex items-center justify-between' >
            {updateMode ? <>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className={darkMode ? "border-white bg-inherit w-6/12 text-blue-200 border-2 p-1 rounded-sm" : "border-black border-2 p-1"}  />
            </> :
            <h1 className='text-2xl' > {blog.title} </h1>
             }
            {user ?
            <>
            {user._id == blog.authorID &&
            <div className='flex items-center gap-3'>
                <BsFillPencilFill onClick={() => updateMode ? setUpdateMode(false) : setUpdateMode(true) } className='text-lg cursor-pointer text-blue-500' />
                <MdOutlineDeleteOutline onClick={handleDelete} className='text-xl cursor-pointer text-red-500' />
            </div>
            }
            {user._id != blog.authorID &&
            <div className='flex gap-4 sm:py-1 items-center' > 
                <div className='flex gap-1 items-center' >
                    <h1> {blog.likes?.length} </h1>
                    {blog.likes?.includes(user._id) ? <FcLike onClick={handleClick} className='cursor-pointer' /> : <AiOutlineHeart onClick={handleClick} className='cursor-pointer'/> }
                </div>
                <button onClick={handleClick} className={darkMode ? "border-white border-2 flex items-center gap-2 rounded-md px-2 py-1" : "border-black border-2 flex items-center gap-2 rounded-md px-2 py-1" }>
                    <BsFillBookmarkFill/>
                    Save Blog
                </button>
            </div>
            }

            </>
             : null }
        </div>
        <div className='flex items-center flex-wrap  justify-between' > 
            <a href={`/author/${blog.authorID}`} className={darkMode ? 'text-orange-200 lg:text-xl' : 'text-orange-700 lg:text-xl'} > by {blog.author} </a>
            <h1 className='lg:text-lg text-sm' > published on {new Date(blog.createdAt).toDateString() } </h1>
        </div>
        <hr className={darkMode ? "border-white my-3" : "border-black my-3" } />
        {updateMode ? <> 
            <textarea onChange={(e) => setContent(e.target.value)} rows={10} className={darkMode ? 'w-full bg-inherit border-2 p-2' : 'w-full border-2 border-black bg-inherit p-2'} value={content} />
        </> : 
        <h1 className='text-xl' > {blog.content} </h1>
        }
        {updateMode &&
        <div className='flex items-center gap-3'>
            <button onClick={handeUpdate} className={darkMode ? 'bg-inherit border-white border-2 flex items-center gap-2 p-1' : 'bg-inherit border-black flex items-center gap-2 border-2 p-1'} >Update <RxUpdate/> </button>
            <button onClick={() => setUpdateMode(false)} className={darkMode ? 'bg-inherit border-white border-2 flex items-center gap-2 p-1' : 'bg-inherit border-black flex items-center gap-2 border-2 p-1'} >Cancel <LiaTimesSolid/> </button>
        </div>
         }
        {/* comments and reply section */}
        <div  className='lg:w-9/12 mt-3'>
            {/* comment form */}
            <div className='flex flex-col gap-5'>
                <textarea rows={3} ref={commentRef} className={darkMode ? 'border-2 rounded-sm w-full border-white bg-inherit px-2 py-2' : 'border-2 rounded-sm w-full bg-inherit border-black px-2 py-2'} placeholder='Comment . . . . .' />
                <button onClick={handleComment} type='sumbit' className='bg-green-500 text-white flex items-center gap-2 text-xl w-fit rounded-md px-2 py-1'> Comment <FaCommentAlt/> </button>
            </div>
            {blog.reviews?.length == 0 && <h1 className='text-center text-lg pt-8' > Be first one to comment ! </h1> }
            {/* all comments */}
            {blog.reviews?.length != 0 &&
            <div className='my-3'>
            <h1 className='text-2xl' > Comments - </h1>
            <hr className={darkMode ? "border-white my-3" : "border-black my-3" } />
            <div className='flex flex-col gap-5' >
                {blog.reviews?.map((com, index) => {
                    return<div>
                    <div className={darkMode ? 'bg-gray-800 px-2 py-1 rounded-md border-[1px]' : 'bg-gray-200 px-2 py-1 border-[1px] border-black rounded-md'} >
                    <h1 className='text-xl pb-2' > {com.comment} </h1>
                    <div className='flex items-end justify-between'>
                        <h1 className='underline cursor-pointer text-sm text-blue-400' > View replies </h1>
                        <h1 className='sm:text-sm text-right' > - {com.name} <br/> {format(com.createdAt, 'en_US')} </h1>
                    </div>
                    </div>
                    </div>
                })}
            </div>
            </div>
            }
        </div>
        </div>
        </div>
    </section>
    </>
  )
}

export default SinglePost