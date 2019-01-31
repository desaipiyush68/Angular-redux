export class User {
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public __v: number,
        public createAt: Date,
        public updatedAt: Date,
        public projects: Array<string>
    ) {}
}
