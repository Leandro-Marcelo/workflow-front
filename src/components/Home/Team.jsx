import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import DeleteButton from "./DeleteButton";
import Typography from "@mui/material/Typography";
import Default from "../../assets/img/teamImage.jpg";
import ModalDelete from "../utilities/ModalDelete";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function MediaCard({ team, deleteTeam }) {
    return (
        <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card>
                <Link to={"/team/" + team._id}>
                    <CardMedia
                        component="img"
                        image={
                            team.img
                                ? "http://localhost:4000" + team.img
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
                    <ModalDelete />
                </Box>
            </Card>
        </Grid>
    );
}
