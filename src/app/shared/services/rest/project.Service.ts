import { Http, Headers, RequestOptions, RequestMethod, Request, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@NgModule({})
export class ProjectService {
    constructor(public http: Http) {
      }

     createProject(name:string) : Observable<any>{
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        console.log(options);
        let url = 'http://localhost:3500/v1/user/project/create';
        let slug = name;
        let body = JSON.stringify({ name: name,slug:slug});
        let response = this.http.post(url,body, options).map(res => res.json());
        return response;
     }
    

    getProjects() : Observable<any> {
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        let url = 'http://localhost:3500/v1/user/project';
        let response = this.http.get(url, options).map(res => res.json());
        return response;
    }

    updateProject(project): Observable<any> {
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        let url = 'http://localhost:3500/v1/user/project/update';       
        let body = JSON.stringify({project});
        let response = this.http.put(url,body,options).map(res => res.json());
        return response;
     }

     deleteProject(project): Observable<any> {
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = new RequestOptions({ headers: headers });
        let url = 'http://localhost:3500/v1/user/project/delete/'+project._id+'';
        let response = this.http.delete(url, options).map(res => res.json());
        return response;
     }


}

