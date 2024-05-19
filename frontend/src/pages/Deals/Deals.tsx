import "./Deals.sass"
import {useMemo} from "react";
import {Button} from "reactstrap";
import CustomTable from "../../components/CustomTable/CustomTable.tsx";
import {Link} from "react-router-dom";
import {api} from "../../utils/api.ts";
import 'moment/locale/ru'
import {DEAL_STATUSES} from "../../utils/consts.ts";
import moment from "moment/moment";
import {useAuth} from "../../hooks/useAuth.ts";
import {useQuery} from "react-query";


const DealsPage = () => {
    const {is_renter} = useAuth()

    const fetchData = async () => {
        const response= await api.get(`/deals/`)
        return response.data.map(deal => ({
            id: deal.id,
            fio: is_renter ? deal.user.name : deal.renter.name,
            data: deal.date,
            flat: deal.flat.id,
            phone: is_renter ? deal.user.phone : deal.renter.phone,
            status: deal.status
        }))
    }

    const { data } = useQuery(
        'dealsData',
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
                Header: is_renter ? "ФИО покупателя" : 'ФИО риелтора',
                accessor: 'fio',
            },
            {
                Header: is_renter ? 'Телефон покупателя' : "Телефон риелтора",
                accessor: 'phone',
                Cell: ({ value }) => "+" + value
            },
            {
                Header: 'Объект',
                accessor: 'flat',
                Cell: ({ value }) => <Link to={"/flats/" + value}>Ссылка</Link>
            },
            {
                Header: 'Дата начала сделки',
                accessor: 'date',
                Cell: ({ value }) => moment(value).locale("ru").format("D MMMM HH:mm")
            },
            {
                Header: 'Статус сделки',
                accessor: 'status',
                Cell: ({ value }) => DEAL_STATUSES[value]
            },
            {
                Header: '',
                accessor: 'btn',
                Cell: ({ cell }) => (
                    <Link to={"/deals/" + cell.row.values.id}>
                        <Button color="primary" onClick={() => console.log(cell.row.values.id)}>Открыть</Button>
                    </Link>
                )
            }
        ],
        []
    )

    return (
        <div className="deals-page-wrapper">
            <div className="deals-page-container">
                <h3>Ваши сделки</h3>
                <CustomTable columns={columns} data={data}/>
            </div>
        </div>
    )
}

export default DealsPage