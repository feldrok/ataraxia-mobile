import { Dimensions, Image, Text, View } from 'react-native'

import Carousel from 'react-native-reanimated-carousel'
import React from 'react'

const images = [
    {
        image: require('../assets/banner1.jpg'),
    },
    {
        image: require('../assets//banner2.jpg'),
    },
    {
        image: require('../assets//banner3.jpg'),
    },
]

const delay = 3000

const Slider = () => {
    const width = Dimensions.get('window').width
    return (
        <View className="flex-1">
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                autoPlayInterval={delay}
                data={images}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                    <Image
                        source={item.image}
                        style={{ width: width, height: width / 2 }}
                    />
                )}
            />
        </View>
    )
}

export default Slider
