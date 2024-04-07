import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import "./Login.sass"
import React from "react";
import {useAuth} from "../../hooks/useAuth.ts";

const Login = () => {

    const {login} = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement> ) => {
        e.preventDefault()
        console.log("handleSubmit")

        const emailField = e.currentTarget.elements[0] as HTMLInputElement
        const passwordField = e.currentTarget.elements[1] as HTMLInputElement

        const status = await login(emailField.value, passwordField.value)

        if (status === 201) {
            console.log("login successfully")
            navigate("/")
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