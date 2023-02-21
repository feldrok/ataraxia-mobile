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

const createCart = createAsyncThunk('cart/createCart', async ({ id, data }) => {
    try {
        const response = await axios.post(
            `${API_URL}/cart/${id}`,
            data,
            await handleToken()
        )
        return {
            cart: response.data,
            message: 'Carro creado satisfactoriamente',
        }
    } catch (error) {
        console.log(error)
        return {
            cart: null,
            message: error.message,
        }
    }
})

const getCart = createAsyncThunk('cart/getCart', async (id) => {
    try {
        const response = await axios.get(`${API_URL}/cart/${id}`, await handleToken())
        return {
            cart: response.data,
            message: 'Carro cargado satisfactoriamente',
        }
    } catch (error) {
        return {
            cart: null,
            message: error.message,
        }
    }
})

const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async ({ id, product }) => {
        try {
            const response = await axios.put(
                `${API_URL}/cart/add/${id}`,
                product,
                await handleToken()
            )
            
            return {
                cart: response.data,
                message: 'Producto agregado al carro',
            }
        } catch (error) {
            console.log(error)
            return {
                cart: null,
                message: error.message,
            }
        }
    }
)

const updateCart = createAsyncThunk(
    'cart/updateCart',
    async ({ id, product }) => {
        try {
            const response = await axios.put(
                `${API_URL}/cart/update/${id}`,
                product,
                await handleToken()
            )
            return {
                cart: response.data,
                message: 'Cart updated successfully',
            }
        } catch (error) {
            console.log(error)
            return {
                cart: null,
                message: error.message,
            }
        }
    }
)

const deleteItem = createAsyncThunk(
    'cart/deleteItem',
    async ({ id, product_id }) => {
        try {
            const response = await axios.put(
                `${API_URL}/cart/delete/${id}`,
                product_id,
                await handleToken()
            )
            return {
                cart: response.data,
                message: 'Item deleted successfully',
            }
        } catch (error) {
            return {
                cart: null,
                message: error.message,
            }
        }
    }
)

const emptyCart = createAsyncThunk('cart/emptyCart', async () => {
    try {
        const response = await axios.put(`${API_URL}/cart/empty`, await handleToken())
        return {
            cart: response.data,
            message: 'Cart emptied successfully',
        }
    } catch (error) {
        return {
            cart: null,
            message: error.message,
        }
    }
})

const applyCoupon = createAsyncThunk(
    'cart/applyCoupon',
    async ({ id, coupon }) => {
        try {
            const response = await axios.put(
                `${API_URL}/cart/coupon/${id}`,
                coupon,
                handleToken()
            )
            return {
                cart: response.data,
                message: 'Coupon applied successfully',
            }
        } catch (error) {
            return {
                cart: null,
                message: error.response.data,
            }
        }
    }
)

const cartActions = {
    createCart,
    getCart,
    addProductToCart,
    updateCart,
    deleteItem,
    emptyCart,
    applyCoupon
}

export default cartActions
