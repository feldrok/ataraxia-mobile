import Home from '../screens/Home'
import React from 'react'
import Signin from "../screens/Signin"
import Signup from "../screens/Signup"
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Crear Cuenta" component={Signup} />
            <Drawer.Screen name="Iniciar Sesión" component={Signin} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
