import {BLOGS_BEGIN, BLOGS_SUCCESS, BLOGS_ERROR, SET_GRIDVIEW, SET_LISTVIEW, UPDATE_SORT, SORT_BLOGS, UPDATE_FILTER, FILTER_BLOGS, CLEAR_FILTER, SINGLE_POST, SUPDATE_SUCCESS } from "../action";

const blogReducer = (state, action) => {
    if (action.type === BLOGS_BEGIN) {
            return{...state, blogsLoading: true, blogsError: false}
    }
    if (action.type === BLOGS_SUCCESS) {
        return{...state, blogsError: false, blogsLoading: false, blogs: action.payload, filteredBlogs: action.payload}
    }
    if (action.type === BLOGS_ERROR) {
        return{...state, blogsError: true, blogsLoading: false}
    }
    if (action.type === SINGLE_POST) {
        return{...state, single: action.payload}
    }
    if (action.type === SUPDATE_SUCCESS) {
        return{...state,}
    }
    if (action.type === SET_GRIDVIEW) {
        return { ...state, gridView: true }

    }
    if (action.type === SET_LISTVIEW) {
        return { ...state, gridView: false }
    }

    if (action.type === UPDATE_SORT) {
        return{
            ...state,
            sort: action.payload
        }
    }
    if (action.type === UPDATE_FILTER) {
        const {name, value} = action.payload
        return{
            ...state,
            filter: {...state.filter, [name]: value}
        }
    }

    if (action.type === SORT_BLOGS) {
        const {sort, filteredBlogs } = state
        let tempBlog = [...filteredBlogs]
        if (sort === 'a-z') {
            tempBlog = tempBlog.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
        }
        if (sort === 'z-a') {
            console.log(tempBlog);
            tempBlog = tempBlog.sort((a, b) => {
                return b.title.localeCompare(a.title)
            })
        }
        return { ...state, filteredBlogs: tempBlog }
    }

    if (action.type === FILTER_BLOGS) {
        const {blogs} = state
        const {text, category, author} = state.filter
        let tempBlog = [...blogs]
        // filtering from here

        // search functionality - 
        if (text) {
            tempBlog = tempBlog.filter((blog) => {
                return blog.title.toLowerCase().startsWith(text)
            })
        }
        // category filtering
        if (category !== "all") {
            tempBlog = tempBlog.filter(blogs => blogs.category === category)
        }

        // careLevel
        if (author !== "all") {
            tempBlog = tempBlog.filter(blogs => blogs.author === author)
        }       
        return{
            ...state, filteredBlogs: tempBlog
        }
    }

    if (action.type === CLEAR_FILTER) {
        return {
                 ...state,
                filter: {
                    ...state.filter,
                    text: '',
                    category: "all",
                    author: "all",
                }
        }
    }
}

export default blogReducer