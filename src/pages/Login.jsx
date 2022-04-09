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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Alert, CircularProgress } from "@mui/material";

export default function SignInSide() {
    const theme = createTheme();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const initialState = {
        email: "",
        password: "",
    };

    /* useEffect(() => {
        if (user.logged) {
            navigate("/");
        }
    }, [user]); */

    const [credentials, setCredentials] = useState(initialState);

    const handleSubmit = () => {
        dispatch(login(credentials));
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
                            {auth.loginError ? (
                                <Alert severity="error">
                                    {auth.loginError}
                                </Alert>
                            ) : null}
                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {auth.loginStatus === "pending" ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={30}
                                    />
                                ) : (
                                    "Login"
                                )}
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
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
