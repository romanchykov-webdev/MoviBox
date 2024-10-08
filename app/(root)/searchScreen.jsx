import React, {useCallback, useState} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    SafeAreaView,
    useColorScheme,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import {getStyles} from '../../theme'

import {router} from 'expo-router'
import {XMarkIcon} from "react-native-heroicons/outline";

import {images} from '../../constants'
import LoadingScreen from "../../components/loading";
import {debounce} from "lodash";
import {image185, searchMovies} from "../../api/moviedb";

const {width, height} = Dimensions.get('window');

const SearchScreen = () => {

    // loading
    const [loading, setLoading] = useState(false)
    // loading

    const nameFilm = "lorem10 text film Name sam text"

    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme

    const [result, setResult] = useState([])
    // const [result, setResult] = useState([])

    // Search
    const handleSearch = (value) => {
        // console.log(value)
        if (value.length > 2) {

            setLoading(true)

            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {

                // console.log("search ", JSON.stringify(data.results, null, 2))

                if (data && data.results) setResult(data.results)

                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }).catch(error => {
                console.error("Error fetching data: ", error);
                setLoading(false);  // Отключаем загрузчик в случае ошибки
            });

        } else {
            setLoading(false)
            setResult([])
        }
    }

    // get search Movies
    // const getSearchMovies=async params=>{
    //     const data=await searchMovies(params)
    //     console.log("getSearchMovies",data)
    //
    //     setLoading(false)
    // }
    // get search Movies


    // debounce
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
    // debounce

    // Search

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView className="flex-1"
                          style={themeStyles.bgColorTheme}
            >
                <View
                    className="mx-4 flex-row justify-between items-center border border-neutral-500 rounded-full mt-5 mb-5">
                    <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder="Search Movie"
                        placeholderTextColor="lightgray"
                        className="px-6  flex-1 text-base font-semibold mb-3
                    tracking-wide
                    items-center justify-center
                    {/*border-2*/}
                    {/*border-red-500*/}
                    "
                        style={themeStyles.textColorTheme}
                    />
                    <TouchableOpacity
                        className="rounded-full p-3 m-1 bg-neutral-500"
                        onPress={() => router.replace('/(root)/home')}
                    >
                        <XMarkIcon size={25} color="white"/>
                    </TouchableOpacity>
                </View>

                {
                    loading
                        ? (<LoadingScreen/>)
                        : (
                            result?.length > 0
                                ? (
                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                        <ScrollView

                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{paddingHorizontal: 15}}
                                            className="space-y-3"
                                        >
                                            <Text className="font-semibold ml-1 mb-5"
                                                  style={themeStyles.textColorTheme}
                                            >
                                                Result ({result.length})
                                            </Text>
                                            <View className="flex-row justify-between flex-wrap ">
                                                {
                                                    result.map((item, index) => (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => router.replace({
                                                                pathname: "/(root)/movie",
                                                                params: {movieData: JSON.stringify(item.id)}
                                                            })}
                                                            className="rounded-xl overflow-hidden"
                                                            style={{
                                                                width: width * 0.44,
                                                                shadowColor: themeStyles.shadowColor,
                                                                shadowOffset: {width: 3, height: 3},
                                                                shadowOpacity: 0.5,
                                                                shadowRadius: 3,
                                                            }}
                                                        >
                                                            <View className="space-y-2 mb-4"

                                                            >
                                                                <Image
                                                                    className="rounded-3xl w-full"
                                                                    // source={images.thumbnail}
                                                                    source={item?.poster_path ? {uri: image185(item?.poster_path)} : images.fallbackMoviePoster}
                                                                    style={{height: height * 0.3}}
                                                                    resizeMode="cover"
                                                                />
                                                                <Text

                                                                    className="font-semibold ml-1 mb-5 text-center "
                                                                    style={themeStyles.textColorTheme}
                                                                >
                                                                    {
                                                                        item?.original_title.length > 15 ? item?.original_title.slice(0, 15) + '...' : item?.original_title
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ))
                                                }
                                            </View>
                                        </ScrollView>
                                    </TouchableWithoutFeedback>
                                )
                                : (
                                    <View
                                        className=" justify-center items-center"
                                    >
                                        <Image
                                            source={images.noResult}
                                            style={{width: width * 0.9, height: height * 0.44}}
                                            resizeMode="contain"
                                        />
                                    </View>
                                )
                        )
                }

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};


export default SearchScreen;
