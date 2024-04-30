import {useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {api} from "../../utils/api.ts";
import {FlatType} from "../../utils/types.ts";
import "./Flat.sass"
import {MdOutlinePhone} from "react-icons/md";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {toast} from "react-toastify";
import MortgageCalculator from "../../components/MortgageCalculation/MortgageCalculator.tsx";

const FlatPage = () => {
    const { id } = useParams<{id: string}>();

    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("Я хотел(а) бы получить больше информации по объекту")

    const [data, setData] = useState<FlatType>()

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () =>  {
        const response = await api.get(`/flats/${id}`)
        if (response.status == 200) {
            console.log(response.data)
            setData(response.data)
        }
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("phone", phone)
        formData.append("email", email)
        formData.append("message", message)

        // TODO
        console.log(Object.fromEntries(formData))

        toast.success(`Сообщение отправлено`);

        setName("")
        setPhone("")
        setEmail("")
        setMessage("")
    }

    if (data == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="flat-page">
            <div className="container">
                <div className="flag-images-wrapper">
                    <img src={data.image.replace("minio", "localhost")} alt=""/>
                </div>
                <div className="flat-preview-wrapper">
                    <div className="left-container">
                        <div className="general-info">
                            <span>{data.rooms}-комн.квартира, {data.square} м<sup>2</sup>, {data.floor} эт.</span>
                        </div>
                        <div className="address-info">
                            <span>{data.address}</span>
                        </div>
                    </div>
                    <div className="right-container">
                        <span className="flat-price">{data.price}</span>
                    </div>
                </div>
                <div className="flat-description-wrapper">
                    <h3>Описание</h3>
                    <span>{data.description}</span>
                </div>
                <div className="flat-info-wrapper">
                    <h3>Характеристики</h3>
                    <div className="block">
                        <div className="line">
                            <span>Код обьекта</span>
                            <span>{data.id}</span>
                        </div>
                        <div className="line">
                            <span>Комнатность</span>
                            <span>{data.rooms}-комн.</span>
                        </div>
                        <div className="line">
                            <span>Площадь</span>
                            <span>{data.square} м<sup>2</sup></span>
                        </div>
                        <div className="line">
                            <span>Ремонт</span>
                            <span>Косметический ремонт</span>
                        </div>
                        <div className="line">
                            <span>Спальные места</span>
                            <span>{2 * data.rooms}</span>
                        </div>
                        <div className="line">
                            <span>Счетчики воды</span>
                            <span>Есть</span>
                        </div>
                        <div className="line">
                            <span>Кондиционер</span>
                            <span>Есть</span>
                        </div>
                        <div className="line">
                            <span>Телевизор</span>
                            <span>Есть</span>
                        </div>
                        <div className="line">
                            <span>Микроволновка</span>
                            <span>Есть</span>
                        </div>
                        <div className="line">
                            <span>Холодильник</span>
                            <span>Есть</span>
                        </div>
                        <div className="line">
                            <span>Плита</span>
                            <span>Электрическая</span>
                        </div>
                        <div className="line">
                            <span>Расположение на этаже</span>
                            <span>Не угловая</span>
                        </div>
                    </div>
                </div>
                <MortgageCalculator initPrice={data.price}/>
                <Form className="flat-request-form" onSubmit={handleSubmit}>
                    <h3 className="login__form__title">Запрос информации </h3>
                    <FormGroup>
                        <Input placeholder="Ваше имя" type="text" id="name" value={name}
                               onChange={(e) => setName(e.target.value)} required/>
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
            <div className="flat-owner-wrapper">
                <img className="user-avatar" src="/src/assets/avatar.png" alt=""/>
                <span className="name">{data.renter.name}</span>
                <div className="phone-container">
                    <MdOutlinePhone/>
                    <span className="phone">{data.renter.phone}</span>
                </div>
            </div>
        </div>
    )
}

export default FlatPage