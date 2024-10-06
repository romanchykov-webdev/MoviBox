import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {images} from '../constants'
import {router} from "expo-router"

const Cast = ({cast,movie}) => {

    const personName = "Keanu Revs"
    const characterName = "John Wick"

    const handleClick=(personName)=>{
        router.push({
            pathname:"/(root)/person",
            params:{ movieData: JSON.stringify(personName) }  // Конвертируем объект в строку для передачи
        })
    }


    return (
        <View className="my-6 mx-4">
            <Text className="text-white text-lg mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mr-4 items-center"
                                onPress={()=>handleClick(personName)}
                            >
                                <Text className="text-white text-xs mt-1">
                                    {
                                        personName.length > 10 ? personName.slice(0, 10) + '...' : personName
                                    }
                                </Text>
                                <View className="overflow-hidden rounded-full w-20 h-20 items-center border border-neutral-500">
                                    <Image
                                        source={images.thumbnail}
                                        className="w-20 h-24 rounded-2xl"
                                        resizeMode="cover"
                                    />
                                </View>


                                <Text className="text-neutral-400 text-xs mt-1">
                                    {
                                        characterName.length > 10 ? characterName.slice(0, 10) + '...' : characterName
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};


export default Cast;
