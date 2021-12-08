import { useReducer } from "react";

const initialState = {
  value: null,
  touched: false,
  error: false
};

function reducer(state, action) {
  switch (action.type) {
    case "input":
      return { ...state, value: action.payload };
    case "touched":
      return { ...state, touched: true };
    case "error":
      return { ...state, error: true };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
}

const useInput = (validator) => {
  const [inputState, dispatch] = useReducer(reducer, initialState);

  const changeHandler = (value) => {
    dispatch({ type: "input", payload: value });
    if (inputState.touced && !validator(inputState.value))
      dispatch({ type: "error" });
  };

  const blurHandler = () => {
    dispatch({ type: "blur" });
  };

  return {
    value: inputState.value,
    touched: inputState.touched,
    error: inputState.error,
    changeHandler
  };
};
