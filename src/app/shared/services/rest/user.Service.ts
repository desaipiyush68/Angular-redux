import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as Constants from '../app.constant';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@NgModule({})
export class UserService {
    constructor(private http: HttpClient, private router: Router) {}

    public registration(name: string, email: string, password: string): Observable<any> {
        const body = JSON.stringify({ name: name, email: email, password: password });
        return this.http.post(`${Constants.URL}/user`, body);
    }

    public login(Email: any, Password?: any): Observable<any> {
        const body = { email: Email, password: Password };
        return this.http.post(`${Constants.URL}/auth`, body);
    }

    public logout(): Observable<any> {
        localStorage.removeItem('token');
        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/login']);
            const logout: Observable<any> = new Subject();
            return logout;
        }
    }

    public GetProfile(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: token });
        return this.http.get(`${Constants.URL}/auth/profile`, { headers: headers });
    }
}
