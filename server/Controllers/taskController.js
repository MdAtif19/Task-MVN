const Task = require("../Models/taskModel");

const createTask = async (req, res) => {
  try {
    const { userId, title, des, status } = req.body;
    const task = new Task({ userId, title, des, status });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getTasksByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getTaskByTaskId = async (req, res) => {
  const taskId = req.params.taskId;
  console.log("taskId", taskId);

  try {
    const task = await Task.findById({ taskId });
    console.log("Retrieved task:", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createTask, getTasksByUserId, getAllTasks, getTaskByTaskId };
