import { Action } from '@ngrx/store';
import { Data } from '@angular/router/src/config';

export const GET_PROJECT_LIST = 'Project get list';
export const GET_PROJECT_LIST_SUCCESS = 'Project get list success';
export const CREAT_PROJECT = 'Project create';
export const CREAT_PROJECT_SUCCESS = 'Project create success';
export const UPDATE_PROJECT = 'Project update';
export const UPDATE_PROJECT_SUCCESS = 'Project update success';
export const DELETE_PROJECT = 'Project delete';
export const DELETE_PROJECT_SUCCESS = 'Project delete success';

export class GetProjectList implements Action {
    readonly type = GET_PROJECT_LIST;
    constructor(public payload?: any) {}
}

export class GetProjectListSuccess implements Action {
    readonly type = GET_PROJECT_LIST_SUCCESS;
    constructor(public payload: any) {}
}

export class CreateProject implements Action {
    readonly type = CREAT_PROJECT;
    constructor(public payload: any) {}
}

export class CreateProjectSuccess implements Action {
    readonly type = CREAT_PROJECT_SUCCESS;
    constructor(public payload?: any) {}
}

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload: any) {}
}
export class UpdateProjectSuccess implements Action {
    readonly type = UPDATE_PROJECT_SUCCESS;
    constructor(public payload?: any) {}
}

export class DeleteProject implements Action {
    readonly type = DELETE_PROJECT;
    constructor(public payload: any) {}
}

export class DeleteProjectSuccess implements Action {
    readonly type = DELETE_PROJECT_SUCCESS;
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
    | DeleteProjectSuccess;
