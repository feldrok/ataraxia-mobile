import { Image, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from '@expo/vector-icons/Ionicons'
import NumericInput from 'react-native-numeric-input'
import React from 'react'
import cartActions from '../store/carts/actions'

const { getCart, updateCart, deleteItem } = cartActions

const CartItem = ({ product }) => {
    const dispatch = useDispatch()
    const storeUser = useSelector((store) => store.user)
    const [quantity, setQuantity] = React.useState(product?.quantity)
    const [loading, setLoading] = React.useState(false)
    const producto = product?.product_id

    const handleUpdate = async (quant) => {
        let tokenId = storeUser.user.response?.user?.id
        let guestToken = await AsyncStorage.getItem('guestToken')
        let productUpdate = {
            product_id: producto._id,
            quantity: quant,
        }
        try {
            setLoading(true)
            await dispatch(
                updateCart({
                    id: tokenId ? tokenId : guestToken,
                    product: productUpdate,
                })
            )
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            await dispatch(getCart(tokenId ? tokenId : guestToken))
        }
    }

    const handleDelete = async () => {
        let tokenId = storeUser.user.response?.user?.id
        let guestToken = await AsyncStorage.getItem('guestToken')
        let product = {
            product_id: producto._id,
        }
        try {
            setLoading(true)
            await dispatch(
                deleteItem({
                    id: tokenId ? tokenId : guestToken,
                    product_id: product,
                })
            )
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            await dispatch(getCart(tokenId ? tokenId : guestToken))
        }
    }

    const handleQuantity = (value) => {
        setQuantity(value)
        handleUpdate(value)
    }

    return (
        <View className="relative flex flex-row w-80 justify-evenly bg-white m-2 rounded-md">
            <View
                className={`rounded-md absolute z-50 flex top-0 left-0 items-center justify-center bg-white duration-200 overflow-hidden ${
                    loading ? 'w-full h-full' : 'w-0 h-0'
                }`}
            >
                <Text className="font-bold text-2xl">Actualizando...</Text>
            </View>
            <View className="flex">
                <Image
                    className="h-32 w-32 rounded-md"
                    source={{ uri: `${producto?.image[0]}` }}
                />
            </View>
            <View className="flex flex-col justify-evenly p-2">
                <Text className="font-bold text-gray-800">
                    {producto?.name}
                </Text>
                <Text>{producto?.ml ? `${producto.ml} ml` : null}</Text>
                <Text className="font-medium">
                    {producto?.price
                        ? `$ ${producto.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} c/u`
                        : null}
                </Text>
                <View>
                    <NumericInput
                        onChange={(quantity) => handleQuantity(quantity)}
                        value={quantity}
                        iconSize={5}
                        rounded
                        totalHeight={45}
                        minValue={1}
                        maxValue={producto?.stock}
                        step={1}
                        valueType="integer"
                        textColor="black"
                    />
                </View>
            </View>
            <View className="absolute top-2 right-2">
                <Ionicons
                    name="trash"
                    size={30}
                    color="#E0003F"
                    style={{ marginRight: 10 }}
                    onPress={handleDelete}
                />
            </View>
        </View>
    )
}

export default CartItem
