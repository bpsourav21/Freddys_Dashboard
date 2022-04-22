import Cookies, { CookieSetOptions } from "universal-cookie";

export const setCookie = (
  key: string,
  value: any,
  option: CookieSetOptions
) => {
  const cookies = new Cookies();
  cookies.set(key, value, option);
};

export const getCookie = (key: string) : string => {
  const cookies = new Cookies();
  return cookies.get(key);
};
