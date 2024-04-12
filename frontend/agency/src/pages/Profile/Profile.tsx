import "./Profile.sass"
import {Button} from "reactstrap";
import avatar from "../../assets/avatar.png";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";

const Profile = () => {
    const {is_authenticated, name, email, logout} = useAuth()

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
            <img src={avatar} alt="" className="user-avatar"/>
            <h3>{name}</h3>
            <span>{email}</span>
            <Button onClick={handleLogout}>Выйти</Button>
        </div>
    )
}

export default Profile