import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";
import { signUp } from "../features/auth/authSlice";

export default function SignInSide() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const theme = createTheme();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* console.log(auth.logged); */
    useEffect(() => {
        if (auth.logged) navigate("/workflow-frontend");
    }, [auth]);

    /* Otra forma de registrarse sería hacer todo en el evento sign in / submit, es decir, agarrar recien los datos ya que probablemente son los finales y crearlo, pero la ventaja de que esten controlados es que puedo hacer validaciones */
    const initialState = {
        name: "",
        email: "",
        password: "",
        img: null,
    };

    const [credentials, setCredentials] = useState(initialState);
    const handleSubmit = () => {
        //como chota puedo saber que tiene dentro el formData este xd
        const user = new FormData();
        user.append("name", credentials.name);
        user.append("email", credentials.email);
        user.append("password", credentials.password);
        user.append("img", credentials.img);

        /* console.log(credentials); */
        dispatch(signUp(user));

        //redireccionarlo
        //handleClose();
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeFile = (img) => {
        setCredentials({
            ...credentials,
            img: img,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(https://workflow-347205.rj.r.appspot.com/files/kanban-project-management.jpg)`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Sign Up
                        </Typography>
                        <Box noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={credentials.name}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                            {/* No abarca todo el boton, solamente cuando aparece la manito */}
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ cursor: "default", marginTop: 2 }}
                            >
                                <label
                                    htmlFor="img"
                                    className="file w-full cursor-pointer"
                                >
                                    <input
                                        className="hidden "
                                        id="img"
                                        name="img"
                                        type="file"
                                        onChange={(e) =>
                                            handleChangeFile(e.target.files[0])
                                        }
                                        /* accept=".png,.jpeg,.jpg" */
                                    />
                                    <AddIcon /> Profile Picture
                                </label>
                            </Button>
                            {auth.statusSignUp === "rejected" ? (
                                <Alert severity="error" className="mt-6">
                                    {auth.messageSignUp}
                                </Alert>
                            ) : null}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1 }}
                                onClick={handleSubmit}
                            >
                                {auth.signUpStatus === "pending" ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={30}
                                    />
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                            <Typography
                                component="h6"
                                variant="h6"
                                color="primary"
                            >
                                <Link
                                    to={"/login"}
                                    style={{ textDecoration: "none" }}
                                >
                                    Already have an account Login Now
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
