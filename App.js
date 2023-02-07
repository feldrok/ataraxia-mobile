import 'react-native-gesture-handler';

import DrawerNavigation from './navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
    return (
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    )
}
