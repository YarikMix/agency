import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {api} from "../../utils/api.ts";
import {useNavigate} from "react-router-dom";
import "./Login.sass"
import React from "react";

const Login = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement> ) => {
        e.preventDefault()
        console.log("handleSubmit")

        const emailField = e.currentTarget.elements[0] as HTMLInputElement
        const passwordField = e.currentTarget.elements[1] as HTMLInputElement

        const response = await api.post("/login/", {
            email: emailField.value,
            password: passwordField.value,
        })

        console.log(response.status)
        console.log(response.data)
        console.log(response.headers)

        if (response.status === 201) {
            console.log("login successfully")
            navigate("/")
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="login__form">
            <FormGroup>
                <Label for="email-input">
                    Введите почту
                </Label>
                <Input placeholder="Почта" type="email" id="email-input"/>
            </FormGroup>
            <FormGroup>
                <Label for="password-input">
                    Введите пароль
                </Label>
                <Input placeholder="Пароль" type="password" id="password-input"/>
            </FormGroup>
            <Button color="primary">
                Войти
            </Button>
        </Form>
    )
}

export default Login