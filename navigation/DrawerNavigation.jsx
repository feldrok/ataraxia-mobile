import 'react-native-get-random-values'

import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    createDrawerNavigator,
} from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AboutUs from '../screens/AboutUs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Cart from '../screens/Cart'
import Checkout from '../screens/Checkout'
import Home from '../screens/Home'
import Ionicons from '@expo/vector-icons/Ionicons'
import Product from '../screens/Product'
import Signin from '../screens/Signin'
import Signup from '../screens/Signup'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import VerifyAccount from '../screens/VerifyUser'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import hex from 'string-hex'
import randomstring from 'randomstring'
import { useNavigation } from '@react-navigation/native'
import userActions from '../store/users/actions'

const { signInToken, signout } = userActions

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const DrawerNavigation = () => {
    const [isLogged, setIsLogged] = useState(false)
    const storeUser = useSelector((store) => store.user)
    const storeCart = useSelector((store) => store.cart)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                dispatch(signInToken({ token: token }))
            }
            if (
                storeUser.isAuthenticated === true ||
                storeUser.message === 'Logueado con éxito'
            ) {
                setIsLogged(true)
            } else {
                setIsLogged(false)
                let guestToken = await AsyncStorage.getItem('guestToken')
                if (!guestToken) {
                    let generateToken = hex(
                        randomstring.generate({ length: 12 })
                    )
                    await AsyncStorage.setItem(
                        'guestToken',
                        generateToken.toString()
                    )
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkToken()
    }, [storeUser.isAuthenticated, storeUser.message])

    const handleSignout = async () => {
        try {
            dispatch(signout())
            console.log('Logged out')
            await AsyncStorage.removeItem('token')
            Toast.show({
                text1: 'Se ha cerrado sesión',
            })
        } catch (error) {
            console.log(error)
        }
    }

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {isLogged ? (
                    <DrawerItem
                        label="Logout"
                        inactiveTintColor="#E0003F"
                        inactiveBackgroundColor="#fff"
                        activeTintColor="#fff"
                        activeBackgroundColor="#E0003F"
                        onPress={() => handleSignout()}
                    />
                ) : null}
            </DrawerContentScrollView>
        )
    }

    const DrawerNav = () => {
        return (
            <Drawer.Navigator
                initialRouteName="Inicio"
                screenOptions={{
                    headerRight: () => (
                        <Ionicons
                            name="cart-outline"
                            size={30}
                            color="#E0003F"
                            style={{ marginRight: 10 }}
                            onPress={() => navigation.navigate('Carro')}
                        />
                    ),
                    drawerType: 'slide',
                    headerTintColor: '#E0003F',
                    drawerActiveBackgroundColor: '#E0003F',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveBackgroundColor: '#fff',
                    drawerInactiveTintColor: '#E0003F',
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Inicio" component={Home} />
                {isLogged ? (
                    <Drawer.Screen name="Sobre Nosotros" component={AboutUs} />
                ) : (
                    <>
                        <Drawer.Screen name="Crear Cuenta" component={Signup} />
                        <Drawer.Screen
                            name="Iniciar Sesión"
                            component={Signin}
                        />
                    </>
                )}
            </Drawer.Navigator>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Drawer"
                component={DrawerNav}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    options={{
                        headerTintColor: '#E0003F',
                    }}
                    name="Carro"
                    component={Cart}
                />
                <Stack.Screen
                    options={{
                        headerTintColor: '#E0003F',
                    }}
                    name="Checkout"
                    component={Checkout}
                />
                <Stack.Screen
                    options={{
                        headerTintColor: '#E0003F',
                        headerRight: () => (
                            <Ionicons
                                name="cart-outline"
                                size={30}
                                color="#E0003F"
                                style={{ marginRight: 10 }}
                                onPress={() => navigation.navigate('Carro')}
                            />
                        ),
                        drawerType: 'slide',
                        headerTintColor: '#E0003F',
                        drawerActiveBackgroundColor: '#E0003F',
                        drawerActiveTintColor: '#fff',
                        drawerInactiveBackgroundColor: '#fff',
                        drawerInactiveTintColor: '#E0003F',
                    }}
                    name="Producto"
                    component={Product}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default DrawerNavigation
