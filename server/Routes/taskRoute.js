// Routes/taskRoute.js
const express = require("express");
const {
  createTask,
  getTasksByUserId,
  getAllTasks,
  getTaskByTaskId,
} = require("../Controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/:userId", getTasksByUserId);
router.get("/", getAllTasks);
router.get("/:taskId", getTaskByTaskId);

module.exports = router;
