import { CONSTANTS } from "../actions";

const initialState = {
  isAuth: localStorage.organicerAuthToken ? true :false,
  token: localStorage.organicerAuthToken ? localStorage.organicerAuthToken : '0',
  user: localStorage.organicerUser ? JSON.parse(localStorage.organicerUser) : null
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_LOGIN: 
    // debugger
      return {
        isAuth: true,
        user: {...action.payload.user},
        token: action.payload.token
      }

    case CONSTANTS.LOGOUT: {
      return {
        isAuth: false,
        token: null,
        user: null
      }
    }  

    default:
      return state
  }
}

export default loginReducer