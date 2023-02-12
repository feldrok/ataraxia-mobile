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

const { addUser } = userActions

const Signup = ({ navigation }) => {
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [dni, setDni] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const userStore = useSelector((state) => state.user)
    const dispatch = useDispatch()

/*     const handleSignUp = async () => {
        let user = {
            name: name,
            lastName: lastName,
            dni: dni,
            mail: email,
            password: password,
        }
        let response = dispatch(addUser(user))
        let createdUser = response.payload?.response?.user.response
        if (response) {
            alert('Usuario creado!')
        } else {
            alert('Error al crear usuario')
        }
    } */

    const handleSignUp = async (e) => {
        let data = {
            name: name,
            lastName: lastName,
            dni: dni,
            mail: email,
            password: password,
        }
        dispatch(addUser(data))
        console.log(userStore)
        if (userStore.message === 'Usuario creado con éxito') {
            alert("Usuario creado con éxito!")
            navigation.navigate("Home")
        }
        else {
            alert("Error al crear usuario")
        }
    }

    return (
        <View className="container flex-1 justify-center items-center bg-grey">
            <View className="title-container flex flex-col items-center mb-10">
                <Text className="title text-5xl font-medium text-black">
                    Ataraxia
                </Text>
                <Text className="subtitle text-lg">Crea tu usuario</Text>
            </View>
            <View className="formContainer flex items-center">
                <TextInput
                    className="textInput border-black border-2 p-2 m-4 w-72"
                    placeholder="Nombre"
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    className="textInput border-black border-2 p-2 m-4 w-72"
                    placeholder="Apellido"
                    onChangeText={(text) => setLastName(text)}
                />
                <TextInput
                    className="textInput border-black border-2 p-2 m-4 w-72"
                    placeholder="Número de DNI"
                    onChangeText={(text) => setDni(text)}
                />
                <TextInput
                    className="textInput border-black border-2 p-2 m-4 w-72"
                    placeholder="Email"
                    autoComplete="email"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    className="textInput border-black border-2 p-2 m-4 w-72"
                    placeholder="Password"
                    autoComplete="password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    onPress={handleSignUp}
                    className="button bg-quaternary-500 border-[2px] p-3 m-4 w-36 flex items-center rounded-full"
                >
                    <Text className="p-0 text-sm">Sign Up</Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center justify-center m-4">
                    <Text>Ya sos usuario?</Text>
                    <TouchableOpacity>
                        <Text className="text-quaternary-500 font-bold">
                            {' '}
                            Iniciá Sesión!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Signup

/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "medium",
        color: "#1B6FA8",
    },
    subtitle: {
        fontSize: 20,
    },
    formContainer: {
        display: "flex",
    },
    textInput: {
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 300,
    },
    button: {
        borderRadius: 10,
        padding: 15,
        margin: 10,
        width: 300,
    },
    buttonText: {
        backgroundColor: "#4338CA",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    googleButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        borderRadius: 10,
        padding: 15,
        margin: 10,
        width: 300,
    },
    googleButtonText: {
        fontSize: 16,
        color: "rgba(0,0,0,0.4)",
        textAlign: "center",
        fontWeight: "bold",
    },
    footerText: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    signUpText: {
        color: "#1B6FA8",
        fontWeight: "bold",
    },
})
 */
