import React, { useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import CartItem from '../components/CartItem'
import { ScrollView } from 'react-native-gesture-handler'
import cartActions from '../store/carts/actions'
import { useFocusEffect } from '@react-navigation/native'

const { getCart } = cartActions

const Cart = ({ navigation }) => {
    const storeCart = useSelector((store) => store.cart)
    const storeUser = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const products = storeCart.cart.cart?.response[0]?.products

    return (
        <View className="flex flex-col h-full justify-between items-center">
            <ScrollView>
                {products?.map((product) => (
                    <CartItem key={product._id} product={product} />
                ))}
            </ScrollView>
            <View className="mb-5 flex items-center justify-center">
                <View className="flex flex-row gap-2 items-center p-2">
                    <Text className="text-lg font-semibold">Total</Text>
                    <Text className="text-2xl font-bold">
                        $
                        {storeCart.cart?.cart?.response[0]?.total_price
                            ? storeCart.cart?.cart?.response[0]?.total_price
                            : 0}
                    </Text>
                </View>
                <TouchableOpacity className="rounded-md border-2 border-primary-500 bg-primary-500 py-2 px-4 text-center">
                    <Text className="text-white text-lg">Proceder al pago</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cart
