import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Team from "./pages/Team";
import { validate } from "./features/auth/authSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(validate());
    }, []);

    return (
        <BrowserRouter>
            {/* las rutas deben ir en español porque es lo que va a ver el usuario o igual debería ir en inglés? */}
            <Routes>
                {/* yo quiero que empiece en Login y que de login recien vaya a teams */}
                {/* <Route path="/workflow-front" element={<Teams />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/workflow-front" element={<Login />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/teams/:idTeam" element={<Team />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
