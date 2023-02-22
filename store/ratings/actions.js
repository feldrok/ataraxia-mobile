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

const createRating = createAsyncThunk('rating/createRating', async (data) => {
    try {
        const response = await axios.post(
            `${API_URL}/rating`,
            data,
            await handleToken()
        )
        return {
            rating: response.data,
            message: 'Rating creado',
        }
    } catch (error) {
        return {
            rating: null,
            message: error.response.data.message,
        }
    }
})

const getProductRating = createAsyncThunk(
    'rating/getProductRating',
    async (id) => {
        try {
            const response = await axios.get(
                `${API_URL}/rating/${id}`,
                await handleToken()
            )
            return {
                rating: response.data,
                message: 'Rating encontrado',
            }
        } catch (error) {
            return {
                rating: null,
                message: error.response.data.message,
            }
        }
    }
)

const getUserRating = createAsyncThunk('rating/getUserRating', async (id) => {
    try {
        const response = await axios.get(
            `${API_URL}/rating/user/${id}`,
            await handleToken()
        )
        return {
            rating: response.data,
            message: 'Rating encontrado',
        }
    } catch (error) {
        return {
            rating: null,
            message: error.response.data.message,
        }
    }
})

const ratingActions = {
    createRating,
    getProductRating,
    getUserRating,
}

export default ratingActions
