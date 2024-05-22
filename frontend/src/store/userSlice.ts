import { createSlice } from "@reduxjs/toolkit"
import {UserType} from "../utils/types.ts";

const initialState: UserType = {
    id: null,
    name: "",
    email: "",
    phone: "",
    is_authenticated: false,
    is_renter: false,
    passport_field1: "",
    passport_field2: "",
    passport_field3: ""
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.is_authenticated = action.payload.is_authenticated
            state.is_renter = action.payload.is_renter
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.passport_field1 = action.payload.passport_field1
            state.passport_field2 = action.payload.passport_field2
            state.passport_field3 = action.payload.passport_field3
        },
        cleanUser: (state) => {
            state.id = null
            state.is_authenticated = false
            state.is_renter = false
            state.name = ""
            state.email = ""
            state.passport_field1 = ""
            state.passport_field2 = ""
            state.passport_field3 = ""
        }
    }
})

export const { updateUser, cleanUser } = authSlice.actions

export default authSlice.reducer