import { Http, Headers, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as Constants from '../app.constant';

import { Task } from '../../models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@NgModule({})
export class TaskService {
    constructor(public http: HttpClient) {}

    public createTask(task: Task): Observable<Task> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        const body = {
            name: task.name,
            description: task.description,
            projectId: task._project,
            complete: false
        };
        return this.http.post<Task>(`${Constants.URL}/task`, body, { headers: headers });
    }

    public updateTask(task: Task): Observable<Task> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        const body = {
            taskId: task._id,
            projectId: task._project,
            name: task.name,
            description: task.description,
            complete: task.complete
        };
        return this.http.put<Task>(`${Constants.URL}/task`, body, { headers: headers });
    }

    public deleteTask(task): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.delete(`${Constants.URL}/task${task._project}/${task._id}`, {
            headers: headers
        });
    }
}
