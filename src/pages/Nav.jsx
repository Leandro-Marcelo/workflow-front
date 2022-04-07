import React from "react";
import { Outlet } from "react-router-dom";
import AppBarResponsive from "../components/Home/AppBarResponsive";

const Nav = () => {
    return (
        <div className="w-full h-screen">
            <AppBarResponsive />
            <Outlet />
        </div>
    );
};

export default Nav;
