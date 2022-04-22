import axios from "axios";
import { API_ENDPOINT } from "../helpers/constants";
import { LoggedInDto, LoginDto } from "../models/auth";
import { AppDispatch } from "../store";
import { Auth } from "./actionTypes";
import { setCookie } from "../helpers/cookieHelpers";

const MAX_AGE = 30 //15 * 60 * 60; // Universal cookie accepts seconds

export const login = (
  username: string,
  password: string,
  callback: VoidFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: Auth.LOGIN_REQUEST });
    const loginCred: LoginDto = {
      username: username,
      password: password,
    };
    axios
      .post(API_ENDPOINT + `login`, loginCred)
      .then((res) => {
        const token = (res.data as LoggedInDto).access_token;
        const rfToken = (res.data as LoggedInDto).refresh_token;
        dispatch({ type: Auth.LOGIN_SUCCESS });
        setCookie("accessToken", token, { maxAge: MAX_AGE });
        callback();
        setTimeout(() => {
          dispatch(refreshToken(rfToken));
        }, MAX_AGE);
      })
      .catch((e) => {
        dispatch({ type: Auth.LOGIN_FAILED, payload: e.response.data.msg });
        setCookie("accessToken", null, { maxAge: 0 });
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: Auth.LOGOUT_REQUEST });
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
        const token = (res.data as LoggedInDto).access_token;
        setCookie("accessToken", token, { maxAge: MAX_AGE });
      })
      .catch((e) => {
        setCookie("accessToken", null, { maxAge: 0 });
      });
  };
};
