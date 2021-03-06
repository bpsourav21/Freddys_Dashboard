import { DashBoard, Orders } from "../actions/actionTypes";
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
    case DashBoard.DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        dashboardData: {} as DashboardDto,
        isLoading: true,
      };
    case DashBoard.DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
        isLoading: false,
      };
    case DashBoard.DASHBOARD_DATA_FAILED:
      return {
        ...state,
        dashboardData: {} as DashboardDto,
        isLoading: false,
      };
    case Orders.ORDERS_REQUEST:
      return {
        ...state,
        orders: [],
        isLoading: true,
      };
    case Orders.ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
      };
    case Orders.ORDERS_FAILED:
      return {
        ...state,
        orders: [],
        isLoading: false,
      };
    case Orders.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};
