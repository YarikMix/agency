import "./AddFlatPage.sass"
import {Button,  Form, FormGroup, Input, Label} from "reactstrap";
import {FormEvent, useCallback, useState} from "react";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.tsx";
import {FiUpload} from "react-icons/fi";
import {IoIosDocument} from "react-icons/io";
import {IoCloseCircleSharp} from "react-icons/io5";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import {api} from "../../utils/api.ts";
import {useNavigate} from "react-router-dom";

const AddFlatPage = () => {
    const [address, setAddress] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [floor, setFloor] = useState<string>("")
    const [square, setSquare] = useState<string>("")

    const [rooms, setRooms] = useState<string>("1")
    const [balcony, setBalcony] = useState<string>("1")
    const [parking, setParking] = useState<string>("1")

    const [files, setFiles] = useState<File[]>([])

    const navigate = useNavigate()

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        console.log("handleSubmit")

        const formData = new FormData()
        formData.append("address", address)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("floor", floor)
        formData.append("rooms", rooms)
        formData.append("balcony", balcony)
        formData.append("parking", parking)

        if (files?.length) {
            formData.append('image', files[0], files[0].name)
        }

        console.log(Object.fromEntries(formData))

        const response = await api.post("/flats/add/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(response.status)

        if (response.status == 200) {
            toast.success(`Заявка успешна отправлена`);
            navigate("/flats/")
        }
    }


    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length) {
            // @ts-ignore
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        }
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {
        'image/*': ['.png']
    }})

    const removeFile = (name:string) => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const roomsOptions = {
        1: "1",
        2: "2",
        3: "3",
        4: "4"
    }

    const balconyOptions = {
        1: "Балкон",
        2: "Лоджия"
    }

    const parkingOptions = {
        1: "Наземная",
        2: "Подземная"
    }

    return (

        <div className="add-flat-page-wrapper">
            <Form onSubmit={handleSubmit} className="add-flat-page-form">
                <h3>
                    Новая аренда
                </h3>
                <FormGroup>
                    <Label for="address">
                        Адрес
                    </Label>
                    <Input placeholder="Адрес" type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">
                        Описание
                    </Label>
                    <Input placeholder="Описание" type="textarea" id="description" value={description} onChange={e => setDescription(e.target.value)} required/>
                </FormGroup>
                <CustomDropdown label={"Кол-во комнат"} options={roomsOptions} selectedItem={rooms} setSelectedItem={setRooms}/>
                <FormGroup>
                    <Label for="price">
                        Цена
                    </Label>
                    <Input placeholder="Цена" type="text" id="description" value={price} onChange={e => setPrice(e.target.value)} required/>
                </FormGroup>
                <CustomDropdown label={"Балкон"} options={balconyOptions} selectedItem={balcony} setSelectedItem={setBalcony} />
                <FormGroup>
                    <Label for="floor">
                        Этаж
                    </Label>
                    <Input placeholder="Этаж" type="text" id="floor" value={floor} onChange={e => setFloor(e.target.value)} required/>
                </FormGroup>
                <CustomDropdown label={"Парковка"} options={parkingOptions} selectedItem={parking} setSelectedItem={setParking}  />
                <FormGroup>
                    <Label for="square">
                        Площадь
                    </Label>
                    <Input placeholder="Площадь" type="text" id="square" value={square} onChange={e => setSquare(e.target.value)}  required/>
                </FormGroup>

                <h4>Фото квартиры</h4>

                <div {...getRootProps()} className="files-uploader-container">
                    <input {...getInputProps()} />
                    <FiUpload/>
                    <p>Перетащите сюда нужные файлы</p>
                </div>

                {files.length > 0 &&
                    <div className="files-preview-container">
                        {files.map(file => (
                            <div className="item-wrapper" key={file.name}>
                                <div className='item'>
                                    {file.type.includes("image") ?
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            width={200}
                                            height={200}
                                            onLoad={() => {
                                                URL.revokeObjectURL(file.preview)
                                            }}
                                        />
                                        :
                                        <div className="document-container">
                                            <IoIosDocument/>
                                        </div>
                                    }

                                    <IoCloseCircleSharp onClick={() => removeFile(file.name)} className="remove-file-btn"/>
                                </div>
                                <div className="file-name-container">
                                    <p>{file.name}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                }

                <Button color="primary" className="submit-btn">
                    Опубликовать
                </Button>
            </Form>
        </div>
    )
}

export default AddFlatPage