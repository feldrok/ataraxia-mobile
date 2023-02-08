import 'react-native-gesture-handler'

import DrawerNavigation from './navigation/DrawerNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './store/store'

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <DrawerNavigation />
            </NavigationContainer>
        </Provider>
    )
}
