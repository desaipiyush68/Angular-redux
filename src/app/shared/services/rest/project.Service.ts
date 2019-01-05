import { Http, Headers, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as Constants from '../app.constant';
import { Project } from '../../models/project.model';

@NgModule({})
export class ProjectService {
    constructor(public http: Http) {}

    public createProject(name: string): Observable<Project> {
        const token = localStorage.getItem('token');
        const headers = new Headers({ Authorization: token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const options = new RequestOptions({ headers: headers });
        const body = JSON.stringify({ name: name, slug: name });
        return this.http
            .post(`${Constants.URL}/project/create`, body, options)
            .map(res => res.json());
    }

    public getProjects(): Observable<Array<Project>> {
        const token = localStorage.getItem('token');
        const headers = new Headers({ Authorization: token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${Constants.URL}/project`, options).map(res => res.json());
    }

    public updateProject(project): Observable<Project> {
        const token = localStorage.getItem('token');
        const headers = new Headers({ Authorization: token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const options = new RequestOptions({ headers: headers });
        const body = JSON.stringify({ project });
        return this.http
            .put(`${Constants.URL}/project/update`, body, options)
            .map(res => res.json());
    }

    public deleteProject(project): Observable<any> {
        const token: string = localStorage.getItem('token');
        const headers: Headers = new Headers({ Authorization: token });
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json;');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        const options: RequestOptions = new RequestOptions({ headers: headers });
        return this.http
            .delete(`${Constants.URL}/project/delete/${project._id}`, options)
            .map(res => res.json());
    }
}
