import React from "react";
import Sidebar from "./Sidebar";
import AllTasks from "./AllTasks";
import Completed from "./Completed";
import Incomplete from "./Incomplete";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-500 p-5">
      {/* Sidebar */}
      <div className="bg-gray-400 ml-5">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-grow bg-cyan-300 ml-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all-tasks" element={<AllTasks />} />
          <Route path="completed" element={<Completed />} />
          <Route path="incomplete" element={<Incomplete />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
