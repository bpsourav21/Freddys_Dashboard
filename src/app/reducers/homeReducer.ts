import {
  DASHBOARD_DATA_FAILED,
  DASHBOARD_DATA_REQUEST,
  DASHBOARD_DATA_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  ORDERS_FAILED,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  SET_CURRENT_PAGE,
} from "../actions/actionTypes";
import { DashboardDto, OrderDto } from "../models/dashboard";

export interface HomeState {
  isLoading: boolean;
  loginErrorMsg: string;
  orders: OrderDto[];
  dashboardData: DashboardDto;
  currentPage: number;
}

const initialState: HomeState = {
  isLoading: false,
  loginErrorMsg: "",
  orders: [],
  dashboardData: {} as DashboardDto,
  currentPage: 1,
};

export const homeReducer = (
  state: HomeState = initialState,
  action: any
): HomeState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loginErrorMsg: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        loginErrorMsg: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case ORDERS_REQUEST:
      return {
        ...state,
        orders: [],
        isLoading: true,
      };
    case ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
      };
    case ORDERS_FAILED:
      return {
        ...state,
        orders: [],
        isLoading: false,
      };
    case DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        dashboardData: {} as DashboardDto,
        isLoading: true,
      };
    case DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
        isLoading: false,
      };
    case DASHBOARD_DATA_FAILED:
      return {
        ...state,
        dashboardData: {} as DashboardDto,
        isLoading: false,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
