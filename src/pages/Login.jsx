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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { aPost } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/sessionActions";

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
    const session = useSelector((state) => state.session);
    const dispatch = useDispatch();
    /* useEffect(() => {
        if (user.logged) {
            navigate("/");
        }
    }, [user]); */

    const initialState = {
        email: "",
        password: "",
    };

    const [credentials, setCredentials] = useState(initialState);
    const handleSubmit = () => {
        aPost("/auth/login", credentials).then((res) => {
            console.log(res.data);
            dispatch(loginAction(res.data));
        });
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const demoAccount = () => {
        setCredentials({
            ...credentials,
            email: "leandro@gmail.com",
            password: "leandro123",
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
                            Width: "100%",
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Login
                        </Typography>
                        {/*  <Typography component="h1" variant="h4">
                            Login First
                        </Typography> */}

                        <Box component="div" noValidate sx={{ mt: 1 }}>
                            <Button
                                variant="contained"
                                endIcon={<AccountCircleIcon />}
                                onClick={demoAccount}
                            >
                                Demo account
                            </Button>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={credentials.email}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={credentials.password}
                                onChange={handleChange}
                            />

                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Providers />
                            <Typography
                                component="h6"
                                variant="h6"
                                color="primary"
                            >
                                <Link
                                    to={"/signup"}
                                    style={{ textDecoration: "none" }}
                                >
                                    Dont have an account? Sign Up
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
