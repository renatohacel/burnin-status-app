export const statusReducer = (state = [], action) => {
    switch (action.type) {
        case 'addStatus':
            return [action.payload, ...state];
        case 'updateStatus':
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return task;
            });
        case 'loadStatus':
            return action.payload;
        default:
            return state;
    }
}