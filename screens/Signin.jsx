import React, { useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import userActions from '../store/users/actions'

const { signIn, signInToken } = userActions

const Signin = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const storeUser = useSelector((state) => state.user)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleSignIn = async (e) => {
        let data = {
            mail: email,
            password: password,
        }
        let response = await dispatch(signIn(data))
        await AsyncStorage.setItem(
            'token',
            response.payload?.user?.response?.token
        )
    }

    useEffect(() => {
        if (storeUser.message === 'Logueado con éxito') {
            navigation.navigate('Inicio')
        }
    }, [storeUser.message])

    return (
        <View className="flex-1 justify-center items-center">
            <View className="flex flex-col items-center mb-10">
                <Text className="text-2xl font-medium text-primary-500">
                    Iniciar Sesión
                </Text>
            </View>
            <View className="flex items-center">
                <TextInput
                    className="mb-4 flex flex-col items-center justify-center rounded-sm border p-2 no-underline shadow-sm w-72"
                    placeholder="Email"
                    autoComplete="email"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    className="mb-4 flex flex-col items-center justify-center rounded-sm border p-2 no-underline shadow-sm w-72"
                    placeholder="Password"
                    autoComplete="password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    onPress={handleSignIn}
                    className="flex w-72 cursor-pointer justify-center rounded-sm border-none bg-primary-300 p-3"
                >
                    <Text className="text-lg font-bold text-center text-white">
                        Iniciar sesión
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center justify-center m-4">
                <Text>Aún no creaste tu cuenta? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Crear Cuenta')}
                >
                    <Text className="text-primary-500 font-bold">
                        Registrate!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signin
