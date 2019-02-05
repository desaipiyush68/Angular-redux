import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
// ngrx
import * as usersActions from '../actions/users.actions';
// store
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { LoginResponse } from './models/login-response.models';
import { Status } from './models/status-type.enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent {
    email: any;
    password = null;
    user$: any;
    error: boolean;
    constructor(
        public router: Router,
        private store: Store<AppState>,
        private translate: TranslateService
    ) {
        this.user$ = this.store.select('user');
        this.error = false;
        this.translate.use('es');
    }

    public onLoggedin() {
        this.store.dispatch(new usersActions.Login({ email: this.email, password: this.password }));

        this.user$.subscribe(
            (response: LoginResponse): void => {
                if (response.status === Status.OK) {
                    this.error = false;
                    localStorage.setItem('token', response.token);
                    if (localStorage.getItem('token')) {
                        this.router.navigate(['/dashboard']);
                    }
                }
            },
            (error): void => {
                this.error = true;
            }
        );
    }
}
