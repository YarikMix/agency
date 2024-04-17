export type LoginCredentials = {
    email: string,
    password: string
}

export type RegisterCredentials = {
    name: string,
    email: string,
    phone: string,
    password: string
}

export type UserType = {
    id: number | null,
    name: string,
    email: string,
    phone: string,
    is_authenticated: boolean
}

export type FlatType = {
    id: number,
    image: string,
    price: number,
    rooms: number,
    square: number,
    floor: string,
    address: string,
    metro: string,
    name: string,
    description: string,
    renter: UserType
}

export type MortgageType = {
    id: number,
    name: string,
    bank_name: string,
    bank_image: string,
    min_credit_period: string,
    max_credit_period: string,
    min_credit_amount: string,
    max_credit_amount: string,
    price: string,
    percent: string
}