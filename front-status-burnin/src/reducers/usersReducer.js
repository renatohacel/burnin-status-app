export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'addUser':
            return [action.payload, ...state];
        case 'updateUser':
            return state.map((user) => {
                if (user.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return user;
            });
        case 'deleteUser':
            return state.filter(emp => emp.id !== action.payload);
        case 'loadUsers':
            return action.payload;
        default:
            return state;
    }
}