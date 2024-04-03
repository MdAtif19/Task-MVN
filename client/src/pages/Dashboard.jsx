import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  // Use the useContext hook to access the tasks data from TaskContext
  const { tasks, isTaskLoading, taskError } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    // Filter tasks based on the user ID
    if (user?._id) {
      const filteredTasks = tasks.filter((task) => task.userId === user._id);
      setUserTasks(filteredTasks);
    }
  }, [tasks, user]);

  return (
    <>
      <Navbar />
      <section className="px-4 py-8 bg-slate-400 h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Hey, {user.first_name} {user.last_name} This is your Tasks Here
        </h1>
        {isTaskLoading ? (
          <p>Loading tasks...</p>
        ) : taskError ? (
          <p>Error fetching tasks: {taskError.message}</p>
        ) : (
          <div className="flex justify-center items-center gap-5">
            {userTasks.map((task) => (
              <div key={task._id} className="mb-4">
                <Link to={`/tasks/${task._id}`}>
                  <div className=" bg-white shadow-md rounded-md p-4">
                    <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                    <p className="text-gray-600 mb-2">{task.des}</p>
                    <p
                      className={`text-sm font-semibold ${
                        task.status === "complete"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {task.status}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
