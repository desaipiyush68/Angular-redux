import { Task } from './../shared/models/task.model';
import { User } from './../shared/models/user.model';
import { Project } from './../shared/models/project.model';

export interface AppState {
    user: User;
    project: Project;
}
