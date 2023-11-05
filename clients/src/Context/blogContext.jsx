import React, {useState, useReducer, useContext, useEffect} from "react";
import axios from "axios";
import {BLOGS_BEGIN, BLOGS_SUCCESS, BLOGS_ERROR, LOAD_BLOGS, SET_GRIDVIEW, SET_LISTVIEW, UPDATE_SORT, SORT_BLOGS, UPDATE_FILTER, FILTER_BLOGS, CLEAR_FILTER} from "../action";
import reducer from "../Reducer/BlogReducer";

const INITIAL_STATE = {
    blogsLoading: false,
    blogsError: false,
    blogs: [],
    singleUpdateSuccess: false,
    singleUpdateBegin: false,
    singleUpdateError: false,
    single: null,
    filteredBlogs: [],
    gridView: true,
    sort: "a-z",
    filter: {
        text: "",
        category: "all",
        author: "all",
    },
}

const BlogContext = React.createContext()
export const BlogProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const fetchBlogs = async () => {
        dispatch({type: BLOGS_BEGIN})
        try {
            const res = await axios.get("/blogs")
            const blogs = res.data
            dispatch({type: BLOGS_SUCCESS, payload: blogs})
        } catch (err) {
            dispatch({type: BLOGS_ERROR})
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const setGridView = () => {
        dispatch({type: SET_GRIDVIEW})
    }

    const setListView = () => {
        dispatch({type: SET_LISTVIEW})
    }

    const updateSort = (e) => {
        const value = e.target.value
        dispatch({type : UPDATE_SORT, payload: value})

    }

    const updateFilter = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === 'category') {
            value = e.target.textContent
        }
        dispatch({type: UPDATE_FILTER, payload: {name, value}})
    }
    
    useEffect(() => {
        dispatch({type: SORT_BLOGS})
        dispatch({type: FILTER_BLOGS})
    }, [state.blogs, state.sort, state.filter])

    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }

    return (
        <BlogContext.Provider value={{...state, setGridView, setListView, updateSort, updateFilter, clearFilter, dispatch}} >
            {children}
        </BlogContext.Provider>
    )
}

export const useBlogContext = () => {
    return useContext(BlogContext)
} 