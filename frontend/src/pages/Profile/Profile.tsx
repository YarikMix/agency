import "./Profile.sass"
import {Button} from "reactstrap";
import avatar from "../../assets/avatar.png";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";

const Profile = () => {
    const {is_authenticated, name, email, phone, logout} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, []);

    const handleLogout = async (e:FormEvent) => {
        e.preventDefault()
        console.log("handleLogout")
        const status = await logout()
        if (status == 200) {
            navigate("/")
        }
    }

    return (
        <div className="profile-wrapper">
            <div className="user-info-container">
                <img src={avatar} alt="" className="user-avatar"/>
                <div className="block">
                    <span>ФИО: {name}</span>
                </div>
                <div className="block">
                    <span>Почта: {email}</span>
                </div>
                <div className="block">
                    <span>Телефон: {phone}</span>
                </div>
                <Button onClick={handleLogout} color="primary">Выйти</Button>
            </div>
        </div>
    )
}

export default Profile