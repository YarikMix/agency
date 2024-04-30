import {Button, Form, FormGroup, Input, Label, Spinner} from "reactstrap";
import "./MortgageCalculator.sass"
import bank1 from "./banks/1.svg"
import bank2 from "./banks/2.svg"
import bank3 from "./banks/3.svg"
import bank4 from "./banks/4.svg"
import bank5 from "./banks/5.svg"
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import _debounce from 'lodash/debounce';

const banks = [
    {
        name: "ВТБ",
        icon: bank1
    },
    {
        name: "Сбербанк",
        icon: bank2
    },
    {
        name: "МТС Банк",
        icon: bank3
    },
    {
        name: "Тинькофф Банк",
        icon: bank4
    },
    {
        name: "Россельхозбанк",
        icon: bank5
    }
]

const MortgageCalculator = ({initPrice}:{initPrice:number}) => {

    const [price, setPrice] = useState(initPrice)
    const [payment, setPayment] = useState<number>(initPrice * 0.75)
    const [years, setYears] = useState(30)

    const [loading ,setLoading] = useState(false)

    const [mortgages, setMortgages] = useState(banks)

    const calculate = () => {
        setLoading(false)
        const shuffled = banks.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3)
        setMortgages(selected)
    }

    const debounceFn = useCallback(_debounce(calculate, 500), []);

    useEffect(() => {
        setLoading(true)
        debounceFn()
    }, [price, payment, years]);

    return (
        <div className="mortgage-calculation-wrapper">
            <h3>Рассчитайте ипотеку</h3>
            <Form className="mortgage-calculation-form">
                <FormGroup className="price-input">
                    <Label for="price">Стоимость недвижимости</Label>
                    <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </FormGroup>
                <FormGroup className="initial_payment-input">
                    <Label for="initial_payment">Первоначальный взнос</Label>
                    <Input type="number" id="initial_payment" value={payment} onChange={(e) => setPayment(e.target.value)}/>
                </FormGroup>
                <FormGroup className="loan_period-input">
                    <Label for="loan_period">Срок кредита</Label>
                    <Input type="number" id="loan_period" value={years} onChange={(e) => setYears(e.target.value)}/>
                </FormGroup>
            </Form>
            <div className="banks-list">
                {loading ?
                    <Spinner className="loader"/>
                    :
                    mortgages.map(bank => (
                        <div className="bank" key={bank.name}>
                            <div className="top-bank-panel">
                                <img src={bank.icon} alt=""/>
                                <span>{bank.name}</span>
                            </div>
                            <div className="bottom-bank-panel">
                                <span className="price">от {Math.floor(Math.abs((price - payment)) / years)}</span>
                                <span className="percentage">от 17.4%</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="bottom_panel">
                <Button color="primary" onClick={() => toast.success("Мы вам перезвоним")}>Хочу ипотеку</Button>
            </div>
        </div>
    )
}

export default MortgageCalculator