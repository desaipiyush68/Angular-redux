import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskService } from '../shared/services/rest/task.Service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import * as projectActions from '../actions/project.actions';
import { Task } from '../shared/models/task.model';
export type Actionproject = projectActions.All;

@Injectable()
export class TaskEffects {
    constructor(private actions: Actions, private taskService: TaskService) {}

    // tslint:disable-next-line:member-ordering
    @Effect()
    createTask: Observable<Actionproject> = this.actions
        .ofType(projectActions.CREAT_TASK)
        .map((action: projectActions.CreateTask) => action.payload)
        .switchMap((payload: Task) => this.taskService.createTask(payload))
        .map(res => new projectActions.CreateTaskSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    updateTask: Observable<Actionproject> = this.actions
        .ofType(projectActions.UPDATE_TASK)
        .map((action: projectActions.UpdateTask) => action.payload)
        .switchMap((payload: Task) => this.taskService.updateTask(payload))
        .map((res: Task) => new projectActions.UpdateTaskSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    deleteTask: Observable<Actionproject> = this.actions
        .ofType(projectActions.DELETE_TASK)
        .map((action: projectActions.DeleteTask) => action.payload)
        .switchMap(payload => this.taskService.deleteTask(payload))
        .map(res => new projectActions.GetProjectList(res));
}
