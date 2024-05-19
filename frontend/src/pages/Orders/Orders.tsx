import "./Orders.sass"
import {useMemo} from "react";
import {api} from "../../utils/api.ts";
import moment from "moment";
import {Button} from "reactstrap";
import CustomTable from "../../components/CustomTable/CustomTable.tsx";
import {ORDER_STATUSES, ORDER_TYPES} from "../../utils/consts.ts";
import 'moment/locale/ru'
import {useQuery} from "react-query";

export const OrdersPage = () => {
    const fetchData = async () => {
        const response= await api.get(`/orders/`)
        return response.data
    }

    const { data } = useQuery(
        'ordersData',
        () => fetchData(),
        {
            initialData: []
        }
    );

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Тип',
                accessor: 'type',
                Cell: ({ value }) => ORDER_TYPES[value]
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => ORDER_STATUSES[value]
            },
            {
                Header: 'Дата формирования',
                accessor: 'date',
                Cell: ({ value }) => moment(value).locale("ru").format("D MMMM HH:mm")
            },
            {
                Header: 'Цена',
                accessor: 'price',
                Cell: ({ value }) => value + " руб"
            },
            {
                Header: 'Комант',
                accessor: 'rooms',
                Cell: ({ value }) => value
            },
            {
                Header: 'Площадь',
                accessor: 'square',
                Cell: ({ value }) => value + " м"
            },
            {
                Header: '',
                accessor: 'btn',
                Cell: () => (
                    <Button color="primary">Открыть</Button>
                )
            }
        ],
        []
    )

    return (
        <div className="orders-page-wrapper">
            <div className="orders-page-container">
                <h3>Ваши заявки</h3>
                <CustomTable columns={columns} data={data}/>
            </div>
        </div>
    )
}