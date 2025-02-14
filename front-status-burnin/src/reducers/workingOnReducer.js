export const workingOnReducer = (state = [], action) => {
    switch (action.type) {
        case 'addWorking':
            return [action.payload, ...state];
        case 'deleteWorking':
            return state.filter(wkon => wkon.id !== action.payload);
        case 'loadWorking':
            return action.payload;
        default:
            return state;
    }
}