import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LinkMUI from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Providers from "../components/SignUp/Providers";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpAction } from "../actions/sessionActions";
import { aPost } from "../axios";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <LinkMUI color="inherit" href="https://mui.com/">
                Your Website
            </LinkMUI>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const dispatch = useDispatch();
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

        aPost("/auth/signup", user).then((res) => {
            dispatch(signUpAction(res.data));
        });

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
                        backgroundImage:
                            "url(https://source.unsplash.com/random)",
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
                        {/* <Typography component="h1" variant="h4">
                            Welcome to LeanWorkflow!
                        </Typography> */}
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
                                sx={{ mt: 2, cursor: "default" }}
                            >
                                <label htmlFor="img" className="file">
                                    <input
                                        style={{
                                            display: "none",
                                        }}
                                        id="img"
                                        name="img"
                                        type="file"
                                        onChange={(e) =>
                                            handleChangeFile(e.target.files[0])
                                        }
                                        /* accept=".png,.jpeg,.jpg" */
                                    />
                                    <AddIcon /> Subir Imagen
                                </label>
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Providers />
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
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
