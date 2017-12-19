import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import { Logout, GetProfile } from 'app/actions/users.actions';
//ngrx
import * as usersActions from '../../../actions/users.actions';




@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    pushRightClass: string = 'push-right';
    profile$: any;
   // user: any ={loading:true};
    constructor(private translate: TranslateService,
        public router: Router,
        private store: Store<AppState>) {
       // this.profile$ = this.store.select('user');
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
       // this.store.dispatch(new usersActions.GetProfile());
        // this.profile$.subscribe(data => {        
        //     this.user = data;
        // });
    }

    ngOnInit() {
       
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.store.dispatch(new Logout());
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
