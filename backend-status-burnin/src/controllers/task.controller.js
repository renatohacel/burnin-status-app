import { TaskModel } from "../models/task.model.js";


export class TaskController {

    static async getAll(req, res) {
        try {
            const tasks = await TaskModel.getAll();
            return res.status(200).send(tasks);
        } catch (error) {
            console.error('Error in TaskController.getAll', error);
            throw error;
        }
    }

    static async create(req, res) {
        try {
            const result = await TaskModel.create({ input: req.body });
            if (result === null) {
                return res.status(409).send({ error: 'Num Employee does not exists' })
            }
            return res.status(201).send({ result })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }
}