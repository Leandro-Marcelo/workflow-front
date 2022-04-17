import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignInSide({ createData, handleClose }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const team = new FormData(event.currentTarget);
        createData(team);
        handleClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "50vh" }}>
                <CssBaseline />
                <Grid item xs={12} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Crea un nuevo equipo
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2, cursor: "default" }}
                            >
                                <label
                                    htmlFor="img"
                                    className="flex items-center w-full justify-center cursor-pointer"
                                >
                                    <input
                                        style={{
                                            display: "none",
                                        }}
                                        id="img"
                                        name="img"
                                        type="file"

                                        /* accept=".png,.jpeg,.jpg" */
                                    />
                                    <AddIcon /> Subir Imagen
                                </label>
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Crear equipo
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
