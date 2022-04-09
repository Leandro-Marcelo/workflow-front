import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Team from "./Team";

const TableTeam = ({ teams, deleteTeam }) => {
    console.log(`que esta llegando`, teams);
    const noTeams = {
        name: "Crea un equipo",
        img: null,
    };
    return (
        <>
            <Grid container spacing={5}>
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <Team
                            key={team._id}
                            team={team}
                            /* setDataToEdit={setDataToEdit} */
                            deleteTeam={deleteTeam}
                        />
                    ))
                ) : (
                    <Team team={noTeams} />
                )}
            </Grid>
        </>
    );
};

export default TableTeam;
