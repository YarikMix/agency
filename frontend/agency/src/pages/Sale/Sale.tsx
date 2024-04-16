import "./Sale.sass"
import {Button, Form, FormGroup, Input} from "reactstrap";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";

const SalePage = () => {
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("phone", phone)
        formData.append("email", email)
        formData.append("message", message)

        // TODO
        console.log(Object.fromEntries(formData))

        toast.success(`Заявка успешна отправлена`);

        setName("")
        setPhone("")
        setEmail("")
        setMessage("")
    }

    return (
        <div className="sale-request-form-wrapper">
            <Form className="sale-request-form" onSubmit={handleSubmit}>
                <h3 className="login__form__title">Заявка на продажу</h3>
                <FormGroup>
                    <Input placeholder="Ваше имя" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Телефон" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Ваш E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Ваше сообщение" type="textarea" id="message" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                </FormGroup>
                <Button color="primary">
                    Отправить
                </Button>
            </Form>
        </div>
    )
}

export default SalePage