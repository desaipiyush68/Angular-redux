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
export type Action = taskActions.All;



@Injectable()
export class TaskEffects {
  constructor(private actions: Actions,
    private taskService: TaskService) { }


  @Effect()
  createTask: Observable<Action> = this.actions.ofType(taskActions.CREAT_TASK)
    .map((action: taskActions.CreateTask) => action.payload)
    .switchMap(payload => this.taskService.createTask(payload.name, payload.description, payload.pid)
    .map(res => {
        return new taskActions.CreateTaskSuccess(res);
      }));


  @Effect()
  getTaskList: Observable<Action> = this.actions.ofType(taskActions.GET_TASK_LIST)
    .map((action: taskActions.GetTaskList) => action.payload)
    .mergeMap(payload => this.taskService.getTasks(payload.pid))
    .map(payload => {
      return new taskActions.GetTaskListSuccess(payload);
    });

  @Effect()
  updateTask: Observable<Action> = this.actions.ofType(taskActions.UPDATE_TASK)
    .map((action: taskActions.UpdateTask) => action.payload )
    .switchMap(payload => this.taskService.updateTask(payload)
    .map(res => {
        return new taskActions.UpdateTaskSuccess(res);
      }));

  @Effect()
  deleteTask: Observable<Action> = this.actions.ofType(taskActions.DELETE_TASK)
    .map((action: taskActions.DeleteTask) => action.payload)
    .switchMap(payload => this.taskService.deleteTask(payload)
    .map(res => {
        return new taskActions.DeleteTaskSuccess(res);
      }));


}