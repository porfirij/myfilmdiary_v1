import * as actions from "./actionTypes";

const initialState = {
  user: {
    token: localStorage.getItem("userToken") || "",
    id: localStorage.getItem("userId") || "",
    email: "",
    isLoggedIn: !!localStorage.getItem("userToken"),
    sentEmailVerification: false,
    emailIsVerified: false
  },
  api: { loading: false, error: false, errorMsg: null }
};

const reducer = (state = initialState, action) => {
  //console.log(action);
  if (action.type === actions.LOGIN)
    return {
      ...state,
      user: {
        token: action.payload.token,
        id: action.payload.id,
        email: action.payload.email,
        isLoggedIn: true,
        sentEmailVerification: true,
        emailIsVerified: true
      }
    };
  if (action.type === actions.EMAIL_NOT_VERIFIED)
    return {
      ...state,
      user: {
        token: action.payload.token,
        id: action.payload.id,
        email: action.payload.email,
        isLoggedIn: false,
        sentEmailVerification: false,
        emailIsVerified: false
      }
    };
  if (action.type === actions.SENT_EMAIL_VERIFICATION)
    return {
      ...state,
      user: {
        token: action.payload.token,
        id: action.payload.id,
        email: action.payload.email,
        isLoggedIn: state.user.isLoggedIn,
        sentEmailVerification: true,
        emailIsVerified: false
      }
    };
  if (action.type === actions.CONFIRM_EMAIL)
    return {
      ...state,
      user: {
        token: state.user.token,
        id: state.user.id,
        email: state.user.email,
        isLoggedIn: false,
        sentEmailVerification: true,
        emailIsVerified: true
      }
    };
  if (action.type === actions.LOGOUT)
    return {
      user: {
        token: "",
        id: null,
        email: "",
        isLoggedIn: false,
        sentEmailVerification: false,
        emailIsVerified: false
      },
      api: { loading: false, error: false, errorMsg: null }
    };
  if (action.type === actions.API_LOADING)
    return {
      ...state,
      api: {
        loading: true,
        error: false,
        errorMsg: null
      }
    };
  if (action.type === actions.API_ERROR)
    return {
      ...state,
      api: {
        loading: false,
        error: true,
        errorMsg: action.payload.error
      }
    };
  if (action.type === actions.API_RESET)
    return {
      ...state,
      api: {
        loading: false,
        error: false,
        errorMsg: null
      }
    };
  return state;
};

export default reducer;
