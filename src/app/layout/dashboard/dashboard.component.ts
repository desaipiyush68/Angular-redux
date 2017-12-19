import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { error } from 'selenium-webdriver';
import { AppState } from '../../store/store';
import { Store } from '@ngrx/store';
import * as projectActions from 'app/actions/project.actions';
import * as taskActions from 'app/actions/task.actions';
import { FormGroup, FormBuilder, Validators, NgModel } from "@angular/forms";
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    project$: Observable<any>;
    task$: any;
    Projects: any[];
    Tasks: any[];
    form: FormGroup;
    taskform: FormGroup;
    closeResult: string;
    crTask: boolean;
    upTask: boolean;
    pid: string;
    currentTask: any;
    complete: boolean;
    dltTask: boolean;
    dltProject: boolean;
    currentProject: any;
    constructor(
        private store: Store<AppState>,
        private fb: FormBuilder,
        private modalService: NgbModal) {
        this.project$ = this.store.select('project');
        this.task$ = this.store.select('task');
        this.form = this.fb.group({
            name: ['', Validators.required]
        });
        this.crTask = true;
        this.upTask = false;
        this.dltTask = false;
        this.dltProject = false;
        //this.refreshProject();
    }

    ngOnInit() {
        this.refreshProject();
        setInterval(() => {
            this.refreshProject();
        }, 5000);

    }

    refreshProject(): void {
        this.store.dispatch(new projectActions.GetProjectList());
        this.project$.subscribe(data => {
            this.Projects = data.project.projects;
        });
    }


    // create Project
    addProject() {
        const val = this.form.value;
        this.store.dispatch(new projectActions.CreateProject(val));
        this.form = this.fb.group({
            name: ['', Validators.required]
        });
    }

    addTaskModel(pid, content) {
        console.log(pid);
        //Initaite form
        this.taskform = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.pid = pid;
        //Open Model
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }
    // cerate Task
    addTask() {
        const val = this.taskform.value;
        let payload = { name: val.name, description: val.description, pid: this.pid };
        this.store.dispatch(new taskActions.CreateTask(payload));
        this.pid = null;
        this.taskform = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            complete: [0]
        });
    }

    updateTaskModel(task, project, content) {
        this.crTask = false;
        this.upTask = true;
        this.currentTask = task;
        this.taskform = this.fb.group({
            name: [task.name, Validators.required],
            description: [task.description, Validators.required],
            complete: [task.complete]
        });
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }
    //Update task
    updateTask() {
        let task = this.currentTask;
        let val = this.taskform.value;
        task.name = val.name;
        task.description = val.description;
        task.complete = val.complete;
        this.store.dispatch(new taskActions.UpdateTask(task));
        this.currentTask = null;
        this.crTask = true;
        this.upTask = false;
    }

    updateProjectModel(project, content) {

        this.currentProject = project;
        this.form = this.fb.group({
            name: [project.name, Validators.required]
        });
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    //Update task
    updateProject() {
        let project = this.currentProject;
        let val = this.form.value;
        project.name = val.name;
        this.store.dispatch(new projectActions.UpdateProject(project));
        this.currentProject = null;
        this.form = this.fb.group({
            name: ['', Validators.required]
        });
    }

    deleteTaskModel(task, content) {
        this.currentTask = task;
        this.dltTask = true;
        this.dltProject = false;
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.dltTask = false;
            this.dltProject = false;
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    //Delete Task //pass task
    deleteTask() {
        let task = this.currentTask;
        this.store.dispatch(new taskActions.DeleteTask(task));
        this.currentTask = null;
    }

    deleteProjectModel(project, content) {
        this.currentProject = project;
        this.dltTask = false;
        this.dltProject = true;
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.dltTask = false;
            this.dltProject = false;
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    //Delete Project //pass project
    deleteProject() {
        let project = this.currentProject;
        this.store.dispatch(new projectActions.DeleteProject(project));
        this.currentProject = null;
    }

    taskCompleteChanged(tsk) {

        if (tsk.complete == 0) {
            tsk.complete = 1;
            let task = tsk;
            this.store.dispatch(new taskActions.UpdateTask(task));
        } else {
            tsk.complete = 0;
            let task = tsk;
            this.store.dispatch(new taskActions.UpdateTask(task));
        }
    }

    notCompleted(value) {
        if (value == 0) 
            return true;
        else 
            return false;
        
    }
    Completed(value) {
        if (value == 1) 
            return true;
        else 
            return false;
        
    }
    isNameNotEmpty() {
        const val = this.form.value;
        return val && val.name;
    }

    isNotempty() {
        const val = this.taskform.value;
        return val && val.name && val.description;
    }

    private getDismissReason(reason: any): string {
        this.crTask = true;
        this.upTask = false;
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


}




