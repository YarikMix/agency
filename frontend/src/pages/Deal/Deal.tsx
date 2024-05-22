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
import {DateRangePicker} from "rsuite";
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import "rsuite/dist/rsuite-no-reset.css"
import {DateRange} from "rsuite/DateRangePicker";
import {RangeType} from "rsuite/DatePicker";
import { SelectPicker } from 'rsuite';
import {ru, Faker} from '@faker-js/faker';

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

export const DAY = 86400000
export const NOW = Date.now()
export const PREV_DAY = Date.now() - DAY
export const NEXT_DAY = Date.now() + DAY
export const NEXT_MONTH = Date.now() + 30 * DAY

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

    const updateDealStatus = async (status:string) => {
        const response = await api.put("/deals/" + id + "/update_status/", {
            status: status
        })

        if (response.status == 200) {
            toast.success("Статус сделки обновлен")
        }
    }

    const onChangeStatus = (status:string) => {
        console.log("onChangeStatus")
        console.log(status)
        setStatus(status)
        updateDealStatus(status)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [date, setDate] = useState({
        start: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
        end: new Date(NOW + 15 * DAY).getTime()
    })

    const predefinedBottomRanges: RangeType<DateRange[]> = [
        {
            label: 'Сегодня',
            value: [new Date(), new Date()]
        },
        {
            label: 'Вчера',
            value: [addDays(new Date(), -1), addDays(new Date(), -1)]
        },
        {
            label: 'За последнюю неделю',
            value: [subDays(new Date(), 6), new Date()]
        },
        {
            label: 'За последний месяц',
            value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
        },
        {
            label: 'За всё время',
            value: [new Date(new Date().getFullYear() - 10, 0, 1), new Date()]
        }
    ];

    const updateDate = (value) => {
        let tmp = {}

        if (value == null) {
            tmp = {
                start: new Date(PREV_DAY).getTime(),
                end: new Date(NEXT_DAY).getTime()
            }
        } else {
            tmp = {
                start: new Date(value[0]).getTime(),
                end: new Date(value[1]).getTime()
            }
        }

        setDate(tmp)
    }


    const [usersData, setUsersData] = useState<string[]>([])

    useEffect(() => {

        const faker = new Faker({
            locale: [ru],
        });

        const createUsers = (numUsers = 15) => {
            return Array.from({length: numUsers}, () => faker.person.fullName());
        }

        setUsersData(createUsers())

    }, []);

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

                    {is_renter &&
                        <div className="documents-wrapper">

                            <DocumentsModal />

                            <div className="document_block">
                                <h5>Срез по дате</h5>
                                <DateRangePicker
                                    ranges={predefinedBottomRanges}
                                    value={[new Date(date.start), new Date(date.end)]}
                                    onChange={updateDate}
                                    cleanable={false}
                                    format="yyyy-MM-dd"
                                    defaultCalendarValue={[new Date(date.start), new Date(date.end)]}/>
                            </div>

                            <div className="document_block">
                                <h5>Срез по сотруднику</h5>
                                <SelectPicker data={usersData.map(
                                    user => ({ label: user, value: user })
                                )} placeholder="Сотрудник" style={{ width: 224 }} />
                            </div>
    
                        </div>
                    }

                </div>

                <FilesContainer/>

            </div>
        </div>
    )
}

export default DealPage