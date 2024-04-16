import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import FlatPage from "../pages/Flat/Flat.tsx";
import FlatList from "../pages/FlatList/FlatList.tsx";
import SalePage from "../pages/Sale/Sale.tsx";
import MortgageList from "../pages/MortgageList/MortgageList.tsx";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/flats" element={<FlatList />} />
            <Route path="/flats/:id" element={<FlatPage />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/mortgage" element={<MortgageList />} />
        </Routes>
    )
}

export default Router