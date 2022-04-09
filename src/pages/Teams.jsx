import { CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";

import Modal from "../components/Teams/Modal";
import { useDispatch, useSelector } from "react-redux";
import TableTeam from "../components/Teams/TableTeam";
import { addTeam, getTeams, removeTeam } from "../features/teams/teamsSlice";

const Home = () => {
    useEffect(() => {
        dispatch(getTeams());
    }, []);
    const teams = useSelector((state) => state.teams);
    const dispatch = useDispatch();
    console.log(`teams:`, teams);

    const createData = (team) => {
        dispatch(addTeam(team));
    };

    const deleteTeam = (idTeam) => {
        dispatch(removeTeam(idTeam));
    };
    return (
        <Container sx={{ marginY: 5 }}>
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold md:text-4xl">
                    My Workspace
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
    );
};

export default Home;
