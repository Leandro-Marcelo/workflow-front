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
                <Route path="/workflow-frontend" element={<Teams />} />
                <Route path="/teams/:idTeam" element={<Team />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
