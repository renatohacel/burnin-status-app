import { Status } from "../schemas/status.schema.js";
import { Task } from "../schemas/task.schema.js";
import { User } from "../schemas/user.schema.js";
import { WorkingOn } from "../schemas/working_on.schema.js";
import { BCActivityLog, BurninActivityLog } from "../schemas/activity_log.schema.js";
//DAYJS
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);
//EXCEL
import ExcelJS from 'exceljs'



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

    static async getWorkingOn() {
        try {
            const workin_on = await WorkingOn.findAll({
                order: [['id', 'DESC']]
            })
            return workin_on;
        } catch (error) {
            console.error('Error in TaskModel.getWorkingOn', error);
            throw error;
        }
    }

    static async getBurninActivityLog() {
        try {
            const burnin_activity_log = await BurninActivityLog.findAll({
                order: [['id', 'DESC']]
            })
            return burnin_activity_log;
        } catch (error) {
            console.error('Error in TaskModel.getBurninActivityLog', error);
            throw error;
        }
    }

    static async getBCActivityLog() {
        try {
            const bc_activity_log = await BCActivityLog.findAll({
                order: [['id', 'DESC']]
            })
            return bc_activity_log;
        } catch (error) {
            console.error('Error in TaskModel.getBurninActivityLog', error);
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
            //update status Status
            const newStatusStu = await Status.create({
                task_id: newTask.id,
                date: newTask.date,
                time: newTask.time,
                updated_by: newTask.created_by,
                input: `Status Set`,
                value: newTask.status
            })
            if (input.description) {
                //create status Description
                const newStatusDesc = await Status.create({
                    task_id: newTask.id,
                    date: newTask.date,
                    time: newTask.time,
                    updated_by: newTask.created_by,
                    input: `Description Created`,
                    value: `${newTask.description}`
                })
                return { newTask, newStatusTitle, newStatusDesc, newStatusStu };
            }
            return { newTask, newStatusTitle, newStatusStu };

        } catch (error) {
            console.error('Error in TaskModel.create', error);
            throw error;
        }
    }

    static async create_working_on({ input }) {
        try {
            const working_on_exists = await WorkingOn.findOne({
                where: { task_id: input.task_id }
            })
            if (working_on_exists?.user_id === input.user_id) {
                return false;
            }

            const newWorkingOn = await WorkingOn.create(input)
            return newWorkingOn;

        } catch (error) {
            console.error('Error in TaskModel.create_working_on', error);
            throw error;
        }
    }
    static async delete_working_on({ id }) {
        try {
            const working_on = await WorkingOn.findByPk(id)
            if (!working_on) return false

            await working_on.destroy()
            return true
        } catch (error) {
            console.error('Error in TaskModel.delete_working_on', error);
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            const task = await Task.findByPk(id);
            if (!task) return false;

            await Status.destroy({
                where: { task_id: task.id }
            })

            await task.destroy();
            await WorkingOn.destroy({
                where: { task_id: id }
            })

            return true;
        } catch (error) {
            console.error('Error in TaskModel.delete', error);
            throw error;
        }
    }

    static async update({ input, id }) {
        try {
            const task = await Task.findByPk(id);
            if (!task) return null;


            if (input.title && task.title !== input.title) {
                //update status
                await Status.create({
                    task_id: id,
                    date: input.date,
                    time: input.time,
                    updated_by: input.updated_by,
                    input: 'Title Updated To',
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
                    input: 'Description Updated To',
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
                    input: 'Status Updated To',
                    value: input.status
                })
            }

            delete input.updated_by

            const updatedTask = await task.update(input);

            return { updatedTask };
        } catch (error) {
            console.error('Error in TaskModel.update', error);
            throw error;
        }

    }

    static async generate_activity_log({ input }) {
        try {
            const date = dayjs().tz("America/Mexico_City");
            const formattedDate = date.format("YYYY-MM-DD");
            const formattedTime = date.format("HH:mm:ss");

            const shift = (formattedTime >= '07:00:00' && formattedTime < '15:00:00')
                ? 1
                : (formattedTime >= '15:00:00' && formattedTime < '22:30:00')
                    ? 2
                    : (formattedTime >= '22:30:00' || formattedTime < '07:00:00')
                        ? 3
                        : 'Unknown Shift';

            if (shift !== input.shift) {
                return false;
            }

            const status = await Status.findAll({
                where: {
                    date: formattedDate
                }
            });

            const tasks_ids = [...new Set(status.map((st) => st.dataValues.task_id))];

            const all_tasks = await Promise.all(tasks_ids.map(async (task_id) => {
                const task = await Task.findByPk(task_id);
                if (task && task.dataValues.area === input.area) {
                    return task;
                }
                return null;
            }));

            const tasks = all_tasks.filter((task) => task !== null);

            const all_eng = await Promise.all(tasks_ids.map(async (task_id) => {
                const wkOn = await WorkingOn.findAll({
                    where: {
                        task_id: task_id
                    }
                });
                return wkOn.map(wk => wk.dataValues);
            }));

            const all_eng_dataValues = all_eng.flat();

            const taskUserMap = all_eng_dataValues.reduce((acc, curr) => {
                if (!acc[curr.task_id]) {
                    acc[curr.task_id] = [];
                }
                acc[curr.task_id].push(curr.user_id);
                return acc;
            }, {});

            // Prepare Excel Workbook
            const workbook = new ExcelJS.Workbook();
            const sheetName = `Shift ${shift} - ${formattedDate}`;
            const fileName = input.area === 'Burnin'
                ? `Burnin Shift Activities.xlsx`
                : input.area === 'BC'
                    ? `BC Shift Activities.xlsx`
                    : `Unknown Area Shift Activities.xlsx`;

            const sheet = workbook.addWorksheet(sheetName);
            sheet.addRow(['Date', 'Shift', 'Activities', 'Description', 'Engineer']);
            const headerRow = sheet.getRow(1);
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF0070C0' }
                };
                cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });

            for (const task of tasks) {
                const workingOnUsers = await Promise.all(taskUserMap[task.id]?.map(async (user_id) => {
                    const user = await User.findByPk(user_id);
                    if (user && user.dataValues.shift === shift) {
                        return user.dataValues.name;
                    }
                    return null;
                }) || []);

                const validUsers = workingOnUsers.filter(name => name !== null);

                // Determine the appropriate activity log table
                const ActivityLogModel = input.area === 'Burnin' ? BurninActivityLog : BCActivityLog;

                // Check if an activity log already exists for the same date and shift
                let activityLog = await ActivityLogModel.findOne({
                    where: {
                        date: formattedDate,
                        shift: shift,
                        task_id: task.id
                    }
                });

                if (activityLog) {
                    // Update existing activity log
                    activityLog.engineers = validUsers.join(', ');
                    await activityLog.save();
                } else {
                    // Create new activity log
                    await ActivityLogModel.create({
                        date: formattedDate,
                        shift: shift,
                        task_id: task.id,
                        engineers: validUsers.join(', '),
                    });
                }

                // Add row to Excel sheet
                const row = sheet.addRow([formattedDate, shift, task.title, task.description, validUsers.join(', ')]);
                row.eachCell((cell) => {
                    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    cell.alignment = { vertical: 'top', wrapText: true };
                });
            }

            sheet.columns = [
                { key: 'date', width: 15 },
                { key: 'shift', width: 10 },
                { key: 'activities', width: 30 },
                { key: 'description', width: 50 },
                { key: 'engineer', width: 30 }
            ];

            await workbook.xlsx.writeFile(fileName);

            return true;
        } catch (error) {
            console.error('Error in TaskModel.generate_activiy_log', error);
            throw error;
        }
    }






}