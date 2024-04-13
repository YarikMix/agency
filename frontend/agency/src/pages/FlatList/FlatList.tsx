import "./FlatList.sass"
import {useEffect, useState} from "react";
import {api} from "../../utils/api.ts";
import {FlatType} from "../../utils/types.ts";
import {useNavigate} from "react-router-dom";

const FlatList = () => {
    const [items, setItems] = useState<FlatType[]>([])

    const navigate = useNavigate()

    const fetchItems = async () =>  {
        const response = await api.get("/flats/")
        if (response.status == 200) {
            console.log(response.data)
            setItems(response.data)
        }
    }

    useEffect(() => {
        fetchItems()
    }, []);

    return (
        <div className="rent-page">
            <div className="items-container">
                {items.map((item) => (
                    <div className="item" key={item.id} onClick={() => navigate("/flats/" + item.id)}>
                        <div className="item-images">
                            <img src={item.image.replace("minio", "localhost")} alt=""/>
                        </div>
                        <div className="item-info">
                            <h3 className="item-price">{item.price}</h3>
                            <span className="item-label-1">В месяц</span>
                            <span className="item-label-2">Коммунальные платежи включены в стоимость без учета счетчиков</span>
                            <div className="general-info">
                                <span>{item.rooms}-комн.кв.</span>
                                <span>{item.square_general}м <sup>2</sup></span>
                                <span>{item.floor} эт.</span>
                            </div>
                            <div className="address-info">
                                <span>{item.address}</span>
                            </div>
                            <div className="metro-info">
                                <img src="/src/assets/metro.svg" alt=""/>
                                <span>{item.metro}</span>
                            </div>
                        </div>
                        <div className="user-info">
                            <img className="user-avatar" src="/src/assets/avatar.png" alt=""/>
                            <div className="user-info-container">
                                <span className="phone">+7 967 892 69 47</span>
                                <span className="name">Строева Валентина Сергеевна</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FlatList