import { Status } from "../schemas/status.schema.js";
import { Task } from "../schemas/task.schema.js";
import { User } from "../schemas/user.schema.js";
import { WorkingOn } from "../schemas/working_on.schema.js";
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
            // Fecha/hora local con Day.js
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
                if (task.dataValues.area === input.area) {
                    return task;
                }
                return;
            }));

            const tasks = all_tasks.filter((task) => task !== undefined);

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

            // Crear el archivo Excel
            const workbook = new ExcelJS.Workbook();
            const sheetName = `Shift ${shift} - ${formattedDate}`;

            // Determinar el nombre del archivo según el área
            const fileName = input.area === 'Burnin'
                ? `Burnin Shift Activities.xlsx`
                : input.area === 'BC'
                    ? `BC Shift Activities.xlsx`
                    : `Unknown Area Shift Activities.xlsx`;

            // Crear una nueva hoja
            const sheet = workbook.addWorksheet(sheetName);

            // Añadir encabezados con estilos
            sheet.addRow(['Date', 'Shift', 'Activities', 'Description', 'Engineer']);
            const headerRow = sheet.getRow(1);
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF0070C0' } // Color azul
                };
                cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });

            // Añadir datos con estilos
            await Promise.all(tasks.map(async (task) => {
                const workingOnUsers = await Promise.all(taskUserMap[task.id]?.map(async (user_id) => {
                    const user = await User.findByPk(user_id);
                    return user.dataValues.name;
                }) || []);

                const row = sheet.addRow([formattedDate, shift, task.title, task.description, workingOnUsers.join(', ')]);
                row.eachCell((cell) => {
                    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    cell.alignment = { vertical: 'top', wrapText: true }; // Habilitar ajuste de texto
                });
            }));

            // Ajustar el ancho de las columnas para que el contenido sea visible
            sheet.columns = [
                { key: 'date', width: 15 },
                { key: 'shift', width: 10 },
                { key: 'activities', width: 30 },
                { key: 'description', width: 50 },
                { key: 'engineer', width: 30 }
            ];

            // Guardar el archivo Excel
            await workbook.xlsx.writeFile(fileName);

            console.log('DATE: ', formattedDate);
            console.log('SHIFT: ', shift);
            console.log('AREA: ', input.area);
            console.log('TASKS OF DAY:');
            console.log('------------------------------');
            await Promise.all(tasks.map(async (task) => {
                const workingOnUsers = await Promise.all(taskUserMap[task.id]?.map(async (user_id) => {
                    const user = await User.findByPk(user_id);
                    return user.dataValues.name;
                }) || []);

                console.log('TITLE: ', task.title);
                console.log('DESCRIPTION: ', task.description);
                console.log('WORKING ON: ', workingOnUsers);
                console.log('------------------------------');
            }));

            return true;
        } catch (error) {
            console.error('Error in TaskModel.generate_activiy_log', error);
            throw error;
        }
    }




}