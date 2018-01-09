import { Http, Headers, RequestOptions, RequestMethod, Request, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@NgModule({})
export class UserService {
  headers: Headers;
  constructor(
    public http: Http,
    private router: Router) {

  }

  registration(name: string, email: string, password: string): Observable<any> {
    let url = 'http://localhost:3500/v1/user/auth/register';
           let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ name: name, email: email, password: password });
    let response = this.http.post(url, body, options).map(res => res.json());
    return response;
  }

  login(Email: any, Password?: any): Observable<any> {
    let url = 'http://localhost:3500/v1/user/auth/login';
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
    let body:string = JSON.stringify({ email: Email, password: Password });
    let response:Observable<any> = this.http.post(url, body, options).map(res => res.json());

    return response;
  }

  logout() {

    localStorage.removeItem('token');
    let token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      let logout: Observable<any> = new Subject();
      return logout;
    }

  }

  GetProfile(): Observable<any> {
    let url = 'http://localhost:3500/v1/user/auth/profile';
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Authorization': token });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.get(url, options).map(res => res.json());
    return response;
  }


}
