import Home from '../screens/Home'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
