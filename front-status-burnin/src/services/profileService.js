import axios from 'axios';

const BASE_URL = 'http://localhost:3001/users';


export const updateProfile = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${input.id}`, input, { withCredentials: true });
        return response;
    } catch (error) {
        return error.response
    }
}
