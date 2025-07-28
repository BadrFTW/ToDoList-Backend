import express from "express";
const tasksRouter = express.Router();
import {createTask,updateTask,deleteTask,updateTaskStatus,getTasks } from "../controllers/tasksController.js";

tasksRouter.post("/",createTask);

tasksRouter.get("/",getTasks);

tasksRouter.delete("/:id",deleteTask);
tasksRouter.put("/:id",updateTask);
tasksRouter.put("/completed/:id",updateTaskStatus);

export default tasksRouter;