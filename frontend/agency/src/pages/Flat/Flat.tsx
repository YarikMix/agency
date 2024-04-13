import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../utils/api.ts";
import {FlatType} from "../../utils/types.ts";
import "./Flat.sass"

const FlatPage = () => {
    const { id } = useParams<{id: string}>();

    const [data, setData] = useState<FlatType>()

    useEffect(() => {
        console.log(id)
        fetchData()
    }, []);

    const fetchData = async () =>  {
        const response = await api.get(`/flats/${id}`)
        if (response.status == 200) {
            console.log(response.data)
            setData(response.data)
        }
    }

    if (data == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="flat-page">
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
                    <div className="metro-info">
                        <img src="/src/assets/metro.svg" alt=""/>
                        <span>станция {data.metro}</span>
                    </div>
                </div>
                <div className="right-container">
                    <span className="flat-price">{data.price}</span>
                    <span className="label">Коммунальные платежи включены в стоимость без учета счетчиков</span>
                </div>
            </div>
            <div className="flat-description-wrapper">
                <h3>Описание</h3>
                <pre>{data.description}</pre>
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
                    <div className="line">
                        <span>Период аренды</span>
                        <span>Длительный срок</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlatPage