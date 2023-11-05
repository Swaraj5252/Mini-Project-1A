import React, {useState} from 'react'
import { useThemeContext } from '../Context/themeContext'
import axios from 'axios'
import regBg from "../images/register.svg"
import {MdOutlineLogin} from  "react-icons/md"
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

const Register = () => {
    const {darkMode} = useThemeContext();
    // for hide and unhide password
    const [hide, setHide] = useState(true)
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const image = "no image for now";
    const [error, setError] = useState(false)
    const handleSumbit = async (e) => {
        e.preventDefault()
        console.log("process started!");
        try {
            const res = await axios.post('/users/register/', {username, email, password})
            res.data && window.location.replace("/login")
        } catch (err) {
            setError(true)
            console.log(err);
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
        <div className={darkMode ? 'lg:w-6/12 reg-dark sm:shadow-sm shadow-gray-400 h-400  px-5 py-4': 'lg:w-6/12 h-400 reg-light bg-white px-5 py-4'} >
            <h1 className='text-2xl underline mb-4' > Register Here! </h1>
            <form  className='flex flex-col gap-4' >

                <div className='flex flex-col gap-1 lg:w-11/12' >
                    <h1> Enter your Name - </h1>
                    <input onChange={e => setUserName(e.target.value)} placeholder='John Smilga' className={darkMode ? 'modetran border-2 w-full border-white bg-inherit px-2 py-1 rounded-md' : 'modetran border-2 w-full border-black bg-inherit px-2 py-1 rounded-md'} />
                </div>
                <div className='flex flex-col gap-1 lg:w-11/12' >
                    <h1> Enter your EmailId - </h1>
                    <input onChange={e => setEmail(e.target.value)} placeholder='johnsmilga@gmail.com' className={darkMode ? 'modetran border-2 w-full border-white bg-inherit px-2 py-1 rounded-md' : 'modetran border-2 w-full border-black bg-inherit px-2 py-1 rounded-md'} />
                </div>
                <div className='flex flex-col gap-1 lg:w-11/12' >
                    <h1> Enter your password - </h1>
                    <div className='flex items-center justify-center' >
                    <input onChange={e => setPassword(e.target.value)} type={hide ? 'password' : 'text'} className={darkMode ? 'modetran border-2 w-full border-white bg-inherit px-2 py-1 rounded-md' : 'modetran border-2 w-full border-black bg-inherit px-2 py-1 rounded-md'} />
                    <div  className='absolute right-8 lg:right-16' onClick={() => hide ? setHide(false) : setHide(true) } >
                    {hide == false ? <AiFillEye/> : <AiFillEyeInvisible/> }
                    </div>
                    </div>
                </div>
                <button onClick={handleSumbit} className={darkMode ? "border-2 border-white px-3 py-1 w-fit rounded-md flex gap-1 text-violet-400 items-center" : "border-2 border-black px-3 py-1 w-fit rounded-md flex gap-1 text-violet-600 items-center"} > Register <MdOutlineLogin/> </button>
            </form>
            <h1 className='mt-1 text-base' > Already have a account ? <a href='/login' className='underline' >Login </a> </h1>
        </div>
        </div>
    </section>
    </>
  )
}

export default Register