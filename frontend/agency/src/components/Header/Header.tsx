import "./Header.sass"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {useAuth} from "../../hooks/useAuth.ts";
import avatar from "../../../src/assets/avatar.png"
import {useEffect} from "react";

const Header = () => {
    const {is_authenticated, checkUser} = useAuth()

    useEffect(() => {
        checkUser()
    }, []);

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={logo} alt=""/>
            </Link>

            <nav className="navigation">
                <div className="nav__item">
                    <Link to="/rent">Аренда</Link>
                </div>
                <div className="nav__item">
                    <Link to="/">Продажа</Link>
                </div>
                <div className="nav__item">
                    <Link to="/">Новостройки</Link>
                </div>
                <div className="nav__item">
                    <Link to="/">Ипотека</Link>
                </div>
            </nav>

            {!is_authenticated ?
                <div className="profile">
                    <Link to="/login">
                        <Button color="primary">Войти</Button>
                    </Link>
                </div>
                :
                <Link to="/profile" className="user-profile-link">
                    <img src={avatar} alt=""/>
                </Link>
            }

        </header>
    )
}

export default Header