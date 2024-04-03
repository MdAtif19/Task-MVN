import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { baseUrl } from "../utils/service";
import UpdateTaskForm from "../components/UpdateTaskForm";

const Dashboard = () => {
  const { tasks, isTaskLoading, taskError, setTasks } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const [userTasks, setUserTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("incomplete");
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  console.log("current Users all task:", userTasks);
  console.log("selectedTaskId :", selectedTaskId);

  useEffect(() => {
    if (user?._id) {
      const filteredTasks = tasks.filter((task) => task.userId === user._id);
      setUserTasks(filteredTasks);
    }
  }, [tasks, user]);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(`${baseUrl}/tasks`, {
        title: newTaskTitle,
        des: newTaskDescription,
        userId: user._id,
        status: newTaskStatus,
      });
      setUserTasks([...userTasks, response.data]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/tasks/${taskId}`);
      const updatedTasks = userTasks.filter((task) => task._id !== taskId);
      setUserTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // const handleUpdateTask = async (taskId) => {
  //   console.log("Need to update taskId", taskId);
  //   // Find the task to update
  //   const taskToUpdate = userTasks.find((task) => task._id === taskId);
  //   console.log("taskToUpdate:", taskToUpdate);
  //   if (!taskToUpdate) {
  //     console.error("Task not found for taskId:", taskId);
  //     return;
  //   }
  // };

  const handleUpdateTask = (taskId) => {
    // Set the taskId in state
    setUpdateTaskId(taskId);
    console.log("selected taskId ", taskId);
    setSelectedTaskId();
    // Show the modal
    setUpdateModalVisible(true);
  };

  return (
    <>
      <Navbar />
      <section className="px-4 py-8 bg-slate-400 h-screen">
        <div className="flex justify-around items-center">
          <h1 className="text-3xl font-bold mb-4">
            Hey, {user.first_name} {user.last_name} This is your Tasks Here
          </h1>
          <button
            onClick={() => setModalVisible(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Task
          </button>
        </div>
        {isTaskLoading ? (
          <p>Loading tasks...</p>
        ) : taskError ? (
          <p>Error fetching tasks: {taskError.message}</p>
        ) : (
          <div className="flex justify-center items-center gap-5">
            {userTasks.map((task) => (
              <div key={task._id} className="mb-4">
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
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleUpdateTask(task._id)} // Call handleUpdateTask with task ID
                      className="text-blue-600 font-semibold mt-2 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-600 font-semibold mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-lg font-bold mb-4">Create New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full mb-4 p-2 rounded border"
            />
            <textarea
              placeholder="Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full mb-4 p-2 rounded border"
            ></textarea>
            <select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
              className="w-full mb-4 p-2 rounded border"
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setModalVisible(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the UpdateTaskForm component only when modalVisible is true */}
      {updateModalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <UpdateTaskForm
            userId={user._id}
            taskToUpdate={userTasks.find((task) => task._id === updateTaskId)}
            onSubmit={(updateTaskDetails) => {
              // Submit the updated task details
              console.log("Updated task details:", updateTaskDetails);
              // Hide the modal
              setUpdateModalVisible(false);
            }}
            onCancel={() => setUpdateModalVisible(false)}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
