import Cart from '../screens/Cart'
import Home from '../screens/Home'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const DrawerNavigation = ({ navigation }) => {
    return (
        <Drawer.Navigator
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
        >
            <Drawer.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
