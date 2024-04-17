import Header from "../Header/Header.tsx"
import Router from "../../modules/Router.tsx"

const Layout = () => {
    return (
        <div>
            <Header />
            <div>
                <Router></Router>
            </div>
        </div>
    )
}

export default Layout