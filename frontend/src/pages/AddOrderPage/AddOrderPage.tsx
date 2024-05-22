import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./AddOrderPage.sass"
import {FormEvent, useState} from "react"
import Slider from "react-slider"
import {formatPrice} from "../../utils/utils.ts";
import {api} from "../../utils/api.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AddOrderPage = () => {

    const [rooms, setRooms] = useState([1, 4])
    const [square, setSquare] = useState([10, 120])
    const [price, setPrice] = useState(1000000)
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("price", price.toString())
        formData.append("rooms", rooms[1].toString())
        formData.append("square", square[1].toString())
        formData.append("type", "1")

        const response = await api.post("/orders/add/", formData)

        console.log(response.status)

        if (response.status == 200) {
            toast.success(`Заявка успешна сформирована`);
            navigate("/orders/")
        }

        return

    }

    return (
        <div className="order-page-wrapper">
            <Form onSubmit={handleSubmit} className="order-page-wrapper__order-form">
                <h3>Заявка на покупку</h3>
                <div>
                    <Label>Кол-во комнат: {rooms[0]} - {rooms[1]}</Label>
                    <Slider min={1} max={4} value={rooms} onChange={setRooms}></Slider>
                </div>
                <div>
                    <Label>Площадь: {square[0]}м - {square[1]}м</Label>
                    <Slider min={10} max={120} value={square} onChange={setSquare}></Slider>
                </div>
                <div>
                    <Label for="price-input">Макс. цена (руб)</Label>
                    <Input type="text" id="price-input" value={formatPrice(price)} onChange={e => setPrice(e.target.value.replace(/ /g, ""))}></Input>
                </div>
                <FormGroup>
                    <Label for="description">
                        Описание
                    </Label>
                    <Input placeholder="Описание" type="textarea" id="description" value={description} onChange={e => setDescription(e.target.value)} required/>
                </FormGroup>
                <Button color="primary">Отправить</Button>
            </Form>
        </div>
    )
}

export default AddOrderPage