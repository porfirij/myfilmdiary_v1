import { useDispatch } from "react-redux";
import * as actions from "./../../store/actions";
import { NavLink } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(actions.logOutUser());
  };

  return (
    <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          isActive
            ? "inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-700 border border-transparent shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 rounded-md"
            : "inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-700 border border-transparent shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 rounded-md"
        }
        onClick={logoutHandler}
      >
        LogOut
      </NavLink>
    </div>
  );
}
