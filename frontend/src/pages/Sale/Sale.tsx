import "./Sale.sass"
import {Button, Form, FormGroup, Input} from "reactstrap";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useDropzone} from "react-dropzone";
import {FiUpload} from "react-icons/fi";
import {IoCloseCircleSharp} from "react-icons/io5";
import {IoIosDocument} from "react-icons/io";

const SalePage = () => {
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")

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
        console.log("useEffect")
        // Revoke the data uris to avoid memory leaks
        // @ts-ignore
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("phone", phone)
        formData.append("email", email)
        formData.append("message", message)

        toast.success(`Заявка успешна отправлена`);

        setName("")
        setPhone("")
        setEmail("")
        setMessage("")
        setFiles([])
    }

    return (
        <div className="sale-request-form-wrapper">
            <Form className="sale-request-form" onSubmit={handleSubmit}>
                <h3 className="login__form__title">Заявка на продажу</h3>
                <FormGroup>
                    <Input placeholder="Ваше имя" type="text" id="name" value={name}
                           onChange={(e) => setName(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Телефон" type="text" id="phone" value={phone}
                           onChange={(e) => setPhone(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Ваш E-mail" type="email" id="email" value={email}
                           onChange={(e) => setEmail(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Ваше сообщение" type="textarea" id="message" value={message}
                           onChange={(e) => setMessage(e.target.value)} required/>
                </FormGroup>

                <div {...getRootProps()} className="files-uploader-container">
                    <input {...getInputProps()} />
                    <FiUpload/>
                    <p>Перетащите сюда нужные файлы</p>
                </div>

                {files.length > 0 &&
                    <div className="files-preview-container">
                        {files.map(file => (
                            <div className="item-wrapper">
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
                    Отправить
                </Button>
            </Form>
        </div>
    )
}

export default SalePage