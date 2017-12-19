import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { UserService } from '../shared/services/rest/user.Service';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import * as userActions from '../actions/users.actions';
export type Action = userActions.All;


@Injectable()
export class UserEffects {
    constructor(private actions: Actions,
        private userService: UserService,
        private router: Router) { }

    @Effect()
    createUser: Observable<Action> = this.actions.ofType(userActions.SIGNUP_REQUESTED)
        .map((action: userActions.Signup) => action.payload)
        .switchMap(payload => this.userService.registration(payload.name, payload.email, payload.password)
            .map(res => {
                return new userActions.SignupSuccess(res);
            }));

    @Effect()
    login: Observable<Action> = this.actions.ofType(userActions.LOGIN_REQUESTED)
        .map((action: userActions.Login) => action.payload)
        .switchMap(payload => this.userService.login(payload.email, payload.password)
            .map(res => {
                return new userActions.LoginSuccess(res);
            }));

    @Effect()
    logout: Observable<Action> = this.actions
        .ofType(userActions.LOGOUT_REQUESTED)
        .map((action: userActions.Logout) => action)
        .switchMap(() => this.userService.logout()
            .map(() => {
                return new userActions.LogoutSuccess();
            }));

    @Effect()
    profile: Observable<Action> = this.actions.ofType(userActions.GET_USER_PROFILE)
        .map((action: userActions.GetProfile) => action.payload)
        .switchMap(payload => this.userService.GetProfile()
            .map(res => {
                return new userActions.GetProfileSuccess(res);
            }));
}