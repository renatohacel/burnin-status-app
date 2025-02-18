export const burninLogReducer = (state = [], action) => {
    switch (action.type) {
        case 'addLog':
            return [action.payload, ...state];

        case 'updateLog':
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return task;
            });
        case 'deleteLog':
            return state.filter(tks => tks.id !== action.payload);
        case 'loadLog':
            return action.payload;
        default:
            return state;
    }
}