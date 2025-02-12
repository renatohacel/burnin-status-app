import axios from 'axios'

const BASE_URL = 'http://localhost:3001/tasks';

export const getAllTasks = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true });
        return response;
    } catch (error) {
        return error.response
    }
}

export const getStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/status`, {}, { withCredentials: true })
        return response;
    } catch (error) {

    }
}

export const changeStatus = async (task) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${task.id}`, { status: task.status, date: task.date, time: task.time, updated_by: task.updated_by }, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}

export const createTask = async (task) => {
    try {
        const response = await axios.post(BASE_URL, task, { withCredentials: true });
        return response;
    } catch (error) {
        return error.response
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true })
        return response
    } catch (error) {
        return error.response

    }
}

export const updateTask = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${input.id}`, input, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}