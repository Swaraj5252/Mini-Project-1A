import {USER_START, USER_SUCCESS, USER_FAILIURE, USER_LOGOUT, UPDATE_START, UPDATE_SUCCESS, UPDATE_FAILURE } from "../action"

const LoginReducer = (state, action) => {
    if (action.type == USER_START) {
        return{
            user: action.payload,
            userFetching: true,
            userError: false
        }
    }
    if (action.type == USER_FAILIURE) {
        return{
            user: null,
            userFetching: false,
            userError: true
        }
    }
    if (action.type == USER_SUCCESS) {
        return{
            user: action.payload,
            userFetching: false,
            userError: false
        }
    }
    if (action.type == USER_LOGOUT) {
        return{
            user: null,
            userFetching: false,
            userError: false
        }
    }
    if (action.type == UPDATE_START) {
        return{
            ...state,
            userFetching: true
        }
    }
    if (action.type == UPDATE_FAILURE) {
        return{
            user: state.user,
            userFetching: false,
            userError: true
        }
    }
    if (action.type == UPDATE_SUCCESS) {
        return{
            user: action.payload,
            userFetching: false,
            userError: false
        }
    }
} 
export default LoginReducer