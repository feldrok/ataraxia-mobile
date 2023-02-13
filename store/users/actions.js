import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const handleToken = async () => {
    const BEARER_TOKEN = await AsyncStorage.getItem('token')

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }
    return config
}

const addUser = createAsyncThunk('addUser', async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, user)
        return {
            user: response.data,
            message: 'Usuario creado con éxito',
        }
    } catch (error) {
        return {
            user: null,
            message: error.message,
        }
    }
})

const verifyUser = createAsyncThunk(
    'verifyUser',
    async ({ user_id, verify_code }) => {
        try {
            console.log(user_id, verify_code)
            const response = await axios.get(`${API_URL}/users/verify_code`, {
                params: { user_id, verify_code },
            })
            return {
                response: {
                    message: 'Usuario verificado!',
                },
            }
        } catch (error) {
            return {
                message: 'Error al crear usuario!',
            }
        }
    }
)

const signIn = createAsyncThunk('signIn', async (user) => {
    try {
        const response = await axios.post(
            `${API_URL}/users/signin`,
            user,
            await handleToken()
        )
        return {
            user: response.data,
            message: 'Logueado con éxito',
        }
    } catch (error) {
        return {
            user: null,
            message: error.response.data.response,
        }
    }
})

const signInToken = createAsyncThunk('signInToken', async (token) => {
    try {
        const response = await axios.post(
            `${API_URL}/users/token`,
            token,
            await handleToken()
        )
        return {
            user: response.data,
            message: 'Usuario autenticado',
        }
    } catch (error) {
        console.log(error.response.data)
        return {
            user: null,
            message: 'Error al autenticar usuario',
        }
    }
})

const signout = createAsyncThunk('signout', async () => {
    try {
        const response = await axios.get(
            `${API_URL}/users/signout`,
            await handleToken()
        )
        return {
            user: response.data,
            message: 'Se ha cerrado sesión',
        }
    } catch (error) {
        return {
            user: null,
            message: error.response.data.response,
        }
    }
})

const getProfile = createAsyncThunk('getProfile', async () => {
    try {
        const response = await axios.get(
            `${API_URL}/users/profile`,
            await handleToken()
        )
        return {
            user: response.data,
            message: 'Perfil actualizado',
        }
    } catch (error) {
        return {
            user: null,
            message: error.response.data.response,
        }
    }
})

const userActions = {
    addUser,
    signIn,
    signInToken,
    verifyUser,
    signout,
    getProfile,
}

export default userActions
