import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/* import Login from "./pages/Login"; */
import { useEffect } from "react";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Team from "./pages/Team";
import NavBar from "./pages/NavBar";
import Casa from "./pages/Casa";
import Casa2 from "./pages/Casa2";
import { validate } from "./features/auth/authSlice";

function App() {
    const auth = useSelector((state) => state.auth);
    console.log(`auth:`);
    console.log(auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(validate());
    }, []);

    return (
        <BrowserRouter>
            {/* las rutas deben ir en español porque es lo que va a ver el usuario o igual debería ir en inglés? */}
            <Routes>
                <Route path="/*" element={<NavBar />}>
                    <Route path="teams" element={<Teams />} />
                    <Route path="teams/:idTeam" element={<Team />} />
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
