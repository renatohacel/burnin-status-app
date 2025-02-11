import { useReducer, useState } from "react"
import { tasksReducer } from "../reducers/tasksReducer"
import { changeStatus, getAllTasks } from "../services/tasksService";



export const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, [])

    const getTasks = async () => {
        try {
            const response = await getAllTasks();
            dispatch({
                type: 'loadTasks',
                payload: response.data
            });
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const updateTaskState = async (task) => {
        const oldTask = tasks.find((t) => t.id === task.id);
        dispatch({
            type: 'updateStateTask',
            payload: task
        })
        try {
            await changeStatus(task);
        } catch (error) {
            dispatch({
                type: 'updateTask',
                payload: oldTask,
            });
            console.error('Error change status task:', error)
        }
    }


    return {
        tasks,



        updateTaskState,
        getTasks
    }
}