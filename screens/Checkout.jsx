import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Address from "../components/Address"
import FormCheckout from "../components/FormCheckout"


const Checkout = () => {

    return(
        <ScrollView>
            <FormCheckout />
            <Address />
        </ScrollView>
    )
}

export default Checkout