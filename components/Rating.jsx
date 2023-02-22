import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StarRating from 'react-native-star-rating-widget'
import ratingActions from '../store/ratings/actions'

const { createRating, getProductRating, getUserRating } = ratingActions

export default function Rating ({producto}) {
    const [rating, setRating] = React.useState(0)
    const ratingStore = useSelector((store) => store.ratings)
    const storeProduct = useSelector((store) => store.products)
    const dispatch = useDispatch()
    console.log(ratingStore)
    console.log(storeProduct)
    console.log(producto._id)
    
    useEffect(() => {
        dispatch(getProductRating(producto._id))
    }, [])
    
    useEffect(() => {
        if (ratingStore.message !== 'Rating encontrado') {
            dispatch(getProductRating(producto._id))
        }
        if (ratingStore.message === 'Rating encontrado') {
            setRating(ratingStore.productRating?.response)
        }
    }, [ratingStore])


    const handleChange = (selectedValue) => {
        console.log(selectedValue)
        try {
            dispatch(createRating({ product_id: producto._id, rating: selectedValue }))
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(getProductRating(producto._id))
        }
    }

    /*   return (
        <StarRating
            rating={rating}
            onChange={setRating}
        />
  ); */
    return (
        <View className="flex flex-row gap-2 items-center">
            <StarRating enableHalfStar={false} rating={Math.floor(rating)} onChange={handleChange} />
            <Text className="text-lg">{`(${rating})`}</Text>
        </View>
    )
}
