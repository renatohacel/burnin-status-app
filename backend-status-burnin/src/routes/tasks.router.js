import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";


export const tasksRouter = Router();

//getAll tasks
tasksRouter.get('/', TaskController.getAll);

//getStatus
tasksRouter.get('/status', TaskController.getStatus);

//getWorkingOn
tasksRouter.get('/working_on', TaskController.getWorkingOn);

//create task
tasksRouter.post('/', TaskController.create);

//createWorkingOn
tasksRouter.post('/working_on', TaskController.create_working_on);


//delete task
tasksRouter.delete('/:id', TaskController.delete);

//deleteWorkingOn
tasksRouter.delete('/working_on/:id', TaskController.delete_working_on);

//update task
tasksRouter.patch('/:id', TaskController.update);