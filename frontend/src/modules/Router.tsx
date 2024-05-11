import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import FlatPage from "../pages/Flat/Flat.tsx";
import FlatList from "../pages/FlatList/FlatList.tsx";
import SalePage from "../pages/Sale/Sale.tsx";
import AddFlatPage from "../pages/AddFlatPage/AddFlatPage.tsx";
import DealsPage from "../pages/Deals/Deals.tsx";
import DealPage from "../pages/Deal/Deal.tsx";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/flats" element={<FlatList />} />
            <Route path="/flats/add" element={<AddFlatPage />} />
            <Route path="/flats/:id" element={<FlatPage />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/deals/:id" element={<DealPage />} />
        </Routes>
    )
}

export default Router