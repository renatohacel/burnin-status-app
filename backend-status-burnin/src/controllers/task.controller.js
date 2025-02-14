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

    static async getStatus(req, res) {
        try {
            const status = await TaskModel.getStatus();
            return res.status(200).send(status);
        } catch (error) {
            console.error('Error in TaskController.getStatus', error);
            throw error;
        }
    }

    static async getWorkingOn(req, res) {
        try {
            const working_on = await TaskModel.getWorkingOn();
            return res.status(200).send(working_on);
        } catch (error) {
            console.error('Error in TaskController.getWorkingOn', error);
            throw error;
        }
    }

    static async create(req, res) {
        try {
            const result = await TaskModel.create({ input: req.body });
            if (result === null) {
                return res.status(409).send({ error: 'Employee does not exist' })
            }
            return res.status(201).send({ result })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }

    static async create_working_on(req, res) {
        try {
            const result = await TaskModel.create_working_on({ input: req.body });
            if (!result) return res.status(409).send({ error: 'Employee is already working on this' });

            return res.status(201).send({ result });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }


    static async delete_working_on(req, res) {
        try {
            const { id } = req.params
            const result = await TaskModel.delete_working_on({ id })
            if (!result) return res.status(404).send({ message: 'working_on not found' })
            return res.status(200).send({ message: 'you are working on one task' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params
            const result = await TaskModel.delete({ id })
            if (!result) return res.status(404).send({ message: 'task not found' })
            return res.status(200).send({ message: 'task successfully deleted ' })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const result = await TaskModel.update({ id, input: req.body })
            if (result === null) return res.status(404).json({ message: 'Task not found' });

            return res.status(201).send({ result });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Server error' })
        }
    }
}