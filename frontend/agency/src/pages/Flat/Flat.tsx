import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../utils/api.ts";

const FlatPage = () => {
    const { id } = useParams<{id: string}>();

    const [data, setData] = useState()

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
        <h3>data.address</h3>
    )
}

export default FlatPage