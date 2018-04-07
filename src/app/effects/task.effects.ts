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
export type Actionproject = projectActions.All;



@Injectable()
export class TaskEffects {
  constructor(private actions: Actions,
    private taskService: TaskService) { }


  @Effect()
  createTask: Observable<Actionproject> = this.actions.ofType(taskActions.CREAT_TASK)
    .map((action: taskActions.CreateTask) => action.payload)
    .switchMap(payload => this.taskService.createTask(payload.name, payload.description, payload.pid)
      .map(res => {
        return new projectActions.GetProjectList();
      }));


  @Effect()
  getTaskList: Observable<Actiontask> = this.actions.ofType(taskActions.GET_TASK_LIST)
    .map((action: taskActions.GetTaskList) => action.payload)
    .switchMap(payload => this.taskService.getTasks(payload.pid))
    .map(payload => {
      return new taskActions.GetTaskListSuccess(payload);
    });

  @Effect()
  updateTask: Observable<Actiontask> = this.actions.ofType(taskActions.UPDATE_TASK)
    .map((action: taskActions.UpdateTask) => action.payload)
    .switchMap(payload => this.taskService.updateTask(payload)
      .map(res => {
        return new taskActions.UpdateTaskSuccess(res);
      }));

  @Effect()
  deleteTask: Observable<Actionproject> = this.actions.ofType(taskActions.DELETE_TASK)
    .map((action: taskActions.DeleteTask) => action.payload)
    .switchMap(payload => this.taskService.deleteTask(payload)
      .map(res => {
        return new projectActions.GetProjectList(res);
      }));


}
