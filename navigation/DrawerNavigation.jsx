import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    createDrawerNavigator,
} from '@react-navigation/drawer'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Cart from '../screens/Cart'
import Home from '../screens/Home'
import Ionicons from '@expo/vector-icons/Ionicons'
import Signin from '../screens/Signin'
import Signout from '../components/Signout'
import Signup from '../screens/Signup'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import randomstring from 'randomstring'
import { useFocusEffect } from '@react-navigation/native'
import userActions from '../store/users/actions'

const { signInToken, signout } = userActions

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const DrawerNavigation = ({ navigation }) => {
    const [isLogged, setIsLogged] = useState(false)
    const storeUser = useSelector((store) => store.user)
    const dispatch = useDispatch()

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
                    let generateToken = randomstring.generate(24)
                    await AsyncStorage.setItem('guestToken', generateToken)
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
            await AsyncStorage.removeItem('token')
            alert('Sesión cerrada satisfactoriamente')
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
                        onPress={handleSignout}
                    />
                ) : null}
            </DrawerContentScrollView>
        )
    }

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerRight: () => (
                    <Ionicons
                        name="cart-outline"
                        size={30}
                        color="#E0003F"
                        style={{ marginRight: 10 }}
                        onPress={() => navigation.navigate('Cart')}
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
            <Drawer.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            {isLogged ? null : (
                <>
                    <Drawer.Screen name="Crear Cuenta" component={Signup} />
                    <Drawer.Screen name="Iniciar Sesión" component={Signin} />
                </>
            )}
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
