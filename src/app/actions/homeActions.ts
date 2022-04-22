import axios from "axios";
import { API_ENDPOINT, getAccessHeader } from "../helpers/constants";
import { DashboardDto, OrderDto } from "../models/dashboard";
import { AppDispatch } from "../store";
import { DashBoard, Orders } from "./actionTypes";

export const getDashboard = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: DashBoard.DASHBOARD_DATA_REQUEST });
    axios
      .get(API_ENDPOINT + `dashboard`, { headers: getAccessHeader() })
      .then((res) => {
        const data: DashboardDto = res.data;
        dispatch({ type: DashBoard.DASHBOARD_DATA_SUCCESS, payload: data });
      })
      .catch((e) => {
        dispatch({
          type: DashBoard.DASHBOARD_DATA_FAILED,
          payload: e.response.data.msg,
        });
      });
  };
};

export const getOrders = (pageNum: number = 1, searchTerm: string = "") => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: Orders.ORDERS_REQUEST });
    let url = "orders?page=" + pageNum;

    if (searchTerm !== "") {
      url = url + "&q=" + searchTerm;
    }

    axios
      .get(API_ENDPOINT + url, { headers: getAccessHeader() })
      .then((res) => {
        const orders: OrderDto[] = res.data.orders;
        dispatch({ type: Orders.ORDERS_SUCCESS, payload: orders });
      })
      .catch((e) => {
        dispatch({ type: Orders.ORDERS_FAILED, payload: e.response.data.msg });
      });
  };
};

export const setCurrentPage = (pageNum: number = 1) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: Orders.SET_CURRENT_PAGE, payload: pageNum });
    dispatch(getOrders(pageNum));
  };
};
