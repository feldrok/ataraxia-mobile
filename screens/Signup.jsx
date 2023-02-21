import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import { useEffect } from 'react'
import userActions from '../store/users/actions'

const { addUser } = userActions

const Signup = ({ navigation }) => {
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [dni, setDni] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const storeUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSignUp = async (e) => {
        let data = {
            name: name,
            lastName: lastName,
            dni: dni,
            mail: email,
            password: password,
        }
        dispatch(addUser(data))
    }

    useEffect(() => {
        if (storeUser.message === 'Usuario creado con éxito') {
            alert(storeUser.message)
        }
    }, [storeUser.message])

    return (
        <View className="container flex-1 justify-center items-center bg-grey">
            <View className="title-container flex flex-col items-center mb-10">
                <Text className="text-2xl font-medium text-primary-500">
                    Registrate
                </Text>
            </View>
            <View className="formContainer flex items-center">
                <TextInput
                    className="mb-4 flex flex-col items-center justify-center rounded-sm border p-2 no-underline shadow-sm w-72"
                    placeholder="Nombre"
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    className="mb-4 flex flex-col items-center justify-center rounded-sm border p-2 no-underline shadow-sm w-72"
                    placeholder="Apellido"
                    onChangeText={(text) => setLastName(text)}
                />
                <TextInput
                    className="mb-4 flex flex-col items-center justify-center rounded-sm border p-2 no-underline shadow-sm w-72"
                    placeholder="Número de DNI"
                    onChangeText={(text) => setDni(text)}
                />
                <TextInput
                    className="mb-4 flex flex-col items-center justify-center rounded-sm border p-2 no-underline shadow-sm w-72"
                    placeholder="Email"
                    autoComplete="email"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    className="mb-4 flex flex-col items-center justify-center rounded-sm border p-2 no-underline shadow-sm w-72"
                    placeholder="Contraseña (8 caracteres mínimo)"
                    autoComplete="password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    onPress={handleSignUp}
                    className="flex w-72 cursor-pointer justify-center rounded-sm border-none bg-primary-300 p-3"
                >
                    <Text className="text-lg font-bold text-center text-white">
                        Crear cuenta
                    </Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center justify-center m-4">
                    <Text>Ya tienes una cuenta? </Text>
                    <TouchableOpacity>
                        <Text className="text-primary-500 font-bold">
                            Inicia sesión!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Signup
