import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const storeLogger = ({ getState }) => {
  return (next) => (action) => {
    console.log("first middleware ran");
    console.log("will dispatch", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log("state after dispatch", getState());

    // // This will likely be the action itself, unless
    // // a middleware further in chain changed it.
    return returnValue;
  };
};

const store = createStore(reducer, applyMiddleware(storeLogger, thunk));
//const store = createStore(reducer, applyMiddleware(thunk));

export default store;
