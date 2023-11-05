import React,{useRef, useState} from 'react'
import { useThemeContext } from '../Context/themeContext'
import { useLoginContext } from "../Context/loginContext"
import regBg from "../images/register.svg"
import {MdOutlineLogin} from  "react-icons/md"
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { USER_START, USER_FAILIURE, USER_SUCCESS, USER_LOGOUT } from "../action"
import axios from 'axios'

const Login = () => {

    const {darkMode} = useThemeContext()
    const {dispatch, user, userError, userFetching} = useLoginContext()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [hide, setHide] = useState(true)
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: USER_START})
        try {
          const res = await axios.post("/users/login", {
            username: usernameRef.current.value,
            password: passwordRef.current.value
          })
          dispatch({type: USER_SUCCESS, payload: res.data})
          window.location.replace("/")
        } catch (err) {
          dispatch({type: USER_FAILIURE})
          setError(true)
        }
    }
  return (
    <>
    <section className={darkMode ? "modetran h-screen bg-black text-white" : "modetran bg-blue-50 text-black h-screen"} >
        <div className='relative top-16 mx-auto w-11/12 lg:w-7/12 lg:flex block justify-center items-start py-10 px-2' > 
        {/* image */}
        <div className={darkMode ? 'w-6/12 h-400 lg:block hidden bg-stone-900 p-5' : 'w-6/12 h-400 lg:block hidden bg-stone-50 p-5'} >
            <img className={darkMode? "p-4" : "p-4"} src={regBg}/>
        </div>
        {/* form */}
        <div className={darkMode ? 'lg:w-6/12 reg-dark h-400  px-5 py-4': 'lg:w-6/12 h-400 bg-white px-5 py-4'} >
            <h1 className='text-2xl' > Welcome Back 🎉 <br/> <span className='underline' > Login Here! </span> </h1>
            <form className='flex flex-col mt-8 gap-4' >
                <div className='flex flex-col gap-1 lg:w-11/12' >
                    <h1> Enter your Name - </h1>
                    <input ref={usernameRef} placeholder='John Smilga' className={darkMode ? 'border-2 w-full border-white bg-inherit px-2 py-1 rounded-md' : 'border-2 w-full border-black bg-inherit px-2 py-1 rounded-md'} />
                </div>
                <div className='flex flex-col gap-1 lg:w-11/12' >
                    <h1> Enter your password - </h1>
                    <div className='flex items-center'>
                    <input ref={passwordRef} type={hide ? 'password' : 'text'} className={darkMode ? 'border-2 w-full border-white bg-inherit px-2 py-1 rounded-md' : 'border-2 w-full border-black bg-inherit px-2 py-1 rounded-md'} />
                    <div  className='absolute right-8 lg:right-16' onClick={() => hide ? setHide(false) : setHide(true) } >
                      {hide == false ? <AiFillEye/> : <AiFillEyeInvisible/> }
                    </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className={darkMode ? "border-2 border-white px-3 py-1 w-fit rounded-md flex gap-1 text-violet-400 items-center" : "border-2 border-black px-3 py-1 w-fit rounded-md flex gap-1 text-violet-600 items-center"} > Login <MdOutlineLogin/> </button>
                {error &&
                <h1 className='text-red-400'> Something went wrong! </h1>
                }
            </form>
            <h1 className='mt-5 text-base' > New here ? <a href='/register' className='underline' >Register </a> here </h1>
        </div>
        </div>
    </section>
    </>
  )
}

export default Login