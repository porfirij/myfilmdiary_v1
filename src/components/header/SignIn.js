import { NavLink } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? "mr-5 p-2 font-medium leading-6 text-gray-100 bg-gray-500 rounded-md"
            : "mr-5 p-2 font-mediummr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={({ isActive }) =>
          isActive
            ? "inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-700 border border-transparent shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 rounded-md"
            : "inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-700 border border-transparent shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 rounded-md"
        }
      >
        Sign Up
      </NavLink>
    </div>
  );
}
