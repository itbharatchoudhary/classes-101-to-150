import { setError, setLoading, setUser } from "../state/auth.slice";
import { register, login, getCurrentUser } from "../service/auth.api";
import { useDispatch } from "react-redux";



export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {

        const data = await register({ email, contact, password, fullname, isSeller })
        dispatch(setUser(data.user))
        return data.user;
    }

    async function handleLogin({ email, password }) {

        const data = await login({ email, password })
        dispatch(setUser(data.user))
        return data.user;
    }

    async function handleGetCurrentUser() {
        try {
            dispatch(setLoading(true));
            const data = await getCurrentUser();
            dispatch(setUser(data.user));
        } catch (error) {
            console.log(error);
             dispatch(setUser(null));
        }
        finally {
            dispatch(setLoading(false));
        }
    }


    return { handleRegister, handleLogin, handleGetCurrentUser }
}