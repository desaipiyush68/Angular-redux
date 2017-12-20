import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
//ngrx
import * as usersActions from '../actions/users.actions';
//store 
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    user$: Observable<any>;
    constructor( 
        private fb: FormBuilder,
        private router: Router,
        private store: Store<AppState>) {
            this.form = this.fb.group({
                name:['', Validators.required],
                email: ['', Validators.required],
                password: ['', Validators.required],
                confirm: ['', Validators.required]
            });
       this.user$ = this.store.select('user');
     }
    ngOnInit() { }

    signUp(){

        const val = this.form.value;
        this.store.dispatch(new usersActions.Signup(val));
        this.user$.subscribe(data =>{
             if(data.success){
                       this.router.navigate(['/login']);
                   }     
         });
    }

    isPasswordMatch() {
        const val = this.form.value;
        return val && val.password && val.password == val.confirm;
    }
}
