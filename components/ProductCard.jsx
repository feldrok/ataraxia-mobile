import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import NumericInput from 'react-native-numeric-input'
import React from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import cartActions from '../store/carts/actions'
import { useNavigation } from '@react-navigation/native'

const { createCart, addProductToCart, getCart } = cartActions

const ProductCard = ({ product, category }) => {
    const [quantity, setQuantity] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const storeCart = useSelector((store) => store.cart)
    const storeUser = useSelector((store) => store.user)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    let image = product?.item?.image

    let bgColor
    let textColor
    if (product?.item?.name === 'Scottish Ale') {
        bgColor = 'bg-primary-500'
        textColor = 'text-primary-500'
    } else if (product?.item?.name === 'IPA') {
        bgColor = 'bg-secondary-500'
        textColor = 'text-secondary-500'
    } else if (product?.item?.name === 'Stout') {
        bgColor = 'bg-tertiary-500'
        textColor = 'text-tertiary-500'
    } else if (product?.item?.name === 'Blonde Ale') {
        bgColor = 'bg-quaternary-500'
        textColor = 'text-quaternary-500'
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

    const renderDetails = (category) => {
        if (category === 'cervezas') {
            return (
                <>
                    <View className="p-2">
                        <Text className={`text-2xl font-bold ${textColor}`}>
                            {product?.item?.name}
                        </Text>
                        <View className="flex justify-between">
                            <Text className="text-gray-500">
                                IBU {product?.item?.ibu}
                            </Text>
                            <Text className="text-gray-500">
                                ABV {product?.item?.abv}%
                            </Text>
                        </View>
                        <Text className="text-gray-600 font-medium text-xl">
                            $
                            {product?.item?.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </Text>
                    </View>
                    <View
                        className={`flex flex-1 ${bgColor} duration-300 p-2 cursor-pointer rounded-sm items-center justify-center`}
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
                            className="w-full h-fullflex flex-1 items-center justify-center p-4 mt-2"
                            onPress={handleAdd}
                        >
                            <Text className="text-white font-bold">
                                Agregar al carro
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        } else if (category === 'packs') {
            return (
                <>
                    <View className="p-2">
                        <Text className={`text-2xl font-bold text-gray-700`}>
                            {product?.item?.name}
                        </Text>
                        <View className="flex flex-1 justify-between text-gray-500">
                            <Text>{product?.item?.packSize} unidades</Text>
                            <Text>{product?.item?.ml}ml c/botella</Text>
                        </View>
                        <Text className="text-gray-600 font-medium text-xl">
                            $
                            {product?.item?.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </Text>
                    </View>
                    <View
                        className={`flex bg-gray-700 duration-300 p-2 cursor-pointer rounded-sm items-center justify-center`}
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
                            className="w-full h-fullflex flex-1 items-center justify-center p-4 mt-2"
                            onPress={handleAdd}
                        >
                            <Text className="text-white font-bold">
                                Agregar al carro
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        } else if (category === 'merch') {
            return (
                <>
                    <View className="p-2">
                        <Text className={`text-2xl font-bold text-gray-700`}>
                            {product?.item?.name}
                        </Text>
                        <Text className="text-gray-600 font-medium text-xl">
                            $
                            {product?.item?.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </Text>
                    </View>
                    <View
                        className={`flex bg-gray-700 duration-300 p-2 cursor-pointer rounded-sm items-center justify-center`}
                    >
                        <NumericInput
                            onChange={(quantity) => setQuantity(quantity)}
                            value={product?.item?.stock !== 0 ? quantity : 0}
                            iconSize={5}
                            rounded
                            totalHeight={45}
                            minValue={1}
                            maxValue={product?.item?.stock}
                            textColor="white"
                        />
                        <TouchableOpacity
                            className="w-full h-fullflex flex-1 items-center justify-center p-4 mt-2"
                            onPress={handleAdd}
                        >
                            <Text className="text-white font-bold">
                                Agregar al carro
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
    }

    if (image.length > 0) {
        image = product?.item?.image[0]
    }

    return (
        <View className="w-64 shadow-md m-2 bg-white">
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate({
                        name: 'Producto',
                        params: {
                            product: product,
                            category: category,
                        },
                        merge: true,
                    })
                }
                className="rounded-sm"
            >
                <Image source={{ uri: `${image}` }} className="w-64 h-64" />
            </TouchableOpacity>
            {renderDetails(category)}
        </View>
    )
}

export default ProductCard
