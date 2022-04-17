import { CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Teams/Modal";
import { useDispatch, useSelector } from "react-redux";
import TableTeam from "../components/Teams/TableTeam";
import { addTeam, getTeams, removeTeam } from "../features/teams/teamsSlice";
import AppBarResponsive from "../components/NavBar/AppBarResponsive";
import { getUsers } from "../features/users/usersSlice";

const Home = () => {
    const teams = useSelector((state) => state.teams);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.logged === false) navigate("/login");
    }, [auth]);

    useEffect(() => {
        dispatch(getTeams());
        dispatch(getUsers());
    }, []);

    const createData = (team) => {
        dispatch(addTeam(team));
    };

    const deleteTeam = (idTeam) => {
        dispatch(removeTeam(idTeam));
    };
    return (
        <div className="w-full h-screen">
            <AppBarResponsive />
            <Container sx={{ marginY: 5 }}>
                <div className="flex justify-between mb-4">
                    {/* My Workspace */}
                    <p className="text-2xl font-semibold md:text-4xl">
                        Mis Equipos
                    </p>
                    <Modal
                        createData={createData}
                        /*  updateData={updateData}
                        dataToEdit={dataToEdit}
                        setDataToEdit={setDataToEdit} */
                    />
                </div>
                {teams.getTeamsStatus === "pending" && (
                    <CircularProgress
                        color="inherit"
                        className="flex justify-center items-center"
                    />
                )}
                {teams.teams && (
                    <TableTeam
                        teams={teams.teams}
                        // setDataToEdit={setDataToEdit}
                        deleteTeam={deleteTeam}
                    />
                )}
            </Container>
        </div>
    );
};

export default Home;
