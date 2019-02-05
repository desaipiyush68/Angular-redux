import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../shared/services/rest/project.Service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import * as projectActions from '../actions/project.actions';
import { Project } from '../shared/models/project.model';
import { of } from 'rxjs/observable/of';
export type Action = projectActions.All;

@Injectable()
export class ProjectEffects {
    constructor(
        private readonly actions: Actions,
        private readonly projectService: ProjectService
    ) {}

    // tslint:disable-next-line:member-ordering
    @Effect()
    createProject: Observable<Action> = this.actions
        .ofType(projectActions.CREAT_PROJECT)
        .map((action: projectActions.CreateProject) => action.payload)
        .switchMap((payload: Project) => this.projectService.createProject(payload.name))
        .map((res: Project) => new projectActions.CreateProjectSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    getProjectList: Observable<Action> = this.actions
        .ofType(projectActions.GET_PROJECT_LIST)
        .map((action: projectActions.GetProjectList) => action.payload)
        .switchMap(() => this.projectService.getProjects())
        .map(res => new projectActions.GetProjectListSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    UpdateProject: Observable<Action> = this.actions
        .ofType(projectActions.UPDATE_PROJECT)
        .map((action: projectActions.UpdateProject) => action.payload)
        .switchMap((payload: Project) => this.projectService.updateProject(payload))
        .map(res => new projectActions.UpdateProjectSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    deleteTask: Observable<Action> = this.actions
        .ofType(projectActions.DELETE_PROJECT)
        .map((action: projectActions.DeleteProject) => action.payload)
        .switchMap((payload: Project) =>
            this.projectService.deleteProject(payload).merge(of(payload))
        )
        .map(res => new projectActions.DeleteProjectSuccess(res));
}
