import React,{useContext, useEffect, useReducer, createContext} from "react";
import reducer from "../Reducer/LoginReducer"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("User")),
    userFetching: false,
    userError: false,
}

const LoginContext = React.createContext()

export const LoginProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("User", JSON.stringify(state.user))
    }, [state.user])

    return(
        <LoginContext.Provider value={{
            user: state.user,
            userFetching: state.userFetching,
            userError: state.userError,
            dispatch}}> 
            {children}
         </LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    return useContext(LoginContext)
}