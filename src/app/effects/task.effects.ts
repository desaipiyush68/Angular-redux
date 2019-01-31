import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskService } from '../shared/services/rest/task.Service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import * as taskActions from '../actions/task.actions';
export type Actiontask = taskActions.All;

import * as projectActions from '../actions/project.actions';
import { Task } from '../shared/models/task.model';
export type Actionproject = projectActions.All;

@Injectable()
export class TaskEffects {
    constructor(private actions: Actions, private taskService: TaskService) {}

    // tslint:disable-next-line:member-ordering
    @Effect()
    createTask: Observable<Actionproject> = this.actions
        .ofType(taskActions.CREAT_TASK)
        .map((action: taskActions.CreateTask) => action.payload)
        .switchMap(payload =>
            this.taskService.createTask(payload.name, payload.description, payload._project)
        )
        .map(res => new projectActions.GetProjectList());

    // tslint:disable-next-line:member-ordering
    @Effect()
    getTaskList: Observable<Actiontask> = this.actions
        .ofType(taskActions.GET_TASK_LIST)
        .map((action: taskActions.GetTaskList) => action.payload)
        .switchMap(payload => this.taskService.getTasks(payload.pid))
        .map(res => new taskActions.GetTaskListSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    updateTask: Observable<Actiontask> = this.actions
        .ofType(taskActions.UPDATE_TASK)
        .map((action: taskActions.UpdateTask) => action.payload)
        .switchMap((payload: Task) => this.taskService.updateTask(payload))
        .map(res => new taskActions.UpdateTaskSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    deleteTask: Observable<Actionproject> = this.actions
        .ofType(taskActions.DELETE_TASK)
        .map((action: taskActions.DeleteTask) => action.payload)
        .switchMap(payload => this.taskService.deleteTask(payload))
        .map(res => new projectActions.GetProjectList(res));
}
