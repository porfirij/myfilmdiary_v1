import * as actions from "./actionTypes";
import * as constants from "./../misc/constants";
import { fetchApi, getUserData } from "./../misc/api-functions";

export function logIn(user) {
  return { type: actions.LOGIN, payload: user };
}

export function emailNotVerified(user) {
  return { type: actions.EMAIL_NOT_VERIFIED, payload: user };
}

export function sentEmailVerification(user) {
  return { type: actions.SENT_EMAIL_VERIFICATION, payload: user };
}

export function confirmEmail() {
  return { type: actions.CONFIRM_EMAIL };
}

export function logOut() {
  return { type: actions.LOGOUT };
}

export function apiLoading() {
  return { type: actions.API_LOADING };
}

export function apiError(error) {
  return { type: actions.API_ERROR, payload: error };
}

export function apiReset() {
  return { type: actions.API_RESET };
}

////////////////////////////////////

export function logOutUser() {
  return async (dispatch) => {
    dispatch(logOut());
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
  };
}

export function loginUser(emailValue, pswValue) {
  return async (dispatch) => {
    dispatch(apiLoading());
    const response = await fetchApi({
      type: constants.API_REQUEST_LOG_IN,
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: {
        email: emailValue,
        password: pswValue,
        returnSecureToken: true
      }
    });

    if (response.ok) {
      const { emailVerified } = await getUserData(response.data.idToken);
      console.log(emailVerified);
      if (emailVerified) {
        dispatch(
          logIn({
            id: response.data.localId,
            token: response.data.idToken,
            email: response.data.email
          })
        );
        dispatch(apiReset());
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("userToken", response.data.idToken);
      } else {
        dispatch(
          emailNotVerified({
            id: response.data.localId,
            token: response.data.idToken,
            email: response.data.email
          })
        );
      }
    } else {
      dispatch(apiError({ error: response.data.error.message }));
    }
  };
}

export function confirmEmailAndLogIn(user) {
  return async (dispatch) => {
    dispatch(apiLoading());
    const { emailVerified } = await getUserData(user.token);
    console.log(emailVerified);
    if (emailVerified) {
      dispatch(
        logIn({
          id: user.id,
          token: user.token,
          email: user.email
        })
      );
      dispatch(apiReset());
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userToken", user.token);
    } else {
      dispatch(apiReset());
      dispatch(
        emailNotVerified({
          id: user.id,
          token: user.token,
          email: user.email
        })
      );
    }
  };
}

export function signUpUser(email, password) {
  return async (dispatch) => {
    dispatch(apiLoading());
    const response = await fetchApi({
      type: constants.API_REQUEST_SIGN_UP,
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: {
        email,
        password,
        returnSecureToken: true
      }
    });

    if (response.ok) {
      dispatch(apiReset());
      dispatch(
        sendEmailVerification(
          response.data.idToken,
          response.data.localId,
          response.data.email
        )
      );
    } else {
      dispatch(apiError({ error: response.data.error.message }));
    }
  };
}

export function sendEmailVerification(token, id, email) {
  return async (dispatch) => {
    dispatch(apiLoading());
    const response = await fetchApi({
      type: constants.API_REQUEST_EMAIL_VERIFICATION,
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: {
        email: email,
        requestType: "VERIFY_EMAIL",
        idToken: token
      }
    });

    if (response.ok) {
      dispatch(apiReset());
      dispatch(
        sentEmailVerification({
          token,
          id,
          email: response.data.email
        })
      );
    } else {
      dispatch(apiError({ error: response.data.error.message }));
    }
  };
}

export function sendPswResetEmail(email) {
  return async (dispatch) => {
    dispatch(apiLoading());
    const response = await fetchApi({
      type: constants.API_REQUEST_EMAIL_VERIFICATION,
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: {
        email: email,
        requestType: "PASSWORD_RESET"
      }
    });

    if (response.ok) {
      dispatch(logOut());
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
    } else {
      dispatch(apiError({ error: response.data.error.message }));
    }
  };
}

export function sendEmailConfirmation(code, id, token) {
  return async (dispatch) => {
    dispatch(apiLoading());
    const response = await fetchApi({
      type: constants.API_REQUEST_EMAIL_CONFIRMATION,
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: {
        oobCode: code
      }
    });

    if (response.ok) {
      dispatch(apiReset());
      dispatch(logIn({ id, token, email: response.data.email }));
    } else {
      dispatch(apiError({ error: response.data.error.message }));
    }
  };
}

//isEmailVerified?
//fetchUserData?

// export function loginUser(emailValue, pswValue) {
//   return async (dispatch) => {
//     try {
//       dispatch(apiLoading());
//       const response = await fetch(
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpKbbVCn-x0E5I2D0FgzOvePbUiOWt6DU",
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json"
//           },
//           body: JSON.stringify({
//             email: emailValue,
//             password: pswValue,
//             returnSecureToken: true
//           })
//         }
//       );

//       const resData = await response.json();

//       if (response.ok) {
//         dispatch(logIn({ id: resData.localId, token: resData.idToken }));
//         dispatch(apiReset());
//         localStorage.setItem("userId", resData.localId);
//         localStorage.setItem("userToken", resData.idToken);
//       } else {
//         throw new Error(resData.error.message);
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch(apiError({ error: error }));
//     }
//   };
// }

// export function signUpUser(emailValue, pswValue) {
//   return async (dispatch) => {
//     try {
//       dispatch(apiLoading());
//       const response = await fetch(
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpKbbVCn-x0E5I2D0FgzOvePbUiOWt6DU",
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json"
//           },
//           body: JSON.stringify({
//             email: emailValue,
//             password: pswValue,
//             returnSecureToken: true
//           })
//         }
//       );

//       const resData = await response.json();

//       if (response.ok) {
//         dispatch(logIn({ id: resData.localId, token: resData.idToken }));
//         dispatch(apiReset());
//         localStorage.setItem("userId", resData.localId);
//         localStorage.setItem("userToken", resData.idToken);
//       } else {
//         throw new Error(resData.error.message);
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch(apiError({ error: error }));
//     }
//   };
// }

// export const thunkActionCreator = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(
//         "https://random-data-api.com/api/users/random_user"
//       );
//       if (response.ok) {
//         const resData = await response.json();
//         console.log(resData);
//         //dispatch(updateName(`${resData.first_name} ${resData.last_name}`));
//       } else {
//         throw new Error();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
