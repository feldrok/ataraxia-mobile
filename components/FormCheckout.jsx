import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Text, View } from "react-native"
import cartActions from "../store/carts/actions"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import OrderDetails from "./OrderDetails"

const { getCart } = cartActions

const FormCheckout = () => {

    const storeCart = useSelector((store) => store.cart)
    const dispatch = useDispatch()
    useIsFocused(() => {
        dispatch(getCart(storeCart?.path))
    })

    console.log(storeCart.cart?.cart?.response);
    
    return (
        <View>
            <OrderDetails
            items={storeCart.cart.cart?.response[0]?.products}
            price={storeCart.cart.cart?.response[0]?.total_price}
            />
        </View>
    )
}

export default FormCheckout