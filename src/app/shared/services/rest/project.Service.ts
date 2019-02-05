import { Http, Headers, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as Constants from '../app.constant';
import { Project } from '../../models/project.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@NgModule({})
export class ProjectService {
    constructor(public http: HttpClient) {}

    public createProject(name: string): Observable<Project> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        const body = { name: name, slug: name };
        return this.http.post<Project>(`${Constants.URL}/project`, body, {
            headers: headers
        });
    }

    public getProjects(): Observable<Array<Project>> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Array<Project>>(`${Constants.URL}/project`, { headers: headers });
    }

    public updateProject(project: Project): Observable<Project> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        const body = { projectId: project._id, name: project.name, slug: project.slug };
        return this.http.put<Project>(`${Constants.URL}/project`, body, {
            headers: headers
        });
    }

    public deleteProject(project): Observable<any> {
        const token: string = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        return this.http.delete(`${Constants.URL}/project/${project._id}`, {
            headers: headers
        });
    }
}
