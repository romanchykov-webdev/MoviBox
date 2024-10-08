import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    useColorScheme,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform
} from 'react-native';
import {getStyles} from "../../theme";
import {router, useLocalSearchParams} from "expo-router";
import GoToBack from "../../components/goToBack";
import {HeartIcon} from "react-native-heroicons/solid";
import Loading from "../../components/loading";
import {fetchTopRatedMovies, fetchUpcomingMovies, image500} from "../../api/moviedb";

import {images} from "../../constants"

const {width, height} = Dimensions.get("window");
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? "" : "my-3"

const SeeAll = () => {
    const [loading, setLoading] = useState(false)

    const [seeAllData, setSeeAllData] = useState([])

    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme

    // Декодируем переданные данные
    const {movieData} = useLocalSearchParams();  // Используем useLocalSearchParams
    const querySeeAll = movieData ? JSON.parse(movieData) : {};

    console.log("seeAll query", querySeeAll)

    // fetch

    useEffect(() => {

        fetchMovies()

    }, [])

    const fetchMovies = async () => {
        setLoading(true);
        try {

            if (querySeeAll === "Upcoming") {
                const [upcomingData] = await Promise.all([
                    fetchUpcomingMovies(),
                ])
                if (upcomingData && upcomingData.results) setSeeAllData(upcomingData.results)
                console.log("upcomingData", JSON.stringify(upcomingData.results, null, 2))

            }
            if (querySeeAll === "Top Rated") {
                const [topRatedData] = await Promise.all([
                    fetchTopRatedMovies(),
                ])
                if (topRatedData && topRatedData.results) setSeeAllData(topRatedData.results)
                console.log("upcomingData", JSON.stringify(topRatedData.results, null, 2))


            }

            setTimeout(() => {
                setLoading(false);
            }, 1000)

        } catch (error) {
            console.error("Ошибка загрузки фильмов:", error);
            setLoading(false); // Отключаем загрузку в случае ошибки
        }

    }
    // fetch

    // onPress
    const handlerMorInfo = (item) => {
        console.log('handlerMorInfo',item)
        router.push({
            pathname:"/(root)/movieScreen",
            params:{movieData:JSON.stringify(item)}
        })
    }
    // onPress


    return (
        <SafeAreaView
            className="flex-1"
            style={themeStyles.bgColorTheme}
        >
            <View
                className={`z-20 w-full ${verticalMargin}`}
            >
                <View className="w-full px-4 flex-row justify-between items-center mt-5">
                    <GoToBack/>
                    <Text
                        className="text-3xl"
                        style={themeStyles.textColorTheme}>
                        {querySeeAll}
                    </Text>
                </View>
            </View>
            {
                loading
                    ? (<Loading/>)
                    : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 16}}
                        >
                            <View
                                className="w-full my-5"
                            >
                                <Text
                                    className="text-sm font-semibold"
                                    style={themeStyles.textColorTheme}
                                >
                                    Result ({seeAllData?.length})
                                </Text>
                            </View>
                            {/*  render components  */}
                            <View
                                className="flex-col items-center"
                            >
                                {
                                    seeAllData?.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={()=>handlerMorInfo(item.id)}
                                            className="
                                            rounded-3xl
                                            {/*border-2*/}
                                            {/*border-red-500*/}
                                            {/*overflow-hidden */}
                                            mb-10 "
                                            style={{
                                                shadowColor: themeStyles.shadowColor,
                                                shadowOffset: {width: 5, height: 5},
                                                shadowOpacity: 0.5,
                                                shadowRadius: 3,
                                            }}

                                        >
                                            <View
                                                className="relative   rounded-3xl
                                                overflow-hidden
                                                "

                                            >


                                                <Image
                                                    source={item?.poster_path ? {uri: image500(item?.poster_path)} : images.fallbackMoviePoster}
                                                    style={{width: width * 0.90, height: height * 0.45}}
                                                />
                                                <View
                                                    className="absolute bottom-0 left-0 p-4  w-full justify-center items-start"
                                                    style={{backgroundColor: "rgba(0,0,0,0.5)",}}
                                                >
                                                    <Text className="text-xl font-semibold"
                                                          style={{
                                                              color: themeStyles.textColorTheme.color,
                                                              shadowColor: themeStyles.shadowColor.color,
                                                              shadowOffset: {width: 3, height: 3},
                                                              shadowOpacity: 0.5,
                                                              shadowRadius: 3,
                                                          }}
                                                    >
                                                        {item?.title}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    )
            }

        </SafeAreaView>
    );
};


export default SeeAll;
