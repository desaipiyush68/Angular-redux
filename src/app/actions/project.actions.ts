import { Action } from '@ngrx/store';
import { Project } from '../shared/models/project.model';
import { Task } from '../shared/models/task.model';

export const GET_PROJECT_LIST = 'Project get list';
export const GET_PROJECT_LIST_SUCCESS = 'Project get list success';
export const CREAT_PROJECT = 'Project create';
export const CREAT_PROJECT_SUCCESS = 'Project create success';
export const UPDATE_PROJECT = 'Project update';
export const UPDATE_PROJECT_SUCCESS = 'Project update success';
export const DELETE_PROJECT = 'Project delete';
export const DELETE_PROJECT_SUCCESS = 'Project delete success';
export const CREAT_TASK = 'Task create';
export const CREAT_TASK_SUCCESS = 'Task create success';
export const UPDATE_TASK = 'Task update';
export const UPDATE_TASK_SUCCESS = 'Task update success';
export const DELETE_TASK = 'Task delete';
export const DELETE_TASK_SUCCESS = 'Task delete success';

export class GetProjectList implements Action {
    readonly type = GET_PROJECT_LIST;
    constructor(public payload?: Array<Project>) {}
}

export class GetProjectListSuccess implements Action {
    readonly type = GET_PROJECT_LIST_SUCCESS;
    constructor(public payload: Array<Project>) {}
}

export class CreateProject implements Action {
    readonly type = CREAT_PROJECT;
    constructor(public payload: Project) {}
}

export class CreateProjectSuccess implements Action {
    readonly type = CREAT_PROJECT_SUCCESS;
    constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload: Project) {}
}
export class UpdateProjectSuccess implements Action {
    readonly type = UPDATE_PROJECT_SUCCESS;
    constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
    readonly type = DELETE_PROJECT;
    constructor(public payload: Project) {}
}

export class DeleteProjectSuccess implements Action {
    readonly type = DELETE_PROJECT_SUCCESS;
    constructor(public payload?: any) {}
}

export class CreateTask implements Action {
    readonly type = CREAT_TASK;
    constructor(public payload: Task) {}
}

export class CreateTaskSuccess implements Action {
    readonly type = CREAT_TASK_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateTask implements Action {
    readonly type = UPDATE_TASK;
    constructor(public payload: Task) {}
}
export class UpdateTaskSuccess implements Action {
    readonly type = UPDATE_TASK_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteTask implements Action {
    readonly type = DELETE_TASK;
    constructor(public payload: Task) {}
}

export class DeleteTaskSuccess implements Action {
    readonly type = DELETE_TASK_SUCCESS;
    constructor(public payload?: any) {}
}

export type All =
    | GetProjectList
    | GetProjectListSuccess
    | CreateProject
    | CreateProjectSuccess
    | UpdateProject
    | UpdateProjectSuccess
    | DeleteProject
    | DeleteProjectSuccess
    | CreateTask
    | CreateTaskSuccess
    | UpdateTask
    | UpdateTaskSuccess
    | DeleteTask
    | DeleteTaskSuccess;
