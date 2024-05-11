import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/userSlice";
import {api} from "../utils/api.ts";
import {LoginCredentials, RegisterCredentials, UserType} from "../utils/types.ts";

export function useAuth() {
    // @ts-ignore
    const {is_authenticated, name, email, phone, is_renter} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const checkUser = async () => {
        const response = await api.post("/check/")
        if (response.status == 200) {
            const data:UserType = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                is_renter: response.data.is_renter,
                is_authenticated: true
            }

            await setUser(data)
        }
    }

    const login = async ({email, password}:LoginCredentials) => {
        console.log("login")
        console.log(email)
        console.log(password)

        const response = await api.post("/login/", {
            email: email,
            password: password,
        })

        if (response.status == 201) {
            const data:UserType = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                is_renter: response.data.is_renter,
                is_authenticated: true
            }

            await setUser(data)
        }

        return response.status
    }

    const register = async ({name, email, phone, password}:RegisterCredentials) => {
        const response = await api.post("/register/", {
            name: name,
            email: email,
            password: password,
            phone: phone
        })

        if (response.status == 201) {
            await login({email, password})
        }

        return response.status
    }

    const setUser = async ({id, name, email, phone, is_authenticated, is_renter}:UserType) => {
        dispatch(updateUser({
            is_authenticated: is_authenticated,
            is_renter: is_renter,
            id: id,
            name: name,
            email: email,
            phone: phone
        }))
    }

    const logout = async () => {
        const response = await api.post("/logout/")

        dispatch(cleanUser())

        return response.status
    }

    return {
        is_authenticated,
        is_renter,
        name,
        email,
        phone,
        login,
        register,
        checkUser,
        logout,
        setUser
    };
}