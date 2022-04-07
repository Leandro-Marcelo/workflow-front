import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/* import Login from "./pages/Login"; */
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import { aPost } from "./axios";
import { validateAction } from "./actions/sessionActions";
import NotFound from "./pages/NotFound";
import TeamLists from "./pages/TeamLists";
import Nav from "./pages/Nav";
import AppBarResponsive from "./components/Home/AppBarResponsive";
import Projects from "./pages/Projects";
import Casa from "./pages/Casa";
import Project from "./pages/Project";
import Casa2 from "./pages/Casa2";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(`session:`, session);
        aPost("/auth/validate").then((res) => {
            dispatch(validateAction(res.data));
        });
    }, []);

    const session = useSelector((state) => state.session);
    console.log(`session222:`, session);
    return (
        <BrowserRouter>
            {/* las rutas deben ir en español porque es lo que va a ver el usuario o igual debería ir en inglés? */}
            <Routes>
                <Route path="/*" element={<Nav />}>
                    <Route path="proyectos" element={<Projects />} />
                    <Route path="proyectos/:proyecto" element={<Home />} />
                    <Route
                        path="proyectos/:proyecto/equipos/:equipo"
                        element={<TeamLists />}
                    />
                </Route>
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="casa" element={<Casa />} />
                <Route path="casa2" element={<Casa2 />} />
                {/* <Route path="/" element={<Nav />} /> */}
                {/* <Route path="/teams" element={<Home />} /> */}
                {/* <Route path="/teamlists" element={<TeamLists />} />
                  <Route path="/casa" element={<Casa />} />
                  <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
