import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import NumericInput from 'react-native-numeric-input'
import React from 'react'

const ProductCard = ({
    name,
    image,
    price,
    abv,
    ibu,
    category,
    ml,
    packSize,
    stock,
}) => {
    const [quantity, setQuantity] = React.useState(1)

    let bgColor
    let bgHoverColor
    let textColor
    if (name === 'Scottish Ale') {
        bgColor = 'bg-primary-500'
        bgHoverColor = 'hover:bg-primary-300'
        textColor = 'text-primary-500'
    } else if (name === 'IPA') {
        bgColor = 'bg-secondary-500'
        bgHoverColor = 'hover:bg-secondary-300'
        textColor = 'text-secondary-500'
    } else if (name === 'Stout') {
        bgColor = 'bg-tertiary-500'
        bgHoverColor = 'hover:bg-tertiary-300'
        textColor = 'text-tertiary-500'
    } else if (name === 'Blonde Ale') {
        bgColor = 'bg-quaternary-500'
        bgHoverColor = 'hover:bg-quaternary-300'
        textColor = 'text-quaternary-500'
    }

    const renderDetails = (category) => {
        if (category === 'cervezas') {
            return (
                <>
                    <View className="p-2">
                        <Text className={`text-2xl font-bold ${textColor}`}>
                            {name}
                        </Text>
                        <View className="flex justify-between">
                            <Text className="text-gray-500">IBU {ibu}</Text>
                            <Text className="text-gray-500">ABV {abv}%</Text>
                        </View>
                        <Text className="text-gray-600 font-medium text-xl">
                            ${price}
                        </Text>
                    </View>
                    <View
                        className={`flex flex-1 ${bgColor} ${bgHoverColor} duration-300 p-2 cursor-pointer rounded-sm items-center justify-center`}
                    >
                        <NumericInput
                            onChange={(quantity) => setQuantity(quantity)}
                            value={quantity}
                            iconSize={5}
                            rounded
                            totalHeight={45}
                            minValue={1}
                            maxValue={stock}
                            step={1}
                            valueType="integer"
                            textColor="white"
                        />
                        <TouchableOpacity className="w-full h-fullflex flex-1 items-center justify-center p-4 mt-2">
                            <Text className="text-white font-bold">
                                Agregar al carro
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        } else if (category === 'packs') {
            return (
                <>
                    <View className="p-2">
                        <Text className={`text-2xl font-bold text-gray-700`}>
                            {name}
                        </Text>
                        <View className="flex flex-1 justify-between text-gray-500">
                            <Text>{packSize} unidades</Text>
                            <Text>{ml}ml c/botella</Text>
                        </View>
                        <Text className="text-gray-600 font-medium text-xl">
                            ${price}
                        </Text>
                    </View>
                    <View
                        className={`flex bg-gray-700 hover:bg-gray-500 duration-300 p-2 cursor-pointer rounded-sm items-center justify-center`}
                    >
                        <NumericInput
                            onChange={(quantity) => setQuantity(quantity)}
                            value={quantity}
                            iconSize={5}
                            rounded
                            totalHeight={45}
                            minValue={1}
                            maxValue={stock}
                            step={1}
                            valueType="integer"
                            textColor="white"
                        />
                        <TouchableOpacity className="w-full h-fullflex flex-1 items-center justify-center p-4 mt-2">
                            <Text className="text-white font-bold">
                                Agregar al carro
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        } else if (category === 'merch') {
            return (
                <>
                    <View className="p-2">
                        <Text className={`text-2xl font-bold text-gray-700`}>
                            {name}
                        </Text>
                        <Text className="text-gray-600 font-medium text-xl">
                            ${price}
                        </Text>
                    </View>
                    <View
                        className={`flex bg-gray-700 hover:bg-gray-500 duration-300 p-2 cursor-pointer rounded-sm items-center justify-center`}
                    >
                        <NumericInput
                            onChange={(quantity) => setQuantity(quantity)}
                            value={quantity}
                            iconSize={5}
                            rounded
                            totalHeight={45}
                            minValue={1}
                            maxValue={stock}
                            textColor="white"
                        />
                        <TouchableOpacity className="w-full h-fullflex flex-1 items-center justify-center p-4 mt-2">
                            <Text className="text-white font-bold">
                                Agregar al carro
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
    }

    if (image.length > 0) {
        image = image[0]
    }

    return (
        <View className="w-64 shadow-md m-2 bg-white">
            <View className="rounded-sm">
                <Image source={{ uri: `${image}` }} className="w-64 h-64" />
            </View>
            {renderDetails(category)}
        </View>
    )
}

export default ProductCard
