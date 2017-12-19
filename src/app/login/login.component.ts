import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
//ngrx
import * as usersActions from '../actions/users.actions';
//store 
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
   
    email:any;
    password:any;
    user$:any;
    error:boolean;
    constructor(
        public router: Router,
        private store: Store<AppState>,
        private translate: TranslateService) {
           this.user$ = this.store.select('user');
           this.error=false;
    }

    ngOnInit() {
    }

    onLoggedin() { 
     this.translate.use('es');
     let email = this.email;
     let password = this.password;  

     if(password == undefined){
         password = null;
     }
     let login ={email:email,password:password};
     this.store.dispatch(new usersActions.Login(login));
     this.user$.subscribe(data =>{
                   if(data.success){
                    this.error=false;
                       let token = data.token;
                       localStorage.setItem('token', token);
                       this.router.navigate(['/dashboard']);
                   }
             },
            error=>{
                this.error=true;
              console.log(error);
            }  
      );  
    }

}
