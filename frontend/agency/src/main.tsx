import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import "./main.sass"
import "./utils/Reset.sass"
import "@fontsource/roboto"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />,
)
