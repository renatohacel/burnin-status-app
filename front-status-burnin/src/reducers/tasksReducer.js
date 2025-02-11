export const tasksReducer = (state = [], action) => {
    switch (action.type) {
        case 'addTask':
            return [action.payload, ...state];

        case 'updateTask':
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return task;
            });
        case 'updateStateTask':
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        ...action.payload,
                    };
                }
                return task;
            });
        case 'deleteTask':
            return state.filter(tks => tks.id !== action.payload);
        case 'loadTasks':
            return action.payload;
        default:
            return state;
    }
}