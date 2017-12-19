import { Action } from '@ngrx/store';


export const LOGIN_REQUESTED = 'Login Requested';
export const LOGIN_SUCCESS = 'Login Success';
export const LOGOUT_REQUESTED = 'Logout Requested';
export const LOGOUT_SUCCESS = 'Logout Success';
export const SIGNUP_REQUESTED = 'Signup Requested';
export const SIGNUP_SUCCESS = 'Signup Success';
export const GET_USER_PROFILE = 'Get User Profile';
export const GET_USER_PROFILE_SUCCESS = 'Get User Profile Success';
export const AUTH_ERROR = 'Auth Error';

export interface login {
    email: string,
    password: string
}

export interface register{
    name:string,
    email: string,
    password: string
}

export class Login implements Action {
    readonly type = LOGIN_REQUESTED;
    constructor(public payload: login) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = LOGOUT_REQUESTED;
    constructor() { }
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
    constructor(public payload?:any) { }
}


export class Signup implements Action {
    readonly type = SIGNUP_REQUESTED;
    constructor(public payload: register) { }
}
export class SignupSuccess implements Action {
    readonly type = SIGNUP_SUCCESS;
    constructor(public payload: any) { }
}
export class GetProfile implements Action {
    readonly type = GET_USER_PROFILE;
    constructor(public payload?: any) { }
}
export class GetProfileSuccess implements Action {
    readonly type = GET_USER_PROFILE_SUCCESS;
    constructor(public payload: any) { }
}

export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload?: any) { }
}



export type All
    = Login
    | LoginSuccess
    | Signup
    | SignupSuccess
    | Logout
    | LogoutSuccess
    | GetProfile
    | GetProfileSuccess
    | AuthError;

