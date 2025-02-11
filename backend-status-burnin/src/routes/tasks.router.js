import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";


export const tasksRouter = Router();

//getAll
tasksRouter.get('/', TaskController.getAll);

//getStatus
tasksRouter.get('/status', TaskController.getStatus);

//create
tasksRouter.post('/', TaskController.create);

// //delete
// tasksRouter.delete('/:id', TaskController.delete);

//update
tasksRouter.patch('/:id', TaskController.update);