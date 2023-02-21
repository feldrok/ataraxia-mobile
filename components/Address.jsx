import { useIsFocused } from "@react-navigation/native"
import React, { useState } from "react"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import addressActions from "../store/address/actions"
import RadioGroup from "react-native-radio-buttons-group"


const { getAddress } = addressActions

const Address = () => {

    const storeAddress = useSelector((state) => state.address)
    const addressess = storeAddress?.addresses?.response
    const [activeAddress, setActiveAddress] = useState()
    const dispatch = useDispatch()

    useIsFocused(() => {
        dispatch(getAddress(activeAddress))
    }, [activeAddress])

    useIsFocused(() => {
        setActiveAddress(addressess[0]?._id)
    }, [])

    return (
        <View className="flex w-full flex-col items-center justify-center p-4">
            {/* <RadioGroup
                className="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row"
                value={activeAddress}
                onChange={setActiveAddress}
            > */}
                {storeAddress?.addresses?.response?.map((address) => (
                    // <RadioGroup.Option
                    //     className={({ checked }) => `
                    //         ${
                    //             checked
                    //                 ? 'bg-tertiary-500 text-white shadow-none'
                    //                 : 'bg-white text-black shadow-md'
                    //         }
                    //         relative my-2 flex h-40 w-60 max-w-xs cursor-pointer select-none items-center rounded-md border px-16 py-4`}
                    //     key={address._id}
                    //     value={address._id}
                    //     checked={address._id === activeAddress}
                    // >
                    //     <View>
                    //         <View>{address.street}</View>
                    //         <View>
                    //             {address.city}, {address.state}
                    //         </View>
                    //         <View>{address.zipcode}</View>
                    //         <View>{address.country}</View>
                    //     </View>
                    //     <CheckIcon className="absolute right-0 top-0 m-4  h-6 w-6 ui-checked:block ui-not-checked:hidden" />
                    // </RadioGroup.Option>
                    <Text>{address.street}</Text>
                ))}
            {/* </RadioGroup> */}
        </View>
    )
}

export default Address