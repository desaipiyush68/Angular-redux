import * as projectActions from '../actions/project.actions';
import { Project } from '../shared/models/project.model';
import { Task } from '../shared/models/task.model';
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
            return { project: action.payload, loading: false };
        case projectActions.CREAT_PROJECT:
            return { ...state, ...action.payload, loading: false };
        case projectActions.CREAT_PROJECT_SUCCESS:
            return { project: state.project.concat(action.payload), loading: false };
        case projectActions.UPDATE_PROJECT:
            return { ...state, ...action.payload, loading: true };
        case projectActions.UPDATE_PROJECT_SUCCESS:
            return {
                project: state.project.map((oldProject: Project) =>
                    oldProject._id === action.payload._id ? action.payload : oldProject
                ),
                loading: false
            };
        case projectActions.DELETE_PROJECT:
            return { ...state, ...action.payload, loading: true };
        case projectActions.DELETE_PROJECT_SUCCESS:
            return { ...state, loading: false };
        case projectActions.CREAT_TASK:
            return { ...state, ...action.payload, loading: true };
        case projectActions.CREAT_TASK_SUCCESS:
            return {
                project: state.project.map(selectedProject =>
                    selectedProject._id !== action.payload.project
                        ? selectedProject
                        : {
                              ...selectedProject,
                              tasks: [...selectedProject.tasks, ...action.payload]
                          }
                ),
                loading: false
            };
        case projectActions.UPDATE_TASK:
            return { ...state, ...action.payload, loading: true };
        case projectActions.UPDATE_TASK_SUCCESS:
            return {
                project: state.project.map((selectedProject: Project) =>
                    selectedProject._id !== action.payload.project
                        ? selectedProject
                        : {
                              ...selectedProject,
                              tasks: selectedProject.tasks.map((task: Task) =>
                                  task._id === action.payload._id ? action.payload : task
                              )
                          }
                ),
                loading: false
            };
        case projectActions.DELETE_TASK:
            return { ...state, ...action.payload, loading: true };
        case projectActions.DELETE_TASK_SUCCESS:
            return { ...state, loading: false };
        default:
            return state;
    }
}
