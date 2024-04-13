import heroBg from "../../assets/heroBg.jpg"
import "./Home.sass"
import {Button} from "reactstrap";

const Home = () => {
    return (
        <section className="hero__section">
            <div className="hero__bg">
                <img src={heroBg} alt=""/>
            </div>
            <div className="hero__content">
                <h2>Недвиж — крупнейшее риэлторское агентство в Волоколамске</h2>
                <p>Наш сервис предоставляет все риэлторские услуги: купля, продажа, обмен, аренда жилой и
                    коммерческой недвижимости Подмосковья, помощь в получении ипотеки.
                    Защита интересов наших клиентов и юридическая чистота проводимых сделок позволяют нам уже 32
                    года занимать лидирующее место на рынке!</p>
                <Button color="primary" className="btn">Каталог недвижимости</Button>
            </div>
        </section>
    )
}

export default Home