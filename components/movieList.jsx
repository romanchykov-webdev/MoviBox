import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions} from 'react-native';
import {styles} from '../theme';
import {router, useNavigation} from "expo-router";
import {images} from '../constants';


var {width, height} = Dimensions.get('window');

const MovieList = ({title, data, hiddenSeeAll}) => {

    const navigation = useNavigation();

    const handlerClick=(item)=>{
        router.push({
            pathname:"/(root)/movie",
            params:{movieData:JSON.stringify(item)}
        })
    }

    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>

                {
                    !hiddenSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text}>See All</Text>
                        </TouchableOpacity>
                    )
                }


            </View>
            {/*    movies row*/}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlerClick(item)}
                            >
                                <View className="space-t-1 mr-4">
                                    <Image
                                        source={images.thumbnail}
                                        className="rounded-3xl"
                                        style={{width: width * 0.33, height: height * 0.22}}
                                    />

                                    <Text
                                        numberOfLines={1}
                                        className="text-neutral-300 text-center mt-1">
                                        {item.length > 10 ? item.slice(0, 10) + '...' : item}
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};


export default MovieList;
