import { Task } from "../schemas/task.schema.js";
import { User } from "../schemas/user.schema.js";



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
            const user_exists = await User.findOne({
                where: {
                    name: input.created_by
                }
            })

            if (!user_exists) return null;

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

        //add changes
        //if move it
        //if add new desc

        return updatedTask;
    }
}