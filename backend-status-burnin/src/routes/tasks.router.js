import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

export const tasksRouter = Router();

//TASKS
//getAll tasks
tasksRouter.get('/', TaskController.getAll);
//create task
tasksRouter.post('/', TaskController.create);
//delete task
tasksRouter.delete('/:id', TaskController.delete);
//update task
tasksRouter.patch('/:id', TaskController.update);

//STATUS
//getStatus
tasksRouter.get('/status', TaskController.getStatus);

//WORKING ON
//getWorkingOn
tasksRouter.get('/working_on', TaskController.getWorkingOn);
//createWorkingOn
tasksRouter.post('/working_on', TaskController.create_working_on);
//deleteWorkingOn
tasksRouter.delete('/working_on/:id', TaskController.delete_working_on);

//ACTIVITY LOGS
//generate activity log
tasksRouter.post('/generate_activity_log_excel', TaskController.generate_activity_log_excel);
tasksRouter.post('/generate_activity_log_db', TaskController.generate_activity_log_db);
//get burnin activity log
tasksRouter.get('/burnin_activity_log', TaskController.getBurninActivityLog);
//get bc activity log
tasksRouter.get('/bc_activity_log', TaskController.getBCActivityLog);









