import React from 'react'
import {useThemeContext} from "../Context/themeContext"

const Loading = () => {

    const {darkMode} = useThemeContext()

    return (
    <div className={darkMode ? "loading-dark" : "loading"} >
        <div class="loader">
            <div class="loader-item"></div>
            <div class="loader-item"></div>
            <div class="loader-item"></div>
        </div>
    </div>
    )
}

export default Loading
