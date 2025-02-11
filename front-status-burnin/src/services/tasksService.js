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