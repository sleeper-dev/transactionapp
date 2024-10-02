import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoNotifications, IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useNotifications } from "../lib/useNotifications";
import { useOutsideClick } from "../lib/useOutsideClick";
import LogoutButton from "./LogoutButton";
import { format } from "date-fns";

function Header() {
  const {
    notifications,
    markAsRead,
    deleteAllNotifications,
    countUnreadNotifications,
    loading,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const dropdownRef = useOutsideClick(handleCloseDropdown);

  const toggleDropdown = () => {
    markAsRead();
    setIsOpen((prev) => !prev);
  };

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
          <div className="flex flex-row items-center gap-4" ref={dropdownRef}>
            <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                className="relative flex items-center text-2xl text-green-100 hover:text-white"
              >
                {countUnreadNotifications() > 0 && (
                  <span class="absolute -right-3 -top-3 rounded-full bg-red-500 p-1 text-xs font-medium text-red-100">
                    {countUnreadNotifications()}
                  </span>
                )}

                {isOpen ? <IoNotifications /> : <IoMdNotificationsOutline />}
              </button>
              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 max-h-[35rem] w-[25rem] overflow-hidden overflow-y-scroll rounded-xl border border-gray-300 bg-white shadow-lg [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
                  <div className="flex items-center justify-between border-b border-gray-200 p-4 shadow-md">
                    <h1 className="font-semibold text-zinc-800">
                      Notifications
                    </h1>
                    <button
                      onClick={deleteAllNotifications}
                      className="rounded-md bg-red-600 px-2 py-1 text-xs text-white"
                    >
                      Clear all
                    </button>
                  </div>
                  {notifications?.length > 0 ? (
                    <ul className="">
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className="flex flex-col border-b border-gray-300 bg-gray-100 p-4 text-sm font-medium text-zinc-800"
                        >
                          <span>{notif.message}</span>
                          <span className="mt-2 text-xs text-zinc-600">
                            {format(
                              new Date(notif.dateCreated),
                              "dd.MM.yyyy, hh:mm aa",
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-gray-100 p-5 text-center">
                      <h1>No notifications</h1>
                    </div>
                  )}
                </div>
              )}
            </div>
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
