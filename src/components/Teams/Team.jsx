import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Default from "../../assets/img/teamImage.jpg";
import ModalDelete from "../utilities/ModalDelete";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function MediaCard({ team, deleteTeam }) {
    const PF = process.env.APIREST;
    return (
        <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card>
                <Link to={"/teams/" + team._id}>
                    <CardMedia
                        component="img"
                        image={
                            team.img
                                ? "https://workflow-347205.rj.r.appspot.com" +
                                  team.img
                                : Default
                        }
                        alt="image"
                        className="h-[170px]"
                    />
                </Link>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        height: "60px",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        /* marginTop={1} */
                    >
                        {team.name}
                    </Typography>
                </CardContent>
                {/* onClick={() => deleteTeam(team._id) */}
                {/* le puedo pasar como props una función con el id ya puesto? */}

                <Box className="flex justify-around pb-4">
                    <ModalDelete deleteTeam={deleteTeam} idTeam={team._id} />
                    {/* <ModalDelete /> */}
                </Box>
            </Card>
        </Grid>
    );
}
