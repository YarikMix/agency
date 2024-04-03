import "./Header.sass"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={logo} alt=""/>
            </Link>

            <nav className="navigation">
                <div className="nav__item">
                    <Link to="/">Аренда</Link>
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

            <div className="profile">
                {/*<img src={avatar} alt=""/>*/}
                <Link to="/login">
                    <Button color="primary">Войти</Button>
                </Link>
            </div>
        </header>
    )
}

export default Header