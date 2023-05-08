import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "./config/cookieUtils";
// import Cookies from "js-cookie";

type PublicRouteProps = {
    children: React.ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const loggedInUser = getCookie("access_token");

    // const loggedInUser = Cookies.get("access_token");
    // console.log(loggedInUser);

    if (loggedInUser) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
