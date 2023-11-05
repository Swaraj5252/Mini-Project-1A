import React, { useState } from 'react'
import { USER_LOGOUT } from '../action'
import "../index.css"
import {useThemeContext} from "../Context/themeContext"
import { useLoginContext } from '../Context/loginContext'
import {HiMiniCodeBracket} from "react-icons/hi2"
import {FiMenu} from "react-icons/fi"
import {BsFillSunFill, BsMoonStars, BsArrowRightShort, BsChevronDown} from "react-icons/bs"
import {BiUserCircle, BiLogOut} from "react-icons/bi"
import {BsFillBookmarkFill} from "react-icons/bs"
import {AiOutlineClose, AiFillBook} from "react-icons/ai"
import {MdSettingsSuggest} from "react-icons/md"
const Navbar = () => {
  const {darkMode, LightMode, DarkMode} = useThemeContext()
  const {user, dispatch} = useLoginContext()
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(false)
  const handleMenu = () => {
    menu == true ? setMenu(false) : setMenu(true)
  }
  const handleLogout = () => {
    dispatch({type: USER_LOGOUT})
    window.location.replace("/login")
  }
  return (
    <>
    <nav className={darkMode ? 'modetran border-b border-white fixed bg-gray-950 z-[100] text-white w-full top-0 left-0 px-7 py-4 flex items-center justify-between' : 'modetran fixed border-b border-black z-[100] w-full bg-white top-0 left-0 px-7 py-4 flex items-center justify-between'} >
      <a href='/'> <h1 className='flex gap-2 items-center text-2xl' >  <HiMiniCodeBracket/> <span className={darkMode ? 'text-teal-200' : 'text-blue-900'} >  CodeBlog </span> </h1> </a>
      {/* for large screen */}
      <ul className='hidden lg:flex text-lg items-center gap-10'>
        <div className='flex  items-center gap-16' >
        <li> <a href='/' className='cursor-pointer ' >  Home </a> </li>
        <li> <a href='/blogs' className='cursor-pointer' > Blogs </a> </li>
        <li> <a href='/write' className='cursor-pointer' > Write </a> </li>
        {!user ?
        <button onClick={() => drop ? setDrop(false) : setDrop(true) }  className={darkMode ? 'modetran flex gap-1 items-center text-green-500 border-white border-2 px-3 py-1.5 rounded-md' : 'modetran flex gap-1 items-center text-green-900 border-teal-900 border-2 px-3 py-1 rounded-md'} >
          Login <BsArrowRightShort/>
        </button> : 
        <li onClick={() => drop ? setDrop(false) : setDrop(true) } className='flex gap-1 cursor-pointer items-center text-xl'>
          <div className='flex gap-0.5 items-center' >
            <BiUserCircle/>
            <h1> {user.username} </h1>
          </div>
          <BsChevronDown/>
        </li>
        }
        </div>
        <li onClick={darkMode === true ? LightMode : DarkMode} className='cursor-auto' > {darkMode ? <BsFillSunFill/> : <BsMoonStars/> }  </li>
      </ul>
      {/* ul for small screen */}
      <ul className={menu ? 'h-screen transition-all fixed w-full left-0 top17 z-[100] bg-inherit lg:hidden block' : 'h-screen transition-all modetran fixed w-full left-0 top17 z-[100] bg-inherit hidden'} >
        <div className=' text-3xl nav-li-anim relative top-28 flex flex-col gap-4' >
          <div className='text-center text-3xl relative flex flex-col mb-4 gap-16' >
          <li> <a> Home </a> </li>
          <li> <a href='/blogs' > Blogs </a> </li>
          <li> <a> Write </a> </li>
          {!user &&
          <li className='bg-green-500 text-black p-2  rounded-md w-5/12 mx-auto' > <a href='/login' > Login  </a> </li>
          }
          </div>
          {user ? 
          <>
          <hr className={darkMode ? "border-white w-11/12 mx-auto" : "border-black w-11/12 mx-auto"} />
          <li className='flex text-xl nav-li-sub px-6 justify-between items-center' >
            <h1> <a href='/account'> {user.username} </a></h1>
            <h1 onClick={handleLogout} > Logout </h1>
          </li>
          </> : null
          }
        </div>
      </ul>
      <div className='lg:hidden flex items-center gap-4'>
      <li onClick={darkMode === true ? LightMode : DarkMode} className='list-none cursor-auto' > {darkMode ? <BsFillSunFill/> : <BsMoonStars/> }  </li>
      <button onClick={handleMenu} className='text-xl list-none' > {menu ? <AiOutlineClose/> : <FiMenu /> }  </button>
      </div>
    <div className={drop ? "lg:block md:block hidden origin-top-right absolute right-6 mt-16 top-0 w-56 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
      <div className={darkMode ? "bg-gray-900 effect text-white py-1" : "py-1 effect bg-gray-100 text-black"} role="none">
        <a href={user ? "/account" : "/login" } className="flex items-center gap-2 px-4 py-2 text-sm" role="menuitem" id="menu-item-0"> <MdSettingsSuggest/> {user? "Account settings" : "Login" } </a>
        <a href={user ? "/account" : "/register" } className="flex items-center gap-2 px-4 py-2 text-sm" role="menuitem" id="menu-item-0"> <AiFillBook/> {user? "My Blogs" : "Register"} </a>
        <a href={user ? "/account" : "/register" } className="flex items-center gap-2 px-4 py-2 text-sm" role="menuitem" id="menu-item-0"> <BsFillBookmarkFill/> {user? "Saved Blogs" : null} </a>
        {user && <>
        <button type="submit" onClick={handleLogout} className="flex items-center gap-2 w-full text-left hover:bg-green-400 hover:ease-in-out transition-all ease-in-out delay-100 px-4 py-2 text-sm" id="menu-item-3">
        <BiLogOut/> Log Out
        </button>
        </>
        }
      </div>
    </div>
    </nav>
    </>
  )
}

export default Navbar