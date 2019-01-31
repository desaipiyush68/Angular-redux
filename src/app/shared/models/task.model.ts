export class Task {
    constructor(
        public name: string,
        public description: string,
        public _project: string,
        public _id?: string,
        public updatedAt?: Date,
        public createAt?: Date,
        public complete?: number
    ) {}
}
