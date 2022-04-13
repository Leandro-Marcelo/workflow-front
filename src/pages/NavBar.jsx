import React from "react";
import { Outlet } from "react-router-dom";
import AppBarResponsive from "../components/NavBar/AppBarResponsive";

const NavBar = () => {
    return (
        <div className="w-full h-screen">
            <AppBarResponsive />

            <Outlet />
        </div>
    );
};

export default NavBar;
