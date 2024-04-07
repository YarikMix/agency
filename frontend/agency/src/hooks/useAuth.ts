import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/userSlice";
import {api} from "../utils/api.ts";

export function useAuth() {
    // @ts-ignore
    const {is_authenticated, name, email} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const checkUser = async () => {
        const response = await api.post("/check/")
        if (response.status == 200) {
            await setUser(response.data.id, response.data.name, response.data.email)
        }
    }

    const login = async (email:string, password:string) => {
        const response = await api.post("/login/", {
            email: email,
            password: password,
        })

        if (response.status == 201) {
            await setUser(response.data.id, response.data.name, response.data.email)
        }

        return response.status
    }

    const register = async (name:string, email:string, password:string) => {
        const response = await api.post("/register/", {
            name: name,
            email: email,
            password: password,
        })

        if (response.status == 201) {
            await login(email, password)
        }

        return response.status
    }

    const setUser = async (id:number, name:string, email:string) => {
        dispatch(updateUser({
            is_authenticated: true,
            id: id,
            name: name,
            email: email
        }))
    }

    const logout = async () => {
        const response = await api.post("/logout/")

        dispatch(cleanUser())

        return response.status
    }

    return {
        is_authenticated,
        name,
        email,
        login,
        register,
        checkUser,
        logout,
        setUser
    };
}