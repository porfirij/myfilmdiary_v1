import { useEffect, useState } from "react";
import { fetchApi } from "./../../misc/api-functions";
import { useNavigate } from "react-router-dom";
import * as actions from "./../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import useInput from "./../hooks/use-input";
import inputValidator from "./../../misc/inputValidator";
import errorParser from "./../../misc/errorParser";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const { user, api } = useSelector((state) => state);
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const oobCode = query.get("oobCode");

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (oobCode) {
      console.log("oobcode: " + oobCode);
    } else {
      console.log("No oob");
    }
  }, [user.isLoggedIn, navigate, oobCode]);

  const sendVerificationCodeHandler = () => {
    dispatch(actions.sendEmailVerification(user.token, user.id, user.email));
  };

  const confirmEmailAndLogInHandler = () => {
    dispatch(actions.confirmEmailAndLogIn(user));
  };

  const {
    value: verificationCodeValue,
    valid: verificationCodeValid,
    error: verificationCodeError,
    changeHandler: verificationCodeChange,
    blurHandler: verificationCodeBlur
  } = useInput(inputValidator.bind(null, "verificationCode"));

  const verificationCodeHandler = () => {
    if (!verificationCodeValid) return;
    dispatch(
      actions.sendEmailConfirmation(verificationCodeValue, user.id, user.token)
    );
  };

  const logOutHandler = () => {
    dispatch(actions.logOutUser());
    navigate("/login", { replace: true });
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
            <h3 className="mb-6 text-2xl font-medium text-center">
              {user.sentEmailVerification &&
                !user.emailIsVerified &&
                !api.error &&
                `We have sent an email with a confirmation link to your email address. `}
              {user.token &&
                !user.emailIsVerified &&
                !api.error &&
                `Please verify your email address.`}
              {api.error && `${errorParser(api.errorMsg)}`}
            </h3>

            <input
              type="text"
              name="verificationCode"
              className={
                verificationCodeError
                  ? "block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-purple-700 focus:outline-none rounded-md bg-red-100"
                  : "block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-purple-700 focus:outline-none rounded-md"
              }
              placeholder="Verification code"
              value={verificationCodeValue}
              onChange={verificationCodeChange}
              onBlur={verificationCodeBlur}
            />
            <div className="block">
              <button
                onClick={verificationCodeHandler}
                className={
                  verificationCodeValid
                    ? "w-full px-3 py-4 font-medium text-white bg-purple-700 rounded-md"
                    : "w-full px-3 py-4 font-medium text-white bg-purple-400 rounded-md"
                }
                disabled={!verificationCodeValid}
              >
                Confirm My Email
              </button>
            </div>
            <div className="block mt-4">
              <button
                onClick={sendVerificationCodeHandler}
                className={
                  "w-full px-3 py-4 font-medium text-white bg-purple-700 rounded-md"
                }
              >
                Send verification code again to my email: {user.email}
              </button>
            </div>
            <div className="block mt-4">
              <button
                onClick={confirmEmailAndLogInHandler}
                className={
                  "w-full px-3 py-4 font-medium text-white bg-purple-700 rounded-md"
                }
              >
                I have verified my e-mail, please log me in!
              </button>
            </div>
            <div className="block mt-4">
              <button
                onClick={logOutHandler}
                className={
                  "w-full px-3 py-4 font-medium text-white bg-purple-700 rounded-md"
                }
              >
                Login with different e-mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
