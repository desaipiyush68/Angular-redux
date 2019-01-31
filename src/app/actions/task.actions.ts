import { Action } from '@ngrx/store';
import { Data } from '@angular/router/src/config';

export const GET_TASK_LIST = 'Task get list';
export const GET_TASK_LIST_SUCCESS = 'Task get list success';
export const CREAT_TASK = 'Task create';
export const CREAT_TASK_SUCCESS = 'Task create success';
export const UPDATE_TASK = 'Task update';
export const UPDATE_TASK_SUCCESS = 'Task update success';
export const DELETE_TASK = 'Task delete';
export const DELETE_TASK_SUCCESS = 'Task delete success';

export class GetTaskList implements Action {
    readonly type = GET_TASK_LIST;
    constructor(public payload?: any) {}
}

export class GetTaskListSuccess implements Action {
    readonly type = GET_TASK_LIST_SUCCESS;
    constructor(public payload: any) {}
}

export class CreateTask implements Action {
    readonly type = CREAT_TASK;
    constructor(public payload: any) {}
}

export class CreateTaskSuccess implements Action {
    readonly type = CREAT_TASK_SUCCESS;
    constructor(public payload?: any) {}
}

export class UpdateTask implements Action {
    readonly type = UPDATE_TASK;
    constructor(public payload: any) {}
}
export class UpdateTaskSuccess implements Action {
    readonly type = UPDATE_TASK_SUCCESS;
    constructor(public payload?: any) {}
}

export class DeleteTask implements Action {
    readonly type = DELETE_TASK;
    constructor(public payload: any) {}
}

export class DeleteTaskSuccess implements Action {
    readonly type = DELETE_TASK_SUCCESS;
    constructor(public payload?: any) {}
}

export type All =
    | GetTaskList
    | GetTaskListSuccess
    | CreateTask
    | CreateTaskSuccess
    | UpdateTask
    | UpdateTaskSuccess
    | DeleteTask
    | DeleteTaskSuccess;
