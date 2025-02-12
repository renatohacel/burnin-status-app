export const statusReducer = (state = [], action) => {
    switch (action.type) {
        case 'addStatus':
            return [action.payload, ...state];
        case 'loadStatus':
            return action.payload;
        default:
            return state;
    }
}