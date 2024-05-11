import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import "./Login.sass"
import React from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {LoginCredentials} from "../../utils/types.ts";
import {toast} from "react-toastify";

const Login = () => {

    const {login} = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement> ) => {
        e.preventDefault()
        console.log("handleSubmit")

        const emailField = e.currentTarget.elements[0] as HTMLInputElement
        const passwordField = e.currentTarget.elements[1] as HTMLInputElement

        const data:LoginCredentials = {
            email: emailField.value,
            password: passwordField.value
        }

        try {
            const status = await login(data)

            if (status === 201) {
                navigate("/")
            }
        } catch {
            toast.error("Неверная почта или пароль")
        }
    }

    return (
        <div className="login__form__wrapper">
            <Form onSubmit={handleSubmit} className="login__form">
                <h3 className="login__form__title">
                    Форма входа
                </h3>
                <FormGroup>
                    <Label for="email-input">
                        Введите почту
                    </Label>
                    <Input placeholder="Почта" type="email" id="email-input" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="password-input">
                        Введите пароль
                    </Label>
                    <Input placeholder="Пароль" type="password" id="password-input" required/>
                </FormGroup>
                <Link to="/register" className="link">
                    Еще нет аккаунта?
                </Link>
                <Button color="primary">
                    Войти
                </Button>
            </Form>
        </div>
    )
}

export default Login