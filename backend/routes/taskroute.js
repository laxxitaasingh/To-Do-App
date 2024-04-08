const express = require("express");
const {
    tasks ,
    addnewtask, 
    updateStatus,
    deleteTask,
    editTask
} = require("../controller/task");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/tasks", checkAuth, tasks);
router.post("/addNewTask", checkAuth, addnewtask);
router.put("/updateStatus", checkAuth, updateStatus);
router.delete("/deleteTask", checkAuth,deleteTask);
router.put("/editTask",checkAuth,editTask);

module.exports = router;