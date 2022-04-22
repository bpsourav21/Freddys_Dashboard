import axios from "axios";
import { API_ENDPOINT } from "../helpers/constants";
import { LoggedInDto, LoginDto } from "../models/auth";
import { AppDispatch } from "../store";

import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
} from "./actionTypes";
import { setCookie } from "../helpers/cookieHelpers";

const MAX_AGE = 15 * 60 * 60; // Universal cookie accepts seconds

export const login = (username: string, password: string, cb: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const loginCred: LoginDto = {
      username: username,
      password: password,
    };
    axios
      .post(API_ENDPOINT + `login`, loginCred)
      .then((res) => {
        const token = (<LoggedInDto>res.data).access_token;
        const rfToken = (<LoggedInDto>res.data).refresh_token;
        dispatch({ type: LOGIN_SUCCESS });
        setCookie("accessToken", token, { maxAge: MAX_AGE });
        cb();
        setTimeout(() => {
          dispatch(refreshToken(rfToken));
        }, MAX_AGE);
      })
      .catch((e) => {
        dispatch({ type: LOGIN_FAILED, payload: e.response.data.msg });
        setCookie("accessToken", null, { maxAge: 0 });
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    setCookie("accessToken", null, { maxAge: 0 });
  };
};

export const refreshToken = (refreshToken: string) => {
  return (dispatch: AppDispatch) => {
    axios
      .post(API_ENDPOINT + `refresh`, undefined, {
        headers: { Authorization: "Bearer " + refreshToken },
      })
      .then((res) => {
        const token = (<LoggedInDto>res.data).access_token;
        setCookie("accessToken", token, { maxAge: MAX_AGE });
      })
      .catch((e) => {
        setCookie("accessToken", null, { maxAge: 0 });
      });
  };
};
