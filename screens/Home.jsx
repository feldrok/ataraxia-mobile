import { Button, FlatList, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from '../components/ProductCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Slider from '../components/Slider'
import categoryActions from '../store/categories/actions'
import productActions from '../store/products/actions'

const { getProducts } = productActions
const { getCategories } = categoryActions

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const storeProducts = useSelector((state) => state.products)
    const storeCategories = useSelector((state) => state.categories)

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [])

    const filteredProducts = (category) => {
        return storeProducts.products.response
            ?.filter((product) => product.category_id._id === category)
            .slice(0, 4)
    }

    return (
        <ScrollView className="flex-1">
            <Slider />
            <SafeAreaView>
                {storeCategories.categories?.response?.map((category) => (
                    <View
                        className="flex flex-col justify-center items-center"
                        key={category.name}
                    >
                        <Text className="p-4 text-2xl font-bold text-tertiary-500">
                            {category.name.toUpperCase()}
                        </Text>
                        <FlatList
                            data={filteredProducts(category._id)}
                            nestedScrollEnabled={true}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="flex-1 flex mt-2"
                            keyExtractor={(product) => product.name}
                            renderItem={(product) => (
                                <ProductCard
                                    product={product}
                                    category={category.name}
                                />
                            )}
                        />
                    </View>
                ))}
            </SafeAreaView>
        </ScrollView>
    )
}

export default Home
