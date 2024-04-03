import Header from "../Header/Header.tsx"
import Routers from "../../routers/Routers.tsx"

const Layout = () => {
    return (
        <div>
            <Header />
            <div>
                <Routers></Routers>
            </div>
        </div>
    )
}

export default Layout