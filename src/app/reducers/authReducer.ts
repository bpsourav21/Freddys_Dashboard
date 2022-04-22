import { Auth } from "../actions/actionTypes";

export interface AuthState {
  isLoading: boolean;
  loginErrorMsg: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  loginErrorMsg: "",
  isAuthenticated: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: any
): AuthState => {
  switch (action.type) {
    case Auth.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loginErrorMsg: "",
      };
    case Auth.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case Auth.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        loginErrorMsg: action.payload,
      };
    case Auth.LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
