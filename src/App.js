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
import Casa from "./pages/Casa";
import Nav from "./pages/Nav";
import AppBarResponsive from "./components/Home/AppBarResponsive";

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
            <Routes>
                <Route path="/nav/*" element={<Nav />}>
                    <Route path="teams" element={<Home />} />
                </Route>
                {/* <Route path="/" element={<Nav />} /> */}
                {/* <Route path="/teams" element={<Home />} /> */}
                {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/teamlists" element={<TeamLists />} />
                <Route path="/casa" element={<Casa />} />
                <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
