import { Task } from "../schemas/task.schema.js";



export class TaskModel {
    static async getAll() {
        try {
            const tasks = await Task.findAll({
                order: [['id', 'DESC']],
            })
            return tasks
        } catch (error) {
            console.error('Error in TaskModel.getAll', error);
            throw error;
        }
    }

    static async create({ input }) {
        try {
            const newTask = await Task.create(input)
            return newTask;
        } catch (error) {
            console.error('Error in TaskModel.create', error);
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const task = await Task.findByPk(id);
            if (!task) return false;

            await task.destroy();

            return true;
        } catch (error) {
            console.error('Error in TaskModel.delete', error);
            throw error;
        }
    }

    static async update({ input, id }) {
        const task = await Task.findByPk(id);
        if (!task) return null;


        const updatedTask = await task.update(input);

        return updatedTask;
    }
}