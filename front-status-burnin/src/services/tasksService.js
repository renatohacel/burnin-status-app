import axios from 'axios'

const BASE_URL = 'http://localhost:3001/tasks';


//TASKS -----------------------------------------------------------------
export const getAllTasks = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true });
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

//STATUS -----------------------------------------------------------------
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

//WORKING ON -----------------------------------------------------------------
export const getWorkingOn = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/working_on`, {}, { withCredentials: true })
        return response;
    } catch (error) {

    }
}
export const createWorkingOn = async (input) => {
    try {
        const response = await axios.post(`${BASE_URL}/working_on`, input, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}
export const deleteWorkingOn = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/working_on/${id}`, {}, { withCredentials: true })
        return response
    } catch (error) {
        return error.response
    }
}


//ACTIVITY LOGS -----------------------------------------------------------------
export const generateLog = async (input) => {
    try {
        const response = await axios.post(`${BASE_URL}/generate_activity_log`, input, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}
export const getBurninActivityLogs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/burnin_activity_log`, {}, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}
export const getBCActivityLogs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/bc_activity_log`, {}, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}