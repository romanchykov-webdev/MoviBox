import {useState} from "react";
// import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import * as Animatable from "react-native-animatable";
import {
    FlatList,
    Text,
    Image,
    TouchableOpacity, View, RefreshControl, useColorScheme, SafeAreaView, ScrollView,
} from "react-native";
import {images} from "../constants"
import {router} from "expo-router";
import {getStyles} from "../theme";
import {image500} from "../api/moviedb";
import {boxShadow} from "nativewind/dist/tailwind/native/box-shadow";


const zoomIn = {
    0: {
        scale: 0.9,

    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,

    },
};

const MovieCard = ({activeItem, item}) => {


    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme

    // console.log('item.poster_path:',item.poster_path)
    // https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg


    const handlerClick = (item) => {
        router.push({
            pathname: '/(root)/movieScreen',
            params: {movieData: JSON.stringify(item)}  // Конвертируем объект в строку для передачи
        });
    }





    return (


        <Animatable.View
            className="mr-5"
            animation={activeItem === item.id ? zoomIn : zoomOut}
            duration={500}
            style={{
                shadowColor: themeStyles.shadowColor.color,
                shadowOffset: activeItem===item.id ?{ width: 10, height: 10 } :{ width: 5, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
                transition: 'shadowOffset 0.5s ease',  // For smoother transition
            }}
        >
            <TouchableOpacity

                className="relative flex justify-center items-center w-52 h-72 rounded-2xl mb-8

                    {/*border-2*/}
                    {/*border-red-500*/}
                    "
                activeOpacity={0.7}
                onPress={() => handlerClick(item.id)}

            >
                <View

                    className="relative items-center rounded-2xl
                {/*overflow-hidden*/}
                ">
                    <Image
                        // source={images.thumbnail}
                        source={item?.poster_path ? {uri: image500(item?.poster_path)} : images.fallbackMoviePoster}
                        resizeMode="cover"
                        className="w-52 h-72 rounded-2xl"
                    />
                    <Text className="absolute bottom-[-10px]  w-full text-center text-md font-semibold  "
                          style={{
                              color:themeStyles.textColorTheme.color,
                              textShadowColor: themeStyles.shadowColor.color,
                              textShadowOffset: {width: 1, height: 1},
                              textShadowRadius: 1,}}
                    >
                        {
                            item?.title?.length > 18 ? item?.title?.slice(0, 18) + "..." : item?.title
                        }
                    </Text>

                </View>

            </TouchableOpacity>

        </Animatable.View>
    );
};

const TrendingMovie = ({data}) => {

    // console.log('data',data)
    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme

    const [activeItem, setActiveItem] = useState(data.length / 2);

    const viewableItemsChanged = ({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <>
            <Text
                className="text-xl mb-5 mx-3"
                style={themeStyles.textColorTheme}
            >Trending
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {/*{*/}
                {/*    data.length > 0 && data.map((item, index) => (*/}
                {/*        <MovieCard key={item.id} activeItem={activeItem} item={item}/>*/}
                {/*    ))*/}
                {/*}*/}

            </ScrollView>

            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => item.id}
                // keyExtractor={(item) => item.id.toString()} // Преобразуем id в строку
                renderItem={({item}) => (
                    <MovieCard activeItem={activeItem} item={item}/>
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70,
                }}
                contentOffset={{x: 170}}


            />
        </>
    );
};

export default TrendingMovie;