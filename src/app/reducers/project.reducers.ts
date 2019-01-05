import * as projectActions from '../actions/project.actions';
export type Action = projectActions.All;

const initialState = {
    project: []
};
/// Reducer function
export function ProjectReducer(state = initialState, action: Action) {
    switch (action.type) {
        case projectActions.GET_PROJECT_LIST:
            return { ...state, loading: true };
        case projectActions.GET_PROJECT_LIST_SUCCESS:
            return { ...state, project: action.payload, loading: false };
        case projectActions.CREAT_PROJECT:
            return { ...state, ...action.payload, loading: true };
        case projectActions.CREAT_PROJECT_SUCCESS:
            return { ...state, loading: false };
        case projectActions.UPDATE_PROJECT:
            return { ...state, ...action.payload, loading: true };
        case projectActions.UPDATE_PROJECT_SUCCESS:
            return { ...state, loading: false };
        case projectActions.DELETE_PROJECT:
            return { ...state, ...action.payload, loading: true };
        case projectActions.DELETE_PROJECT_SUCCESS:
            return { ...state, loading: false };
        default:
            return state;
    }
}
