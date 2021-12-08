import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogIn from "./../../components/login/LogIn";
import LogOut from "./../../components/logout/LogOut";
import SignUp from "./../../components/signup/SignUp";
import VerifyEmail from "./../../components/signup/VerifyEmail";
import Main from "./../../components/main/Main2";
import NotFound from "./../../components/notfound/NotFound";

export const MainContent = () => {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  if (!user.isLoggedIn) navigate("/login", { replace: true });

  return <></>;
};
