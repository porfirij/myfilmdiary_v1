import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
      <NavLink
        to="/aboutus"
        className={({ isActive }) =>
          isActive
            ? "mr-5 p-2 font-medium leading-6 text-gray-600 bg-gray-300 rounded-md"
            : "mr-5 p-2 font-mediummr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
        }
      >
        About Us
      </NavLink>
    </nav>
  );
}
