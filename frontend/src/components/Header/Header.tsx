import "./Header.sass"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {useAuth} from "../../hooks/useAuth.ts";
import avatar from "../../../src/assets/avatar.png"
import {useEffect} from "react";

const Header = () => {
    const {is_authenticated, is_renter, checkUser} = useAuth()

    useEffect(() => {
        checkUser()
    }, []);

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={logo} alt=""/>
            </Link>

            <nav className="navigation">
                {is_authenticated &&
                    <>
                        <div className="nav__item">
                            <Link to="/flats/">Квартиры</Link>
                        </div>
                        <div className="nav__item">
                            <Link to="/deals">Сделки</Link>
                        </div>
                    </>
                }

                {is_authenticated && !is_renter &&
                    <div className="nav__item">
                        <Link to="/orders">Заявки</Link>
                    </div>
                }
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