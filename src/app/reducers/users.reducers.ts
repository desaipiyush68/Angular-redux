import * as userActions from '../actions/users.actions';
export type Action = userActions.All;
const initialState = {

}

/// Reducer function
export function UserReducer(state = initialState, action: Action) {
  switch (action.type) {
    case userActions.LOGIN_REQUESTED:
      return { ...state, loading: true };
    case userActions.LOGIN_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case userActions.SIGNUP_REQUESTED:
      return { ...state, ...action.payload, loading: true };
    case userActions.SIGNUP_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case userActions.LOGOUT_REQUESTED:
      return { ...state, loading: true };
    case userActions.LOGOUT_SUCCESS:
      return { ...state, loading: false };
    case userActions.GET_USER_PROFILE:
      return { ...state, loading: true };
    case userActions.GET_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case userActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: true };
    default:
      return state;
  }
}