import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { IoPersonOutline } from "react-icons/io5";

function Header() {
  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between bg-green-700 px-[16rem] py-6">
        <div className="mr-6 flex flex-shrink-0 items-center gap-3 text-white">
          <img src="/wheel.svg" alt="logo" />
          <span className="text-xl font-semibold tracking-tight">PayWheel</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white">
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full flex-grow lg:flex lg:w-auto lg:items-center">
          <div className="flex gap-5 lg:flex-grow">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full border-[1px] border-transparent border-opacity-50 px-3 py-2 text-lg ${isActive ? "bg-green-100 bg-opacity-30 text-white" : "text-green-100 hover:border-[1px] hover:border-slate-300 hover:text-white"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/send"
              className={({ isActive }) =>
                `rounded-full border-[1px] border-transparent border-opacity-50 px-3 py-2 text-lg ${isActive ? "bg-green-100 bg-opacity-30 text-white" : "text-green-100 hover:border-[1px] hover:border-slate-300 hover:text-white"}`
              }
            >
              Send
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `rounded-full border-[1px] border-transparent border-opacity-50 px-3 py-2 text-lg ${isActive ? "bg-green-100 bg-opacity-30 text-white" : "text-green-100 hover:border-[1px] hover:border-slate-300 hover:text-white"}`
              }
            >
              Transactions
            </NavLink>
          </div>
          <div className="flex flex-row items-center gap-4">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `text-2xl ${isActive ? "text-white" : "text-green-100 hover:text-white"}`
              }
            >
              <IoPersonOutline />
            </NavLink>
            <LogoutButton className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-green-700 lg:mt-0">
              Log out
            </LogoutButton>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
