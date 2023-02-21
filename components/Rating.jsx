import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import StarRating from 'react-native-star-rating-widget'
import ratingActions from '../store/ratings/actions'

const { createRating, getProductRating, getUserRating } = ratingActions

export default function Rating () {
    const [rating, setRating] = useState(0)
    const ratingStore = useSelector((store) => store.ratings)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (ratingStore.message !== 'Rating encontrado') {
            dispatch(getProductRating(id))
        }
        if (ratingStore.message === 'Rating encontrado') {
            setRating(ratingStore.productRating?.response)
        }
    }, [ratingStore])

    const handleChange = (selectedValue) => {
        try {
            dispatch(createRating({ product_id: id, rating: selectedValue }))
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(getProductRating(id))
        }
    }

    /*   return (
        <StarRating
            rating={rating}
            onChange={setRating}
        />
  ); */
    return (
        <View className="flex gap-4 items-center">
            <StarRating rating={Math.floor(rating)} onChange={handleChange} />
            <Text>{`(${rating})`}</Text>
        </View>
    )
}
