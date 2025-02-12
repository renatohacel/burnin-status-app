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
            const status = await Status.findAll({
                order: [['id', 'DESC']]
            })
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

            //create status Title
            const newStatusTitle = await Status.create({
                task_id: newTask.id,
                date: newTask.date,
                time: newTask.time,
                updated_by: newTask.created_by,
                input: `Title Created`,
                value: `${newTask.title}`
            })
            //create status Description
            const newStatusDesc = await Status.create({
                task_id: newTask.id,
                date: newTask.date,
                time: newTask.time,
                updated_by: newTask.created_by,
                input: `Description Created`,
                value: `${newTask.description}`
            })
            //update status Status
            const newStatusStu = await Status.create({
                task_id: newTask.id,
                date: newTask.date,
                time: newTask.time,
                updated_by: newTask.created_by,
                input: `Status Set`,
                value: newTask.status
            })
            return { newTask, newStatusTitle, newStatusDesc, newStatusStu };
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


        if (input.title && task.title !== input.title) {
            //update status
            await Status.create({
                task_id: id,
                date: input.date,
                time: input.time,
                updated_by: input.updated_by,
                input: 'Title Updated',
                value: input.title
            })
        }
        if (input.description && task.description !== input.description) {
            //update status
            await Status.create({
                task_id: id,
                date: input.date,
                time: input.time,
                updated_by: input.updated_by,
                input: 'Description Updated',
                value: input.description
            })
        }
        if (input.status && task.status !== input.status) {
            //update status
            await Status.create({
                task_id: id,
                date: input.date,
                time: input.time,
                updated_by: input.updated_by,
                input: 'Status Updated',
                value: input.status
            })
        }

        delete input.updated_by

        const updatedTask = await task.update(input);

        return { updatedTask };
    }
}