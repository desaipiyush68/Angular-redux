import { Http, Headers, RequestOptions, RequestMethod, Request, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@NgModule({})
export class UserService {
  headers: Headers;
  constructor(
    public http: Http,
    private router: Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json;');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
  }

  registration(name: string, email: string, password: string): Observable<any> {
    let url = 'http://localhost:3500/v1/user/auth/register';
    let options = new RequestOptions({ headers: this.headers });
    let body = JSON.stringify({ name: name, email: email, password: password });
    let response = this.http.post(url, body, options).map(res => res.json());
    return response;
  }

  login(Email: any, Password?: any): Observable<any> {
    let url = 'http://localhost:3500/v1/user/auth/login';
    let options = new RequestOptions({ headers: this.headers });
    let body = JSON.stringify({ email: Email, password: Password });
    let response = this.http.post(url, body, options).map(res => res.json());
    return response;
  }

  logout() {
    let logout: Observable<any>;
    localStorage.removeItem('token');
    let token = localStorage.getItem('token');
    console.log(token);
    if(!token){
      this.router.navigate(['/login']);
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




       //  var headers = new Headers();
       //  headers.append('Content-Type', 'application/json');
      //  headers.append('Access-Control-Allow-Origin', '*');
      //  const httpOptions = {
      //   headers: new HttpHeaders(
      //   [{ 'Content-Type': 'application/json'}])
      // };

      //    var headers = new Headers();
      //        headers.append('Content-Type','application/json');
      //        headers.append('Accept', 'application/json');
      //        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      //        headers.append('Access-Control-Allow-Origin', '*');
      //        headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
      // //  console.log(header);
      //  let options = new RequestOptions({ headers: header });
      // let credential = { email:Email,password:Password };
      // let body = JSON.stringify(credential);
      // const options = new RequestOptions({
      //   method: RequestMethod.Post,
      //   url: 'http://localhost:8000/api/authenticate',
      //   headers:headers,
      //   body:body,
      //   responseType:ResponseContentType.Json,
      //   withCredentials:true
      // });
      // const req = new Request(options);
      // console.log(req);
      //let test = credential.toString();
      //console.log(credential);
      //  let body = credential.toString();
      //  console.log(email);
      // console.log(password);
      //   post   url,body,options,requestOptions
      // return  this.http.post('http://localhost:8000/api/authenticate',body,httpOptions).map(res=>res,JSON);