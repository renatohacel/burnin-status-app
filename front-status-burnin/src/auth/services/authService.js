import axios from 'axios';

export const loginUser = async ({ username, password }) => {
    try {
        const response = await axios.post('http://localhost:3001/login', { username, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Invalid username or password');
    }
};

export const logoutUser = async () => {
    try {
        await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
    } catch (error) {
        throw new Error('Error logging out');
    }
};