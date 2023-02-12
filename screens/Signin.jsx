import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import userActions from "../store/users/actions"

const { signIn, signInToken } = userActions

const Signin = ({ navigation }) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const userStore = useSelector((state) => state.user)
    console.log(userStore)
    const dispatch = useDispatch()

    const handleSignIn = async (e) => {
        let data = {
            mail: email,
            password: password,
        }
        let token = userStore.user?.response?.token
        let loggedUser = userStore.user?.response?.user
        dispatch(signIn(data))
        if (userStore.user?.success === true) {
            alert(userStore.message)
            AsyncStorage.setItem("token", token)
            AsyncStorage.setItem("user", JSON.stringify(loggedUser))
            navigation.navigate("Home")
        } else if (userStore.user === null) {
            alert(userStore.message)
        }
    }


    return (
        <View className="flex-1 justify-center items-center bg-grey">
            <View className="flex flex-col items-center mb-10">
                <Text className="text-5xl font-medium text-black">Ataraxia</Text>
                <Text className="subtitle text-lg">Iniciar Sesión</Text>
            </View>
            <View className="formContainer flex items-center">
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
                    onPress={handleSignIn}
                    className="button bg-quaternary-500 border-[2px] p-3 m-4 w-36 flex items-center rounded-full"
                >
                    <Text className="p-0 text-sm">Sign in</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center justify-center m-4">
                <Text>Aun no tenés tu cuenta?</Text>
                <TouchableOpacity>
                    <Text className="text-quaternary-500 font-bold"> Creala!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signin

const styles = StyleSheet.create({
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
        color: "#4338CA",
    },
    subtitle: {
        fontSize: 20,
    },
    formContainer: {
        display: "flex",
    },
    textInput: {
        backgroundColor: "white",
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 300,
    },
    button: {
        backgroundColor: "#4338CA",
        borderRadius: 10,
        padding: 15,
        margin: 10,
        width: 300,
    },
    buttonText: {
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
        color: "#4338CA",
        fontWeight: "bold",
    },
})