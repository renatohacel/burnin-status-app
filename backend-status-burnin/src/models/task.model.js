import { Status } from "../schemas/status.schema.js";
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

    static async getStatus() {
        try {
            const status = await Status.findAll()
            return status;
        } catch (error) {
            console.error('Error in TaskModel.getStatus', error);
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

            delete input.id

            const newTask = await Task.create(input)

            //update status
            const newStatus = await Status.create({
                task_id: newTask.id,
                date: newTask.date,
                time: newTask.time,
                updated_by: newTask.created_by,
            })
            return { newTask, newStatus };
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

        //update status
        await Status.create({
            task_id: id,
            date: input.date,
            time: input.time,
            updated_by: input.updated_by,
        })

        delete input.updated_by

        const updatedTask = await task.update(input);

        return updatedTask;
    }
}