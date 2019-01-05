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
    constructor(
        private actions: Actions,
        private userService: UserService,
        private router: Router
    ) {}

    // tslint:disable-next-line:member-ordering
    @Effect()
    createUser: Observable<Action> = this.actions
        .ofType(userActions.SIGNUP_REQUESTED)
        .map((action: userActions.Signup) => action.payload)
        .switchMap(payload =>
            this.userService.registration(payload.name, payload.email, payload.password)
        )
        .map(res => new userActions.SignupSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    login: Observable<Action> = this.actions
        .ofType(userActions.LOGIN_REQUESTED)
        .map((action: userActions.Login) => action.payload)
        .switchMap(payload => this.userService.login(payload.email, payload.password))
        .map(res => new userActions.LoginSuccess(res));

    // tslint:disable-next-line:member-ordering
    @Effect()
    logout: Observable<Action> = this.actions
        .ofType(userActions.LOGOUT_REQUESTED)
        .map((action: userActions.Logout) => action)
        .switchMap(() => this.userService.logout())
        .map(() => new userActions.LogoutSuccess());

    // tslint:disable-next-line:member-ordering
    @Effect()
    profile: Observable<Action> = this.actions
        .ofType(userActions.GET_USER_PROFILE)
        .map((action: userActions.GetProfile) => action.payload)
        .switchMap(() => this.userService.GetProfile())
        .map(res => new userActions.GetProfileSuccess(res));
}
