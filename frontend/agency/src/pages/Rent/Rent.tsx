
import "./Rent.sass"
import {useEffect, useState} from "react";
import {api} from "../../utils/api.ts";

const Rent = () => {
    const [items, setItems] = useState(null)


    const fetchItems = async () =>  {
        const response = await api.get("/flats/")
        console.log(response)
        setItems(response.data)
    }


    useEffect(() => {
        fetchItems()
    }, []);


    return (
        <div>
            {items && <img src={items[0].image} alt=""/> }
        </div>
    )
}

export default Rent