import { Http, Headers, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import * as Constants from '../app.constant';
@NgModule({})
export class UserService {

  constructor(private http: Http,
    private router: Router) {
  }

  public registration(name: string, email: string, password: string): Observable<any> {

    const token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token });
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json;');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({ name: name, email: email, password: password });
    return this.http.post(`${Constants.URL}/auth/register`, body, options).map(res => res.json());
   

  }

  public login(Email: any, Password?: any): Observable<any> {
 
    const token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token });
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json;');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    const options = new RequestOptions({ headers: headers });
    const body: string = JSON.stringify({ email: Email, password: Password });
    return this.http.post(`${Constants.URL}/auth/login`, body, options).map(res => res.json());

  }

  public logout() {

    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      let logout: Observable<any> = new Subject();
      return logout;
    }

  }

  public GetProfile(): Observable<any> {

    const token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${Constants.URL}/auth/profile`, options).map(res => res.json());
  
  }


}
