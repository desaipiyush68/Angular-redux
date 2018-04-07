
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import * as Constants from '../app.constant';
@NgModule({})
export class UserService {

  constructor(private http: HttpClient,
    private router: Router) {
  }

  public registration(name: string, email: string, password: string): Observable<any> {

    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    headers.append('Content-type', 'application/json');
    const body = Object.assign({ name: name, email: email, password: password });
    return this.http
      .post<any>(`${Constants.URL}/auth/register`, body, { headers: headers })
      .map(res => res);
  }

  public login(Email: any, Password?: any): Observable<any> {

    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    headers.append('Content-type', 'application/json');
    const body = Object.assign({ email: Email, password: Password });

    return this.http
      .post<any>(`${Constants.URL}/auth/login`, body, { headers: headers })
      .map(res => res);
  }

  public logout(): Observable<any> {

    localStorage.removeItem('token');
    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      let logout: Observable<any> = new Subject();
      return logout;
    }

  }

  public GetProfile(): Observable<any> {

    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return this.http
    .get<any>(`${Constants.URL}/auth/profile`, { headers: headers })
    .map(res => res);
  }


}
