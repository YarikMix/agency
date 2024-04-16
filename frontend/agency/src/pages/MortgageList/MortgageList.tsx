import "./MortgageList.sass"
import {useEffect, useState} from "react";
import {api} from "../../utils/api.ts";
import {MortgageType} from "../../utils/types.ts";
import {Button} from "reactstrap";

const MortgageList = () => {
    const [items, setItems] = useState<MortgageType[]>([])

    const fetchData = async () => {
        const response = await api.get("/mortgages")
        console.log(response.data)
        setItems(response.data)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="mortgage-list-wrapper">
            {items.map(item => (
                <div className="mortgage-item">
                    <div className="top-container">
                        <img src={item.bank_image.replace("minio", "localhost")} alt=""/>
                        <div className="info-container">
                            {item.name}
                            {item.bank_name}
                        </div>
                    </div>
                    <div className="middle-container">
                        <div className="block">
                            <span className="block-title">Ставка</span>
                            <span className="block-value">от {item.percent}</span>
                        </div>
                        <div className="block">
                            <span className="block-title">Платёж</span>
                            <span className="block-value">от {item.price}</span>
                        </div>
                        <div className="block">
                            <span className="block-title">Срок кредита</span>
                            <span className="block-value">{item.min_credit_period} - {item.max_credit_period}</span>
                        </div>
                        <div className="block">
                            <span className="block-title">Сумма кредита</span>
                            <span className="block-value">{item.min_credit_amount} - {item.max_credit_amount}</span>
                        </div>
                    </div>
                    <div className="bottom-container">
                        <Button color="primary">Подать заявку онлайн</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MortgageList