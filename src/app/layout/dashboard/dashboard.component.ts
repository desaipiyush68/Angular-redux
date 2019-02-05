import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AppState } from '../../store/store';
import { Store } from '@ngrx/store';
import * as projectActions from 'app/actions/project.actions';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../shared/models/task.model';
import { Project } from '../../shared/models/project.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    project$: Observable<any>;
    Projects: Array<Project>;
    Tasks: Array<Task>;
    projectForm: FormGroup;
    taskForm: FormGroup;
    closeResult: string;
    crTask: boolean;
    upTask: boolean;
    currentTask: Task;
    complete: boolean;
    dltTask: boolean;
    dltProject: boolean;
    currentProject: Project;

    constructor(
        private store: Store<AppState>,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) {
        this.project$ = this.store.select('project');
        this.projectForm = this.fb.group({
            name: ['', Validators.required]
        });
        this.crTask = true;
        this.upTask = false;
        this.dltTask = false;
        this.dltProject = false;
    }

    ngOnInit(): void {
        this.getProjects();
    }

    getProjects(): void {
        this.store.dispatch(new projectActions.GetProjectList());
        this.project$.subscribe(response => (this.Projects = response.project));
    }

    addProject() {
        const val = this.projectForm.value;
        this.store.dispatch(new projectActions.CreateProject(val));
        this.projectForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    addTaskModel(pid, content) {
        this.taskForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            _project: [pid, Validators.required],
            complete: [false, Validators.required]
        });

        this.modalService.open(content).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    addTask() {
        this.store.dispatch(new projectActions.CreateTask(this.taskForm.value));
        this.taskForm = null;
    }

    updateTaskModel(task: Task, project: Project, content) {
        this.crTask = false;
        this.upTask = true;
        this.currentTask = task;
        this.currentTask._project = project._id;
        this.taskForm = this.fb.group({
            name: [task.name, Validators.required],
            description: [task.description, Validators.required],
            complete: [task.complete]
        });
        this.modalService.open(content).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    updateTask() {
        const task = this.currentTask;
        const val = this.taskForm.value;
        task.name = val.name;
        task.description = val.description;
        task.complete = val.complete;
        this.store.dispatch(new projectActions.UpdateTask(task));
        this.currentTask = null;
        this.crTask = true;
        this.upTask = false;
    }

    updateProjectModel(project, content) {
        this.currentProject = project;
        this.projectForm = this.fb.group({
            name: [project.name, Validators.required]
        });
        this.modalService.open(content).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    updateProject() {
        this.store.dispatch(
            new projectActions.UpdateProject(
                new Project(
                    this.currentProject._id,
                    this.projectForm.value.name,
                    this.currentProject._user,
                    this.currentProject.__v,
                    this.currentProject.updatedAt,
                    this.currentProject.createAt,
                    this.currentProject.tasks,
                    this.currentProject.slug
                )
            )
        );
        this.currentProject = null;
        this.projectForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    deleteTaskModel(task: Task, project: Project, content) {
        this.currentTask = task;
        this.currentTask._project = project._id;
        this.dltTask = true;
        this.dltProject = false;
        this.modalService.open(content).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.dltTask = false;
                this.dltProject = false;
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    deleteTask() {
        this.store.dispatch(
            new projectActions.DeleteTask(
                new Task(
                    this.currentTask.name,
                    this.currentTask.description,
                    this.currentTask._project,
                    this.currentTask._id,
                    this.currentTask.updatedAt,
                    this.currentTask.createAt,
                    this.currentTask.complete
                )
            )
        );
        this.currentTask = null;
    }

    deleteProjectModel(project, content) {
        this.currentProject = project;
        this.dltTask = false;
        this.dltProject = true;
        this.modalService.open(content).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.dltTask = false;
                this.dltProject = false;
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    deleteProject() {
        this.store.dispatch(new projectActions.DeleteProject(this.currentProject));
        this.currentProject = null;
    }

    taskCompleteChanged(tsk: Task, projectId: string) {
        tsk.complete = tsk.complete ? false : true;
        this.store.dispatch(
            new projectActions.UpdateTask(
                new Task(
                    tsk.name,
                    tsk.description,
                    projectId,
                    tsk._id,
                    tsk.updatedAt,
                    tsk.createAt,
                    tsk.complete
                )
            )
        );
    }

    isNameNotEmpty() {
        const val = this.projectForm.value;
        return val && val.name;
    }

    isNotempty() {
        const val = this.taskForm.value;
        return val && val.name && val.description;
    }

    private getDismissReason(reason: any): string {
        this.crTask = true;
        this.upTask = false;
        return reason === ModalDismissReasons.ESC
            ? 'by pressing ESC'
            : reason === ModalDismissReasons.BACKDROP_CLICK
            ? 'by clicking on a backdrop'
            : `with: ${reason}`;
    }
}
