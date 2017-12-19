import { Http, Headers, RequestOptions, RequestMethod, Request, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@NgModule({})
export class ProjectService {
    headers: Headers;
    constructor(public http: Http) {
        let token = localStorage.getItem('token');
        this.headers = new Headers({ 'Authorization': token });
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json;');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Credentials', 'true');
      }

     createProject(name:string) : Observable<any>{
        let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:3500/v1/user/project/create';
        let slug = name;
        let body = JSON.stringify({ name: name,slug:slug});
        let response = this.http.post(url,body, options).map(res => res.json());
        return response;
     }
    

    getProjects() : Observable<any> {
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        let options = new RequestOptions({ headers: headers });
        let url = 'http://localhost:3500/v1/user/project';
        let response = this.http.get(url, options).map(res => res.json());
        return response;
    }

    updateProject(project): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:3500/v1/user/project/update';       
        let body = JSON.stringify({project});
        let response = this.http.put(url,body,options).map(res => res.json());
        return response;
     }

     deleteProject(project): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:3500/v1/user/project/delete/'+project._id+'';
        let response = this.http.delete(url, options).map(res => res.json());
        return response;
     }


}
