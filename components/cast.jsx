import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, useColorScheme} from 'react-native';
import {images} from '../constants'
import {router} from "expo-router"
import {getStyles} from "../theme";
import {image185} from "../api/moviedb";

const Cast = ({cast,movie}) => {

    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы

    // theme
    // console.log('cast',cast)
    // const personName = "Keanu Reeves"
    // const characterName = "John Wick"

    const handleClick=(person)=>{
        router.push({
            pathname:"/(root)/person",
            params:{ movieData: JSON.stringify(person) }  // Конвертируем объект в строку для передачи
        })
    }


    return (
        <View className="my-6 mx-4">
            <Text className=" text-lg mb-5"
                  style={themeStyles.textColorTheme}
            >Top Cast</Text>
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
                                onPress={()=>handleClick(person.id)}
                            >
                                <Text className=" text-xs mt-1"
                                      style={themeStyles.textColorTheme}
                                >
                                    {
                                        person?.original_name?.length > 10 ? person?.original_name?.slice(0, 10) + '...' : person?.original_name
                                    }
                                </Text>
                                <View className="overflow-hidden rounded-full w-20 h-20 items-center border border-neutral-500">
                                    <Image
                                        // source={images.thumbnail}
                                        source={person?.profile_path ? {uri:image185(person?.profile_path)} : images.siluet}
                                        className="w-20 h-24 rounded-2xl"
                                        resizeMode="cover"
                                    />
                                </View>


                                <Text className="text-neutral-400 text-xs mt-1">
                                    {
                                        person?.character?.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character
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
