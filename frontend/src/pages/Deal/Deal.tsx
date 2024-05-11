import "./Deal.sass"
import {BiSend} from "react-icons/bi";
import {useCallback, useEffect, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useDropzone} from "react-dropzone";
import {FiUpload} from "react-icons/fi";
import {IoIosDocument} from "react-icons/io";
import {IoCloseCircleSharp} from "react-icons/io5";
import {Link, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {api} from "../../utils/api.ts";
import {DealType} from "../../utils/types.ts";
import {DEAL_DOCUMENTS, DEAL_STATUSES} from "../../utils/consts.ts";
import moment from "moment/moment";
import 'moment/locale/ru'
import {downloadFile, formatPrice} from "../../utils/utils.ts";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

type ChatMessageProps = {
    self: boolean,
    text: string
}

const Chat = ({user, defaultMessage}) => {
    const data = [
        {
            self: false,
            text: defaultMessage
        }
    ]

    const [input, setInput] = useState("")

    const [messages, setMessages] = useState(data)

    const handleSendMessage = (e) => {
        e.preventDefault()
        const message = {
            self: true,
            text: input
        }
        setMessages([...messages, message])
        setInput("")
    }

    return (
        <div className="chat-wrapper">
            <div className="chat-wrapper__top-panel">
                <img className="avatar" src="/src/assets/avatar.png" alt=""/>
                <span>{user}</span>
            </div>
            <div className="chat-wrapper__center-panel">
                {messages.map(message => (
                    <ChatMessage self={message.self} text={message.text} key={message.text}/>
                ))}
            </div>
            <Form className="chat-wrapper__bottom-panel" onSubmit={handleSendMessage}>
                <input placeholder="Напишите что-нибудь" value={input} onChange={(e) => setInput(e.target.value)}/>
                <BiSend onClick={handleSendMessage}/>
            </Form>
        </div>
    )
}

const ChatMessage = ({self, text}: ChatMessageProps) => {
    if (self) {
        return (
            <div className="self-message">
                <div className="message-body">
                    {text}
                </div>
            </div>
        )
    }

    return (
        <div className="message">
            <img className="avatar" src="/src/assets/avatar.png" alt=""/>
            <div className="message-body">
                {text}
            </div>
        </div>
    )
}

const FilesContainer = () => {
    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        }
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {
            'image/*': ['.png'],
            'text/html': ['.html', '.htm'],
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "application/msword": [".doc"],
        }})

    const removeFile = (name:string) => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    useEffect(() => {
        files.length > 0 && toast.success("Файлы успешно сохранены")
        // @ts-ignore
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    return (
        <div className="documents-input-container">

            <div className="files-preview-container">
                {files.length > 0 &&
                    files.map(file => (
                        <div className="item-wrapper" key={file.name}>
                            <div key={file.name} className='item'>
                                {file.type.includes("image") ?
                                    <img
                                        src={(file as any).preview}
                                        alt={file.name}
                                        width={100}
                                        height={100}
                                        onLoad={() => {
                                            URL.revokeObjectURL((file as any).preview)
                                        }}
                                    />
                                    :
                                    <div className="document-container">
                                        <IoIosDocument/>
                                    </div>
                                }

                                <IoCloseCircleSharp onClick={() => removeFile(file.name)}
                                                    className="remove-file-btn"/>
                            </div>
                            <div className="file-name-container">
                                <p>{file.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div {...getRootProps()} className="files-uploader-container">
                <input {...getInputProps()} />
                <FiUpload/>
                <p>Перетащите сюда документы</p>
            </div>

        </div>
    )
}

const DocumentsModal = () => {
    const [selectedDocument, setSelectedDocument] = useState("1")

    const [modal, setModal] = useState(false)

    const toggleModal = () => setModal(!modal)

    return (
        <div>
            <Button color="primary" onClick={toggleModal}>Документы</Button>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader>
                     Документы
                </ModalHeader>
                <ModalBody>
                    <CustomDropdown label={"Выберите документ"} options={DEAL_DOCUMENTS} selectedItem={selectedDocument} setSelectedItem={setSelectedDocument} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        toggleModal()
                        downloadFile(`/src/assets/documents/${selectedDocument}.pdf`, "doc.pdf")
                    }} color="primary">Сформировать</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

const DealPage = () => {
    const {id} = useParams<{ id: string }>();

    const {is_renter} = useAuth()

    const [data, setData] = useState<DealType>()

    const [status, setStatus] = useState("1")

    const fetchData = async () => {
        const response = await api.get("/deals/" + id)
        setData(response.data)
        setStatus(response.data.status)
    }

    const updateDealStatus = async () => {
        const response = await api.put("/deals/" + id + "/update_status/", {
            status: status
        })

        if (response.status == 200) {
            toast.success("Статус сделки обновлен")
        }
    }

    const onChangeStatus = (status:string) => {
        setStatus(status)
        updateDealStatus()
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (data == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="deal-page-wrapper">
            <Chat user={is_renter ? data.user.name : data.renter.name} defaultMessage={is_renter ? "Здравствуйте! Я бы хотел задать пару вопросов по квартире." : "Здравствуйте! Готов ответить на все ваши вопросы."}/>
            <div className="deal-info-wrapper">
                <div className="deal-info-container">
                    <h3>Информация о сделке</h3>
                    <Link to={"/flats/" + data.flat.id}>Объект: 4-комн.квартира, 30 м2, 6 эт.</Link>
                    <span className="flat-price">Цена: {formatPrice(data.flat.price)}</span>
                    <div className="status-info-container">
                        {is_renter ? <CustomDropdown label={"Статус"} options={DEAL_STATUSES} selectedItem={status} setSelectedItem={onChangeStatus} /> : <span>Статус: {DEAL_STATUSES[data.status]}</span>}
                    </div>
                    <span>Дата: {moment(data.date).locale("ru").format("D MMMM HH:mm")}</span>

                    {is_renter ? <span>Покупатель: {data.user.name}</span> : <span>Риелтор: {data.renter.name}</span> }
                    {is_renter ? <span>Телефон покупателя: +{data.user.phone}</span> : <span>Телефон риелтора: +{data.renter.phone}</span> }

                    <DocumentsModal />
                </div>

                <FilesContainer/>

            </div>
        </div>
    )
}

export default DealPage