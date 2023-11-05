import React,{useContext, useEffect, useReducer} from "react";
import { DARKMODE, LIGHTMODE } from "../action";
import reducer from "../Reducer/ThemeReducer"

const INITIAL_STATE = {
    darkMode: JSON.parse(localStorage.getItem("Theme"))
}

const ThemeContext  = React.createContext()

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("Theme", JSON.stringify(state.darkMode));
    }, [state.darkMode])

    const LightMode = () => {
        dispatch({type: LIGHTMODE})
    }

    const DarkMode = () => {
        dispatch({type: DARKMODE})
    }

    return <ThemeContext.Provider value={{...state, LightMode, DarkMode}} >
        {children}
    </ThemeContext.Provider>
}

export const useThemeContext = () => {
    return useContext(ThemeContext)
}