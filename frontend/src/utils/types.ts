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
    is_authenticated: boolean,
    is_renter: boolean,
    passport_field1: string,
    passport_field2: string,
    passport_field3: string
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

export type DealType = {
    user: UserType,
    renter: UserType,
    flat: FlatType,
    status: number,
    date: string
}

