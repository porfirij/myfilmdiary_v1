import { useReducer } from "react";

const initialState = {
  value: "",
  touched: false
};

function reducer(state, action) {
  switch (action.type) {
    case "INPUT":
      return { ...state, value: action.payload };
    case "TOUCHED":
      return { ...state, touched: true };
    case "RESET":
      return {
        value: "",
        touched: false
      };
    default:
      return initialState;
  }
}

const useInput = (validator) => {
  const [inputState, dispatch] = useReducer(reducer, initialState);

  const changeHandler = (event) => {
    dispatch({ type: "INPUT", payload: event.target.value });
  };

  const blurHandler = () => {
    dispatch({ type: "TOUCHED" });
  };

  const valid = validator(inputState.value);
  const error = !valid && inputState.touched;

  return {
    value: inputState.value,
    valid,
    error,
    changeHandler,
    blurHandler
  };
};

export default useInput;
