import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import LogOut from "./LogOut";

export default function Header() {
  const user = useSelector((state) => state.user);

  return (
    <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
      <div className="relative flex flex-col md:flex-row">
        <Link
          to="/"
          className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
        >
          <span className="mx-auto text-xl font-black leading-none text-purple-700 select-none">
            My Movie Diary
          </span>
        </Link>
        <NavBar />
      </div>
      {!user.isLoggedIn && <SignIn />}
      {user.isLoggedIn && <LogOut />}
    </div>
  );
}
