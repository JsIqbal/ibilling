import axios from "axios";
import { getCookie } from "../../core/config/cookieUtils";

export async function login(loginData: any) {
    try {
        const res = await axios.post(
            "http://localhost:3001/users/login",
            loginData,
            {
                withCredentials: true,
            }
        );
        return res;
    } catch (err) {
        window.location.href = "/";
        console.log(err);
    }
}

export function handleUserType(setIsLoggedIn: any, setIsAdmin: any) {
    const loggedInUser = getCookie("access_token");
    if (loggedInUser) {
        setIsLoggedIn(true);

        setIsAdmin(true);
        getUsers();
    }
}

export async function logout() {
    try {
        const token = getCookie("access_token");
        const res = await axios.post(
            "http://localhost:3001/users/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );
        window.location.href = "/"; // apatoto ekhane thak. pore external kora hobe
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function getUsers() {
    try {
        const token = getCookie("access_token");
        const response = await axios.get("http://localhost:3001/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        console.log("------------------------------------users", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
