import React, { useState } from 'react'
import { useThemeContext } from '../Context/themeContext'
import {BsFillGridFill} from "react-icons/bs"
import {LiaTimesSolid} from "react-icons/lia"
import {FaFilter} from "react-icons/fa"
import {AiOutlineUnorderedList} from "react-icons/ai"
import {useBlogContext} from "../Context/blogContext" 
import {getUniqueValue} from "../getUnique"
import LiView from "../Components/LiView"
import GrView from '../Components/GrView'
const Blogs = () => {
  const {filteredBlogs, blogs, gridView, setGridView, sort, setListView, filter: {text, category, author}, updateSort,updateFilter, clearFilter } = useBlogContext()
  const {darkMode} = useThemeContext()
  const [filters, setFilters] = useState(!false)
  // get unique values - 
  const authors = getUniqueValue(blogs, "author")
  const categories = getUniqueValue(blogs, "category")
  const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  }
  return  (
    <section className={darkMode ? "modetran max:h-full h-screen bg-slate-950 text-white" : "modetran max:h-full h-screen bg-slate-100 text-black" } >
        {filters == false && 
        <div onClick={scrollTop} >
        <div onClick={() =>  {setFilters(true) }} className='fixed bottom-4 right-4 bg-gray-400 p-2 text-xl z-[100] rounded-full' > <FaFilter /> </div>
        </div>
        }
          <div className='flex lg:flex-row flex-col w-full items-start ' >
            <div className='lg:fixed lg:top-20 top-0 left-0 w-full lg:w-1/5' >
              <div className={filters ? "px-4 py-0" : "hidden px-4 py-2"}>
                    <div className="flex py-3 justify-between items-center">
                        <p className="text-lg"> Filters <i class="fa-solid fa-filter"></i> </p>
                        {/* <i className="fa-solid fa-minus block cursor-pointer lg:hidden"/> */}
                        <LiaTimesSolid onClick={() => filters ? setFilters(false) : setFilters(true)} className='lg:hidden'/> 
                    </div>
                    <hr className={darkMode ? "my-0 border-white w-full" : "my-0 border-black w-full"} /> 
                    {/* categories or topics */}
                    <div className={darkMode ? "text-green-500 mt-3" : "text-green-700 mt-3"}>
                        <p className={darkMode ? "text-white text-xl" : "text-xl text-black"}>Topic</p>
                        {categories.map((t, index) => {
                            return(
                                <div className="flex flex-col text-left items-start" >
                                <button name="category" onClick={updateFilter} key={index} className={`${category === t ? "underline text-green-600 transition-all text-lg delay-150" : "no-underline transition-all delay-150 text-base"}`} >
                                    {t}
                                </button>
                                </div>
                            )
                        })}
                    </div>
                    <hr className={darkMode ? "my-3 border-white w-full" : "my-3 border-black w-full"} /> 
                    {/* author */}
                    <div className="mb-2" >
                        <label className="text-xl pr-2" >Author</label>
                        <select name='author' value={author} onChange={updateFilter} className={darkMode ? "bg-slate-800 w-fit text-white p-1 rounded-md" : "rounded-md w-fit bg-gray-300 text-black p-1"}>
                            {authors.map((a, index) => {
                                return(
                                    <option key={index} value={a} > {a} </option>
                                )
                            })}
                        </select>
                    </div>
                    {/* sort by name */}
                    <div className='my-3' >
                        <label className="text-xl pr-2" >From</label>
                        <select name="sort" onChange={updateSort} value={sort} className={darkMode ? "bg-slate-800 w-fit text-white p-1 rounded-md" : "rounded-md w-fit bg-gray-100 text-black p-1"}>
                            <option value="a-z" >from a-z</option>
                            <option value="z-a" >from z-a</option>
                        </select>
                    </div>
                    <button onClick={clearFilter} className="bg-red-500  z-10 text-white lg:text-lg px-3 py-1.5 rounded-md" >
                        Clear Filter <i className="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                </div>
            </div>
            <div className={darkMode ? 'pt-6 lg:border-l border-white modetran px-3 w-full lg:w-4/5 relative h-full top-0 lg:left-[20%]' : 'pt-6 lg:border-l w-full border-black px-3 lg:w-4/5 relative h-full top-0 lg:left-[20%]'} > 
            <div className='flex w-full items-center pb-4 gap-3 justify-between'>
                    {/* <h1 className='text-base' > {filteredBlogs.length} blogs showing </h1> */}
                <input type="text" onChange={updateFilter} name='text' value={text} placeholder='Search . . . . . . . .' className={darkMode ? 'bg-inherit border-[1px] border-white px-2 py-1 rounded-md w-full lg:w-7/12' : 'bg-inherit border-[1px] px-2 py-1 rounded-md w-full lg:w-7/12 border-black'} />
                <div className='flex items-center gap-2' >
                    <div className={!gridView ? "bg-green-600 modetran text-white p-2 cursor-pointer" : " p-2 modetran cursor-pointer"} >
                    <AiOutlineUnorderedList onClick={setListView} className='cursor-pointer' />
                    </div>
                    <div className={gridView ? "bg-green-600 text-white modetran p-2 cursor-pointer" : " p-2 modetran cursor-pointer"} >
                    <BsFillGridFill onClick={setGridView} className='cursor-pointer' />
                    </div>
                </div>
            </div>
            <div className='flex items-center w-full justify-between' >
                <h1 className='text-base lg:w-2/12' > {filteredBlogs.length} blogs showing </h1>
                <hr className={darkMode ? 'border-white w-full lg:block hidden modetran' : 'border-black w-full lg:block hidden modetran'} /> 
            </div>
            <hr className={darkMode ? 'border-white w-full lg:hidden block my-1 modetran' : 'border-black w-full lg:hidden block my-1 modetran'} /> 
            <div className='py-5' >
            {gridView ? <GrView filteredBlogs={filteredBlogs} /> : <LiView filteredBlogs={filteredBlogs} /> }
            </div>
            </div>
          </div>
        </section>
  )
}
 
export default Blogs