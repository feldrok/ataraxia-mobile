import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import userActions from '../store/users/actions'

const { verifyUser } = userActions

const VerifyAccount = () => {
    const userStore = useSelector((state) => state.user)
    console.log(userStore)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(verifyUser({ user_id: userStore.user._id , verify_code: userStore.user.verify_code }))
    }, [userStore])
    return (
        <View className="background-container h-screen w-screen">
            <View className="verify-div flex h-full w-full items-center justify-center gap-4 bg-transparent">
                <View className="verify-div2 flex flex-col items-center">
                    <Text className="verify-message m-0 bg-transparent text-white">
                        Tu cuenta fue verificada!
                    </Text>
                    <TouchableOpacity
                        className="verify-redirect cursor-pointer border-0 bg-transparent font-bold text-white"
                        to="/" >
                        <Text>
                        Iniciá sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default VerifyAccount