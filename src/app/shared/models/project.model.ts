import { Task } from './task.model';

export class Project {
    constructor(
        public _id?: string,
        public name?: string,
        public _user?: string,
        public __v?: number,
        public updatedAt?: Date,
        public createAt?: Date,
        public tasks?: Array<Task>,
        public slug?: string
    ) {}
}
