import { login, register, logout, getMe } from '../Services/Auth.api'
import { useContext ,  } from 'react'
import { AuthContext } from '../Context/Auth.context'

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ email, password, username }) {
        setLoading(true)
        try {
            const data = await register({ email, password, username })
            setUser(data.user)
        } catch (error) {
            console.error('Registration error:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ email, password, username }) {
        setLoading(true)
        try {
            const data = await login({ email, password, username })
            setUser(data.user)
        }
        catch (error) {
            console.error('Login error:', error)
        }   
        finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            console.error('GetMe error:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    

    return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout }
}
