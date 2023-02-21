import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import NumericInput from 'react-native-numeric-input'
import Rating from '../components/Rating'
import React from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import cartActions from '../store/carts/actions'

const { getCart, addProductToCart } = cartActions

const Product = ({ navigation, route }) => {
    const [quantity, setQuantity] = React.useState(1)
    const [loading, setLoading] = React.useState(false)

    const storeCart = useSelector((store) => store.cart)
    const storeUser = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const { product, category } = route.params
    const producto = product.item
    let textColor
    let bgColor
    if (producto.name === 'Scottish Ale') {
        textColor = 'text-primary-500'
        bgColor = 'bg-primary-500'
    } else if (producto.name === 'IPA') {
        textColor = 'text-secondary-500'
        bgColor = 'bg-secondary-500'
    } else if (producto.name === 'Stout') {
        textColor = 'text-tertiary-500'
        bgColor = 'bg-tertiary-500'
    } else if (producto.name === 'Blonde Ale') {
        textColor = 'text-quaternary-500'
        bgColor = 'bg-quaternary-500'
    }

    const handleAdd = async () => {
        let tokenId = storeUser.user.response?.user?.id
        let guestToken = await AsyncStorage.getItem('guestToken')
        console.log(guestToken)
        let addProduct = {
            product_id: product?.item?._id,
            quantity: quantity,
        }
        try {
            setLoading(true)
            if (product?.item?.stock === 0) {
                Toast.show({
                    text1: 'No hay stock, intenta más tarde',
                })
            } else {
                if (storeCart.cart.cart?.response.length === 0) {
                    await dispatch(
                        createCart({
                            id: tokenId ? tokenId : guestToken,
                            data: addProduct,
                        })
                    )
                } else {
                    await dispatch(
                        addProductToCart({
                            id: tokenId ? tokenId : guestToken,
                            product: addProduct,
                        })
                    )
                    Toast.show({
                        text1: 'Agregado al carrito',
                    })
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            await dispatch(getCart(tokenId ? tokenId : guestToken))
        }
    }

    return (
        <ScrollView
            className="mt-2 flex w-full mb-10"
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View>
                <Image
                    source={{ uri: `${producto.image[0]}` }}
                    className="w-96 h-96"
                />
            </View>
            <View className="p-4">
                <Text
                    className={`text-4xl font-bold ${
                        textColor ? textColor : 'text-gray-600'
                    }`}
                >
                    {producto.name}
                </Text>
                <Rating producto={producto} />
                <Text className="text-gray-600 text-lg">
                    {producto.description}
                </Text>
            </View>
            <View className="p-4 w-full">
                <Text
                    className={`text-2xl font-bold ${
                        textColor ? textColor : 'text-gray-600'
                    } ${producto.stock === 0 ? 'text-red-500' : ''}`}
                >
                    {producto.stock > 0
                        ? `Stock ${producto.stock}`
                        : 'Sin stock'}
                </Text>
                <Text
                    className={`text-3xl font-bold ${
                        textColor ? textColor : 'text-gray-600'
                    }`}
                >
                    <Text>Precio </Text>$
                    {producto.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                    c/u
                </Text>
            </View>
            <View
                className={`flex flex-1 ${bgColor} w-full duration-300 p-2 cursor-pointer rounded-sm items-center justify-center`}
            >
                <NumericInput
                    onChange={(quantity) => setQuantity(quantity)}
                    value={product?.item?.stock !== 0 ? quantity : 0}
                    iconSize={5}
                    rounded
                    totalHeight={45}
                    minValue={1}
                    maxValue={product?.item?.stock}
                    step={1}
                    valueType="integer"
                    textColor="white"
                />
                <TouchableOpacity
                    className="w-full h-full flex flex-1 items-center justify-center p-4 mt-2"
                    onPress={handleAdd}
                >
                    <Text className="text-white font-bold">
                        Agregar al carro
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Product
