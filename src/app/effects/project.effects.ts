import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ProjectService } from '../shared/services/rest/project.Service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import * as projectActions from '../actions/project.actions';
export type Action = projectActions.All;



@Injectable()
export class ProjectEffects {
  constructor(private actions: Actions,
    private projectService: ProjectService) { }

  @Effect()
  createProject: Observable<Action> = this.actions.ofType(projectActions.CREAT_PROJECT)
    .map((action: projectActions.CreateProject) => action.payload)
    .switchMap(payload => this.projectService.createProject(payload.name)
      .map(res => {
        return new projectActions.CreateProjectSuccess(res);
      }));


  @Effect()
  getProjectList: Observable<Action> = this.actions.ofType(projectActions.GET_PROJECT_LIST)
    .map((action: projectActions.GetProjectList) => action.payload)
    .mergeMap(payload => this.projectService.getProjects())
    .map(payload => {
      return new projectActions.GetProjectListSuccess(payload);
    });

    @Effect()
    UpdateProject: Observable<Action> = this.actions.ofType(projectActions.UPDATE_PROJECT)
      .map((action: projectActions.UpdateProject) => action.payload )
      .switchMap(payload => this.projectService.updateProject(payload)
      .map(res => {
          return new projectActions.UpdateProjectSuccess(res);
        }));
  
    @Effect()
    deleteTask: Observable<Action> = this.actions.ofType(projectActions.DELETE_PROJECT)
      .map((action: projectActions.DeleteProject) => action.payload)
      .switchMap(payload => this.projectService.deleteProject(payload)
      .map(res => {
          return new projectActions.DeleteProjectSuccess(res);
        }));

}