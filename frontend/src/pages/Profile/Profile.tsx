import "./Profile.sass"
import {Button, FormGroup, Input, Label} from "reactstrap";
import avatar from "../../assets/avatar.png";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useRef} from "react";
import {api} from "../../utils/api.ts";
import {toast} from "react-toastify";

const Profile = () => {
    const {is_authenticated, name, email, phone, passport_field1, passport_field2, passport_field3, logout, updateUserData} = useAuth()

    const navigate = useNavigate()

    const inp1 = useRef(null)
    const inp2 = useRef(null)
    const inp3 = useRef(null)
    const inp4 = useRef(null)
    const inp5 = useRef(null)
    const inp6 = useRef(null)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }

        inp1.current.value = name
        inp2.current.value = email
        inp3.current.value = phone

        inp4.current.value = passport_field1
        inp5.current.value = passport_field2
        inp6.current.value = passport_field3

    }, []);

    const handleLogout = async (e:FormEvent) => {
        e.preventDefault()

        const status = await logout()
        if (status == 200) {
            navigate("/")
        }
    }

    const handleSaveProfile = async (e:FormEvent) => {
        e.preventDefault()

        const name_value = inp1.current?.value
        const email_value = inp2.current?.value
        const phone_value = inp3.current?.value

        const passport_field1_value = inp4.current?.value
        const passport_field2_value = inp5.current?.value
        const passport_field3_value = inp6.current?.value

        const response = await api.put("/profile/update/", {
            name: name_value,
            email: email_value,
            phone: phone_value,
            passport_field1: passport_field1_value,
            passport_field2: passport_field2_value,
            passport_field3: passport_field3_value
        })

        if (response.status == 200) {
            updateUserData(name_value, email_value, phone_value, passport_field1_value, passport_field2_value, passport_field3_value)
            toast.success("Данные успешно сохранены")
        }
    }

    return (
        <div className="profile-wrapper">
            <div className="user-info-container">
                <img src={avatar} alt="" className="user-avatar"/>
                <FormGroup row={true}>
                    <Label for="inp1">ФИО</Label>
                    <Input type="text" id="inp1" placeholder="ФИО" innerRef={inp1} />
                </FormGroup>
                <FormGroup row={true}>
                    <Label for="inp2">Почта</Label>
                    <Input type="text" id="inp2" placeholder="Почта" innerRef={inp2}/>
                </FormGroup>
                <FormGroup row={true}>
                    <Label for="inp3">Телефон</Label>
                    <Input type="text" id="inp3" placeholder="Телефон" innerRef={inp3}/>
                </FormGroup>
                <FormGroup row={true}>
                    <Label for="inp4">Серия и номер</Label>
                    <Input type="text" id="inp4" placeholder="Серия и номер" innerRef={inp4}/>
                </FormGroup>
                <FormGroup row={true}>
                    <Label for="inp5">Когда выдан</Label>
                    <Input type="text" id="inp5"  placeholder="Когда выдан" innerRef={inp5}/>
                </FormGroup>
                <FormGroup row={true}>
                    <Label for="inp6">Кем выдан</Label>
                    <Input type="text" id="inp6"  placeholder="Кем выдан" innerRef={inp6}/>
                </FormGroup>
                <div className="btns-container">
                    <Button onClick={handleSaveProfile} color="primary">Сохранить</Button>
                    <Button onClick={handleLogout} color="danger">Выйти</Button>
                </div>
            </div>
        </div>
    )
}

export default Profile