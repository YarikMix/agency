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
import {formatPrice} from "../../utils/utils.ts";
import CustomDropdown from "../CustomDropdown/CustomDropdown.tsx";

const banks = [
    {
        name: "ВТБ",
        icon: bank1,
        price: 0,
        percentage: 0
    },
    {
        name: "Сбербанк",
        icon: bank2,
        price: 0,
        percentage: 0
    },
    {
        name: "МТС Банк",
        icon: bank3,
        price: 0,
        percentage: 0
    },
    {
        name: "Тинькофф Банк",
        icon: bank4,
        price: 0,
        percentage: 0
    },
    {
        name: "Россельхозбанк",
        icon: bank5,
        price: 0,
        percentage: 0
    }
]

const mortgageTypes = {
    "1": "Базовая программа",
    "2": "Ипотека для IT",
    "3": "Семейная ипотека",
    "4": "Госсподдержка",
    "5": "Военная ипротека",
}

const MortgageCalculator = ({initPrice}:{initPrice:number}) => {

    const [price, setPrice] = useState(initPrice)
    const [payment, setPayment] = useState<number>(initPrice * 0.75)
    const [years, setYears] = useState(30)

    const [loading ,setLoading] = useState(false)

    const [mortgages, setMortgages] = useState(banks)

    const [mortgageType, setMortgageType] = useState<string>("1")

    const calculate = () => {
        setLoading(false)

        const calculatedPrice = Math.floor(Math.abs((price - payment)) / years * Math.abs(0.5 - Math.random()))

        const shuffled = banks.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3)
        selected[0].price = calculatedPrice * Math.abs(0.5 - Math.random())
        selected[1].price = calculatedPrice * Math.abs(0.5 - Math.random())
        selected[2].price = calculatedPrice * Math.abs(0.5 - Math.random())
        selected[0].percentage = 15 * Math.abs(0.5 - Math.random())
        selected[1].percentage = 15 * Math.abs(0.5 - Math.random())
        selected[2].percentage = 15 * Math.abs(0.5 - Math.random())

        setMortgages(selected)
    }

    const debounceFn = useCallback(_debounce(calculate, 500), []);

    useEffect(() => {
        setLoading(true)
        debounceFn()
    }, [price, payment, years, mortgageType]);

    return (
        <div className="mortgage-calculation-wrapper">
            <h3>Рассчитайте ипотеку</h3>
            <CustomDropdown label="Тип ипотеки" options={mortgageTypes} selectedItem={mortgageType} setSelectedItem={setMortgageType} />
            <Form className="mortgage-calculation-form">
                <FormGroup className="price-input">
                    <Label for="price">Стоимость недвижимости</Label>
                    <Input type="number" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
                </FormGroup>
                <FormGroup className="initial_payment-input">
                    <Label for="initial_payment">Первоначальный взнос</Label>
                    <Input type="number" id="initial_payment" value={payment} onChange={(e) => setPayment(Number(e.target.value))}/>
                </FormGroup>
                <FormGroup className="loan_period-input">
                    <Label for="loan_period">Срок кредита</Label>
                    <Input type="number" id="loan_period" value={years} onChange={(e) => setYears(Number(e.target.value))}/>
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
                                <span className="price">от {formatPrice(Math.floor(bank.price))}</span>
                                <span className="percentage">от {(bank.percentage).toFixed(1)}%</span>
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