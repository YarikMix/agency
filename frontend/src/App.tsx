import Layout from "./components/Layout/Layout.tsx";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";

function App() {
    useEffect(() => {
        document.title = "Волоколамская недвижимость"
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout />
                <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover={false} closeOnClick={true}/>
            </BrowserRouter>
        </Provider>
    )
}

export default App
