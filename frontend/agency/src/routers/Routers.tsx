import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import Rent from "../pages/Rent/Rent.tsx";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="rent" element={<Rent />} />
        </Routes>
    )
}

export default Routers