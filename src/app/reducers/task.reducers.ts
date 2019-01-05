import * as taskActions from '../actions/task.actions';
export type Action = taskActions.All;

const initialState = {
    task: []
};
/// Reducer function
export function TaskReducer(state = initialState, action: Action) {
    switch (action.type) {
        case taskActions.GET_TASK_LIST:
            return { ...state, loading: true };
        case taskActions.GET_TASK_LIST_SUCCESS:
            return { ...state, task: action.payload, loading: false };
        case taskActions.CREAT_TASK:
            return { ...state, ...action.payload, loading: true };
        case taskActions.CREAT_TASK_SUCCESS:
            return { ...state, loading: false };
        case taskActions.UPDATE_TASK:
            return { ...state, ...action.payload, loading: true };
        case taskActions.UPDATE_TASK_SUCCESS:
            return { ...state, ...action.payload, loading: false };
        case taskActions.DELETE_TASK:
            return { ...state, ...action.payload, loading: true };
        case taskActions.DELETE_TASK_SUCCESS:
            return { ...state, loading: false };
        default:
            return state;
    }
}
