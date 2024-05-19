import "./FlatList.sass"
import {useEffect, useState} from "react";
import {api} from "../../utils/api.ts";
import {FlatType} from "../../utils/types.ts";
import {Link} from "react-router-dom";
import {Button, ButtonGroup} from "reactstrap";
import {useAuth} from "../../hooks/useAuth.ts";
import {formatPrice} from "../../utils/utils.ts";

const FlatList = () => {
    const {is_authenticated} = useAuth()

    const [items, setItems] = useState<FlatType[]>([])

    const [roomsFilter, setRoomsFilter] = useState<string>("-1")


    const fetchItems = async () =>  {
        const response = await api.get("/flats/", {
            params: {
                rooms: roomsFilter
            }
        })

        if (response.status == 200) {
            setItems(response.data)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [roomsFilter]);

    const roomsOptions = [-1, 1, 2, 3, 4]

    return (
        <div className="rent-page">
            <div className="filters-container">
                <div className="left-container">
                    <h3>Комнатность</h3>
                    <ButtonGroup className="me-2">
                        {roomsOptions.map(option => (
                            <Button color="primary" active={option.toString() == roomsFilter} onClick={() => setRoomsFilter(option.toString())} key={option}>
                                {option > 0 ? option : "Все"}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
                <div className="right-container">
                    {is_authenticated &&
                        <Link to="/orders/add">
                            <Button color="primary">
                                Заявку на покупку
                            </Button>
                        </Link>
                    }
                    {is_authenticated &&
                        <Link to="/flats/add">
                            <Button color="primary">
                                Заявку на продажу
                            </Button>
                        </Link>
                    }
                </div>
            </div>
            <div className="items-container">
                {items.map((item) => (
                    <Link to={"/flats/" + item.id} key={item.id}>
                        <div className="item" >
                            <div className="item-images">
                                <img src={item.image} alt=""/>
                            </div>
                            <div className="item-info">
                                <h3 className="item-price">{formatPrice(item.price)}</h3>
                                <div className="general-info">
                                    <span>{item.rooms}-комн.кв.</span>
                                    <span>{item.square}м <sup>2</sup></span>
                                    <span>{item.floor} эт.</span>
                                </div>
                                <div className="address-info">
                                    <span>{item.address}</span>
                                </div>
                            </div>
                            <div className="user-info">
                                <img className="user-avatar" src="/src/assets/avatar.png" alt=""/>
                                <div className="user-info-container">
                                    <span className="phone">+{item.renter?.phone}</span>
                                    <span className="name">{item.renter?.name}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FlatList