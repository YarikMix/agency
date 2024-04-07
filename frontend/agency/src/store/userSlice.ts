import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    name: "",
    email: "",
    is_authenticated: false
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.is_authenticated = action.payload.is_authenticated
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
        },
        cleanUser: (state) => {
            state.id = null
            state.is_authenticated = false
            state.name = ""
            state.email = ""
        }
    }
})

export const { updateUser, cleanUser } = authSlice.actions

export default authSlice.reducer