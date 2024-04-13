import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Register.sass"
import {useAuth} from "../../hooks/useAuth.ts";

const Register = () => {

    const {register} = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement> ) => {
        e.preventDefault()

        const nameField = e.currentTarget.elements[0] as HTMLInputElement
        const emailField = e.currentTarget.elements[1] as HTMLInputElement
        const passwordField = e.currentTarget.elements[2] as HTMLInputElement

        const status = await register(
            nameField.value,
            emailField.value,
            passwordField.value,
        )

        if (status === 201) {
            console.log("registered successfully")
            navigate("/")
        }
    }

    return (
        <div className="register__form__wrapper">
            <Form onSubmit={handleSubmit} className="register__form">
                <h3 className="register__form__title">
                    Форма регистрации
                </h3>
                <FormGroup>
                    <Label for="email-input">
                        Введите имя
                    </Label>
                    <Input placeholder="Почта" type="text" id="email-input" required/>
                </FormGroup>
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
                <Link to="/login" className="link">
                    Уже есть аккаунт?
                </Link>
                <Button color="primary">
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    )
}

export default Register