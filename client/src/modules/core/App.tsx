import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, userActions, AdminDashboard, AdminRoute } from "../platform";
import { PublicRoute } from "./";
import Loader from "./common/loader.component";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        userActions.handleUserType(setIsLoggedIn, setIsAdmin);
    }, []);

    return (
        <>
            <Routes>
                {isLoggedIn && isAdmin && (
                    <Route
                        path="/"
                        element={
                            <div>
                                <AdminRoute isAdmin={isAdmin}>
                                    <Outlet />
                                </AdminRoute>
                            </div>
                        }
                    >
                        <Route path="/" element={<AdminDashboard />} />
                    </Route>
                )}
                <Route path="/" element={<Navigate to="/login" />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
            </Routes>
            <ToastContainer />
        </>
    );
}
