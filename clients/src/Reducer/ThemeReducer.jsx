import { DARKMODE, LIGHTMODE } from "../action";

const themeReducer = (state, action) => {
    if (action.type === LIGHTMODE) {
        return{...state, darkMode: false}
    }
    if (action.type === DARKMODE) {
        return{...state, darkMode: true}
    }
}

export default themeReducer;