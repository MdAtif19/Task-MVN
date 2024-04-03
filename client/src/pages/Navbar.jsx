import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  console.log("User for logout", user);

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="flex justify-between items-center px-10 py-5 bg-slate-500">
      <div>
        <a href="/">Logo</a>
      </div>
      <nav>
        <div className="flex gap-5 ">
          <ul>
            <Link to="/all-tasks">All Task</Link>
          </ul>
          <ul>
            <Link to="/completed">completed</Link>
          </ul>
          <ul>
            <Link to="/incomplete">Incomplete</Link>
          </ul>
        </div>
      </nav>
      <div>
        <span
          onClick={handleLogout}
          className="bg-blue-400 px-3 py-2 rounded cursor-pointer text-white hover:bg-slate-300"
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Navbar;
