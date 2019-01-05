import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
// ngrx
import * as usersActions from '../actions/users.actions';
// store
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent {
    email: any;
    password: any;
    user$: any;
    error: boolean;
    constructor(
        public router: Router,
        private store: Store<AppState>,
        private translate: TranslateService
    ) {
        this.user$ = this.store.select('user');
        this.error = false;
    }

    public onLoggedin() {
        this.translate.use('es');

        if (this.password === undefined) {
            this.password = null;
        }

        this.store.dispatch(new usersActions.Login({ email: this.email, password: this.password }));

        this.user$.subscribe(
            data => {
                if (data.success) {
                    this.error = false;
                    const token = data.token;
                    localStorage.setItem('token', token);
                    if (localStorage.getItem('token')) {
                        this.router.navigate(['/dashboard']);
                    }
                }
            },
            error => {
                this.error = true;
            }
        );
    }
}
