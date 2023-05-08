import Cookies from "js-cookie";

export const getCookie = (cookieName: any) => {
    return Cookies.get(cookieName);
};
