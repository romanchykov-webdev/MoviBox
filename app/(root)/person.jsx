import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Platform,
    ScrollView,
    useColorScheme
} from 'react-native';
import {useLocalSearchParams} from "expo-router"
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import GoToBack from "../../components/goToBack";
import {HeartIcon} from "react-native-heroicons/solid";
import {getStyles, theme} from "../../theme";
import {images} from '../../constants'
import MovieList from "../../components/movieList";
import LoadingScreen from "../../components/loading";
import {fetchPersonDetails, fetchPersonInfo, fetchPersonMovies, image342, image500} from "../../api/moviedb";

var {width, height} = Dimensions.get("window");
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? "" : "my-3"

const Person = () => {

    // loading
    const [loading, setLoading] = useState(false)
    // loading


    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme

    // Декодируем переданные данные

    const {movieData} = useLocalSearchParams();  // Используем useLocalSearchParams
    const personId = movieData ? JSON.parse(movieData) : {};
    // console.log('person', personId)

    const [isFavorite, setIsFavorite] = useState(false)

    const [personInfo, setPersonInfo] = useState([])

    const [personaMovies, setPersonaMovies] = useState([])

    useEffect(() => {
        setLoading(true)
        getPersonDetails(personId)
        getPersonMovies(personId)

    },[])

    // get Person Details
    const getPersonDetails=async id=>{
        const data=await fetchPersonDetails(id)
        // console.log('personInfo',JSON.stringify(data,null, 2))
        if(data) setPersonInfo(data)
        setTimeout(()=>{
            setLoading(false)

        },1000)
    }

    // get Person Movies
    const getPersonMovies=async id=>{
        const data=await fetchPersonMovies(id)
        // console.log('getPersonMovies', JSON.stringify(data.cast, null, 2)); // Форматированный вывод JSON
        if(data && data.cast) setPersonaMovies(data.cast)
    }



    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 "
            style={themeStyles.bgColorTheme}
        >
            <SafeAreaView
                className={` z-20 w-full  ${verticalMargin}`}>
                <View className="w-full px-4 flex-row justify-between items-center mt-5">
                    <GoToBack/>

                    <TouchableOpacity
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <HeartIcon size="35" color={isFavorite ? "red" : "white"}/>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>

            {
                loading
                    ? (<LoadingScreen/>)
                    : (
                        <View>
                            {/*  personal details  */}
                            <View className="flex-row justify-center"
                                  style={{
                                      shadowColor: "gray",
                                      shadowRadius: 40,
                                      shadowOffset: {width: 0, height: 5},
                                      shadowOpacity: 1,

                                  }}
                            >
                                <View
                                    className="items-center w-72 h-72 rounded-full overflow-hidden border-2 border-neutral-500">
                                    <Image
                                        source={personInfo?.profile_path ?{uri:image342(personInfo?.profile_path)} : images.siluet}
                                        style={{height: height * 0.43, width: width * 0.74,}}
                                        resizeMode="cover"
                                    />

                                </View>
                            </View>
                            {/*name person and from*/}
                            <View className="mt-6">
                                <Text className="text-3xl font-bold text-center flex-wrap"
                                      style={themeStyles.textColorTheme}
                                >
                                    {personInfo?.name}
                                </Text>
                                <Text className="text-base text-neutral-500 text-center">
                                    {personInfo?.place_of_birth}
                                </Text>
                            </View>

                            {/*    gender */}
                            <View
                                className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full overflow-hidden">
                                {/* Gender */}
                                <View className="border-r-2 border-neutral-400 px-2 items-center">
                                    <Text className="text-white text-sm">Gender</Text>
                                    <Text className="text-neutral-300 text-sm">{personInfo?.gender===2 ? "Male" : "Female"}</Text>
                                </View>

                                {/* Birthday */}
                                <View className="border-r-2 border-neutral-400 px-2 items-center">
                                    <Text className="text-white text-sm">Birthday</Text>
                                    <Text className="text-neutral-300 text-sm">{personInfo?.birthday}</Text>
                                </View>

                                {/* Known for */}
                                <View className="border-r-2 border-neutral-400 px-2 items-center">
                                    <Text className="text-white text-sm">Known for</Text>
                                    <Text className="text-neutral-300 text-sm">{personInfo?.known_for_department}</Text>
                                </View>

                                {/* Popularity */}
                                <View className=" px-2 items-center">
                                    <Text className="text-white text-sm ">Popularity</Text>
                                    <Text className="text-neutral-300 text-sm">
                                        {personInfo?.popularity?.toFixed(1)} %
                                    </Text>
                                </View>
                            </View>

                            {/*  biography   */}
                            <View className="my-6 mx-4 space-y-2">
                                <Text className="text-white text-lg">
                                    Biography
                                </Text>
                                <Text className="text-neutral-400 tracking-wide">
                                    {personInfo?.biography || 'N/A'}
                                </Text>

                            </View>

                            {/*  movies personal  */}
                            <MovieList data={personaMovies} title="Movies" hiddenSeeAll={true}/>
                        </View>
                    )
            }


        </ScrollView>
    );
};


export default Person;
