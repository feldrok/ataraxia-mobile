import React, { useRef } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "./CartItem"
import cartActions from "../store/carts/actions"
import { ScrollView, TextInput } from "react-native-gesture-handler"


const { applyCoupon } = cartActions

const OrderDetails = ({ items, price }) => {

    const storeCart = useSelector((store) => store.cart)
    const dispatch = useDispatch()
    const inputCoupon = useRef(null)

    const handleCoupon = (e) => {
        e.preventDefault()
        try {
            const coupon = inputCoupon.current.value
            dispatch(
                applyCoupon({
                    id: storeCart.cart?.cart?.response[0]?._id,
                    coupon: {
                        coupon_name: coupon,
                    },
                })
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView>
            <View className="m-auto grid bg-gray-100 shadow-md">
                <View className="w-100 h-80 overflow-y-auto border-b-2 border-gray-300 py-10">
                    {items?.map((item) => (
                        <CartItem key={item._id} product={item} />
                    ))}
                </View>
                {!storeCart.cart?.cart?.response[0]?.coupon_id ? (
                    <View className="flex flex-col items-center justify-center gap-4 border-b-2 border-gray-300 py-6 text-gray-600">
                        <Text>Tiene un codigo promocional?</Text>
                        <TextInput
                            type="text"
                            placeholder="Ingresa tu código"
                            ref={inputCoupon}
                            className="block h-10 w-full rounded-sm border border-gray-200 py-1 px-4 duration-300 focus:border-tertiary-500 focus:outline-none sm:text-sm mb-2"
                        />
                        <Button
                            onPress={handleCoupon}
                            type="submit"
                            className="cursor-pointer rounded-md bg-tertiary-500 p-2 text-white"
                            value="Aceptar"
                            title="Aplicar"
                        />
                    </View>
                ) : null}

                <View className="flex w-full flex-col items-center py-2 border-b-2 border-gray-300">
                    <Text className="text-md flex p-2 text-center font-light text-gray-600">
                        El precio del envio queda a cargo del cliente. Los pedidos
                        no pueden enviarse ni entregarse los fines de semana o días
                        festivos.
                    </Text>
                </View>
                <View className="flex w-full justify-end items-center">
                    <View className="gap-2 p-4 text-gray-800">
                        <Text className="text-lg">Total: </Text>
                        <Text className="text-3xl">${Math.floor(price)}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default OrderDetails