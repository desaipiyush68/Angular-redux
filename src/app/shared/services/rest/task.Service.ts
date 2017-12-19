import { Http, Headers, RequestOptions, RequestMethod, Request, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@NgModule({})
export class TaskService {
     headers:Headers;
    constructor(public http: Http) { 
        let token = localStorage.getItem('token');
        this.headers = new Headers({ 'Authorization': token });
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json;');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Origin', 'GET, PUT, POST, DELETE, OPTIONS');
        this.headers.append('Access-Control-Allow-Credentials', 'true');
     }

     createTask(name:string,description:any,pid:string) : Observable<any>{
        let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:3500/v1/user/project/task/create';
        let body = JSON.stringify({ name: name,description:description,pid:pid});
        let response = this.http.post(url,body, options).map(res => res.json());
        return response;

     }
     updateTask(task): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:3500/v1/user/project/task/update';
        
        let body = JSON.stringify({task});
        console.log(body);
        let response = this.http.put(url,body,options).map(res => res.json());
        return response;
     }

     deleteTask(task): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:3500/v1/user/project/task/delete/'+task._project+'/'+task._id+'';
        let response = this.http.delete(url, options).map(res => res.json());
        return response;
     }

    getTasks(pid:string) : Observable<any> {
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Authorization': token });
        let options = new RequestOptions({ headers: headers });
        let url = 'http://localhost:3500/v1/user/project/task'+pid+'';
        let response = this.http.get(url, options).map(res => res.json());
        return response;
    }

    // deleteProject() {
    //     //Delete project
    // }




}
