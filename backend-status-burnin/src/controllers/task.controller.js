import { TaskModel } from "../models/task.model.js";


export class TaskController {

    static async getAll(req, res) {
        try {
            const tasks = await TaskModel.getAll();
            return res.status(200).send(tasks)
        } catch (error) {
            console.error('Error in TaskController.getAll', error);
            throw error;
        }
    }
}