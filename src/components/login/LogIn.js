import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as actions from "./../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import useInput from "./../hooks/use-input";
import inputValidator from "./../../misc/inputValidator";
import errorParser from "./../../misc/errorParser";

export default function LogIn() {
  const dispatch = useDispatch();
  const { user, api } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (user.token && !user.emailIsNotVerified) {
      navigate("/verifyemail", { replace: true });
    }
  }, [user, navigate]);

  const {
    value: emailValue,
    valid: emailValid,
    error: emailError,
    changeHandler: emailChange,
    blurHandler: emailBlur
  } = useInput(inputValidator.bind(null, "email"));

  const {
    value: pswValue,
    valid: pswValid,
    error: pswError,
    changeHandler: pswChange,
    blurHandler: pswBlur
  } = useInput(inputValidator.bind(null, "psw"));

  const formValid = emailValid && pswValid;

  const loginHandler = () => {
    if (!formValid) return;
    dispatch(actions.loginUser(emailValue, pswValue));
  };

  const signUpHandler = () => {
    dispatch(actions.apiReset());
    navigate("/signup", { replace: true });
  };

  const resetPswHandler = () => {
    dispatch(actions.apiReset());
    navigate("/resetpsw", { replace: true });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col items-center md:flex-row">
        <div className="w-full space-y-5 md:w-3/5 md:pr-16">
          <p className="font-medium text-purple-700 uppercase">
            Building Businesses
          </p>
          <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
            Changing The Way People Do Business.
          </h2>
          <p className="text-xl text-gray-600 md:pr-16">
            Learn how to engage with your visitors and teach them about your
            mission. We're revolutionizing the way customers and businesses
            interact.
          </p>
        </div>
        <div className="w-full mt-16 md:mt-0 md:w-2/5">
          <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-md">
            {!api.error && !api.loading && (
              <h3 className="mb-6 text-2xl font-medium text-center">Log In</h3>
            )}
            {api.loading && (
              <h3 className="mb-6 text-2xl font-medium text-center">
                Logging In...
              </h3>
            )}
            {api.error && (
              <h3 className="mb-6 text-2xl font-medium text-center">
                {errorParser(api.errorMsg)}
              </h3>
            )}

            <input
              type="text"
              name="email"
              className={
                emailError
                  ? "block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-purple-700 focus:outline-none rounded-md bg-red-100"
                  : "block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-purple-700 focus:outline-none rounded-md"
              }
              placeholder="Email address"
              value={emailValue}
              onChange={emailChange}
              onBlur={emailBlur}
            />
            <input
              type="password"
              name="password"
              className={
                pswError
                  ? "block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-purple-700 focus:outline-none rounded-md bg-red-100"
                  : "block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-purple-700 focus:outline-none rounded-md"
              }
              placeholder="Password"
              value={pswValue}
              onChange={pswChange}
              onBlur={pswBlur}
            />
            <div className="block">
              <button
                onClick={loginHandler}
                className={
                  formValid
                    ? "w-full px-3 py-4 font-medium text-white bg-purple-700 rounded-md"
                    : "w-full px-3 py-4 font-medium text-white bg-purple-400 rounded-md"
                }
                disabled={!formValid}
              >
                Log Me In
              </button>
            </div>
            <p className="w-full mt-4 text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <button
                className="text-blue-500 underline"
                onClick={signUpHandler}
              >
                Sign up here
              </button>
            </p>
            <p className="w-full mt-4 text-sm text-center text-gray-500">
              Forgot password?{" "}
              <button
                className="text-blue-500 underline"
                onClick={resetPswHandler}
              >
                Reset your password here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
