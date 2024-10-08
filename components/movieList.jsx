import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    useColorScheme
} from 'react-native';
import {getStyles} from '../theme';
import {router} from "expo-router";
import {images} from '../constants';
import {image185} from "../api/moviedb";


const {width, height} = Dimensions.get('window');

const MovieList = ({title, data, hiddenSeeAll}) => {

    // console.log('movie list data',data)

    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme



    const handlerClick=(item)=>{
        router.push({
            pathname:"/(root)/movieScreen",
            params:{movieData:JSON.stringify(item)}
        })
    }

    // seeAll
    const handleSeeAll=()=>{
        router.push({
            pathname:"/(root)/seeAll",
            params:{movieData:JSON.stringify(title)}
        })
    }
    // seeAll


    return (
        <View className="mb-8 space-y-4 "

        >
            <View className="mx-4 flex-row justify-between items-center">
                <Text className=" text-xl"
                      style={themeStyles.textColorTheme}
                >{title}</Text>

                {
                    !hiddenSeeAll && (
                        <TouchableOpacity
                            onPress={handleSeeAll}
                        >
                            <Text style={themeStyles.textAccent}>See All</Text>
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
                    data?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handlerClick(item.id)}

                            >
                                <View className="space-t-1 mr-4">
                                    <View
                                        style={{
                                            shadowColor: themeStyles.shadowColor.color,
                                            shadowOffset: { width: 3, height: 3 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 3,
                                        }}
                                    >
                                    <Image

                                        source={item?.poster_path ?{uri:image185(item.poster_path)} : images.fallbackMoviePoster}
                                        className="rounded-3xl"
                                        style={{width: width * 0.33, height: height * 0.22}}
                                    />
                                    </View>

                                    <Text
                                        // numberOfLines={1}
                                        className="text-neutral-400 text-center mt-1">
                                        {item?.title?.length > 10 ? item?.title?.slice(0, 10) + '...' : item?.title}

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
