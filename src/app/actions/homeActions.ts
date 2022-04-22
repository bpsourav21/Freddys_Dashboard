import axios from "axios";
import { API_ENDPOINT, getAccessHeader } from "../helpers/constants";
import { DashboardDto, OrderDto } from "../models/dashboard";
import { AppDispatch } from "../store";
import {
  DASHBOARD_DATA_FAILED,
  DASHBOARD_DATA_REQUEST,
  DASHBOARD_DATA_SUCCESS,
  ORDERS_FAILED,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  SET_CURRENT_PAGE,
} from "./actionTypes";

export const getDashboard = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: DASHBOARD_DATA_REQUEST });
    axios
      .get(API_ENDPOINT + `dashboard`, { headers: getAccessHeader() })
      .then((res) => {
        const data: DashboardDto = res.data;
        dispatch({ type: DASHBOARD_DATA_SUCCESS, payload: data });
      })
      .catch((e) => {
        dispatch({ type: DASHBOARD_DATA_FAILED, payload: e.response.data.msg });
      });
  };
};

export const getOrders = (pageNum: number = 1, searchTerm: string = "") => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ORDERS_REQUEST });
    let url = "orders?page=" + pageNum;

    if (searchTerm !== "") {
      url = url + "&q=" + searchTerm;
    }

    axios
      .get(API_ENDPOINT + url, { headers: getAccessHeader() })
      .then((res) => {
        const orders: OrderDto[] = res.data.orders;
        dispatch({ type: ORDERS_SUCCESS, payload: orders });
      })
      .catch((e) => {
        dispatch({ type: ORDERS_FAILED, payload: e.response.data.msg });
      });
  };
};

export const setCurrentPage = (pageNum: number = 1) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: pageNum });
    dispatch(getOrders(pageNum));
  };
};
