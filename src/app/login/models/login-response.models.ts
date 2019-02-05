import { Status } from './status-type.enum';

export class LoginResponse {
    constructor(public status: Status, public token: string) {}
}
