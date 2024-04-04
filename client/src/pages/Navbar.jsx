import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [showNavItems, setShowNavItems] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="flex justify-between items-center text-white font-bold px-10 py-5 bg-slate-800">
      <div>
        <Link to="/" className="font-bold text-2xl">
          Logo
        </Link>
      </div>
      <nav className="hidden md:block">
        <div className="flex gap-5">
          <ul>
            <Link to="/">All Task</Link>
          </ul>
          <ul>
            <Link to="/completed">Completed</Link>
          </ul>
          <ul>
            <Link to="/incomplete">Incomplete</Link>
          </ul>
        </div>
      </nav>
      <div className="flex justify-center items-center gap-3">
        <Link to="/profile" className="text-white">
          {user?.first_name} {user?.last_name}
        </Link>
        <span
          onClick={handleLogout}
          className="bg-blue-400 px-3 py-2 rounded cursor-pointer text-white hover:bg-slate-300"
        >
          Logout
        </span>
      </div>
      <div className="md:hidden">
        {showNavItems ? (
          <RxCross2
            className="text-white text-2xl cursor-pointer"
            onClick={() => setShowNavItems(!showNavItems)}
          />
        ) : (
          <GiHamburgerMenu
            className="text-white text-2xl cursor-pointer"
            onClick={() => setShowNavItems(!showNavItems)}
          />
        )}
      </div>
      {showNavItems && (
        <div className="md:hidden absolute top-16 right-0 bg-slate-800 text-white w-full">
          <ul className="p-4">
            <li>
              <Link to="/">All Task</Link>
            </li>
            <li>
              <Link to="/completed">Completed</Link>
            </li>
            <li>
              <Link to="/incomplete">Incomplete</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
