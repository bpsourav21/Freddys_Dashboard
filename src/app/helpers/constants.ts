import { getCookie } from "./cookieHelpers";

export const API_ENDPOINT = "https://freddy.codesubmit.io/";

export const getAccessHeader = () => {
  return {
    ContentType: "application/json",
    Authorization: "Bearer " + getCookie("accessToken"),
  };
};
