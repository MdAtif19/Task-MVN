import React, { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRequest, postRequest, baseUrl } from "../utils/service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState(null);
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    status: "incomplete",
  });

  const showToast = useCallback((message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsTaskLoading(true);
    setTaskError(null);

    try {
      // Make a GET request to fetch all tasks
      const response = await getRequest(`${baseUrl}/tasks`);
      setTasks(response);
    } catch (error) {
      setTaskError(error);
    }

    setIsTaskLoading(false);
  };

  const updateTaskInfo = useCallback((info) => {
    setTaskInfo(info);
  }, []);

  const createTask = useCallback(async () => {
    setIsTaskLoading(true);
    setTaskError(null);

    try {
      // Make a POST request to create a new task
      const response = await postRequest(`${baseUrl}/tasks`, taskInfo);
      // Add the newly created task to the tasks state
      setTasks([...tasks, response]);
      showToast("Task created successfully!");
    } catch (error) {
      setTaskError(error);
    }

    setIsTaskLoading(false);
  }, [taskInfo, tasks, showToast]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        taskInfo,
        updateTaskInfo,
        taskError,
        isTaskLoading,
      }}
    >
      <ToastContainer />
      {children}
    </TaskContext.Provider>
  );
};

// Add prop types validation for children
TaskContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
