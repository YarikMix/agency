import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import FlatPage from "../pages/Flat/Flat.tsx";
import FlatList from "../pages/FlatList/FlatList.tsx";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="flats" element={<FlatList />} />
            <Route path="flats/:id" element={<FlatPage />} />
        </Routes>
    )
}

export default Routers