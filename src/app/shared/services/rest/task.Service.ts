import { Http, Headers, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as Constants from '../app.constant';

import { Task } from '../../models/task.model';

@NgModule({})
export class TaskService {
    constructor(public http: Http) {}

    public createTask(name: string, description: any, pid: string): Observable<Task> {
        const token = localStorage.getItem('token');
        const headers = new Headers({ Authorization: token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const options = new RequestOptions({ headers: headers });
        const body = JSON.stringify({ name: name, description: description, pid: pid });
        return this.http
            .post(`${Constants.URL}/project/task/create`, body, options)
            .map(res => res.json());
    }

    public updateTask(task): Observable<Task> {
        const token = localStorage.getItem('token');
        const headers = new Headers({ Authorization: token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const options = new RequestOptions({ headers: headers });
        const body = JSON.stringify({ task });
        return this.http
            .put(`${Constants.URL}/project/task/update`, body, options)
            .map(res => res.json());
    }

    public deleteTask(task): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new Headers({ Authorization: token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const options = new RequestOptions({ headers: headers });
        return this.http
            .delete(`${Constants.URL}/project/task/delete/${task._project}/${task._id}`, options)
            .map(res => res.json());
    }

    public getTasks(pid: string): Observable<Array<Task>> {
        const token = localStorage.getItem('token');
        const headers = new Headers({ Authorization: token });
        const options = new RequestOptions({ headers: headers });
        return this.http
            .get(`${Constants.URL}/project/task/${pid}`, options)
            .map(res => res.json());
    }
}
