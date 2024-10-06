import React, {useState} from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {styles, theme} from '../../theme'
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {LinearGradient} from "expo-linear-gradient"

import {images} from "../../constants"
import Cast from "../../components/cast";
import GoToBack from "../../components/goToBack";
import MovieList from "../../components/movieList";

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : "mt-3"

const MovieScreen = () => {
    //
    const [cast, setCast] = useState([1,2,3,4,5])
    //

    // similar
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5])
    // similar

    const [isFavorite, setIsFavorite] = useState(false)
    // Декодируем переданные данные
    const {movieData} = useLocalSearchParams();  // Используем useLocalSearchParams
    const movie = movieData ? JSON.parse(movieData) : {};

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neutral-900"
        >
            {/*    back button and movie post*/}
            <View className="w-full">
                <SafeAreaView
                    className={`absolute z-20 w-full  ${topMargin}`}>
                    <View className="w-full px-4 flex-row justify-between items-center mt-5">
                     <GoToBack/>

                        <TouchableOpacity
                            onPress={() => setIsFavorite(!isFavorite)}
                        >
                            <HeartIcon size="35" color={isFavorite ? theme.background : "white"}/>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
                {/*    image block*/}
                <View
                    // className="border-2 border-red-500"
                >
                    <Image
                        source={images.thumbnail}
                        style={{width, height: height * 0.55}}
                        // resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{width, height: height * 0.40}}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        className="absolute bottom-0"
                    />
                </View>

                {/* movies details */}
                <View
                    style={{marginTop:-(height*0.09)}}
                >
                    <Text className="text-white text-center text-3xl font-bold tracking-wider mb-5">
                        {movie}
                    </Text>
                </View>

                {/*  status release runtime  */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Release - 2020 - 170 min
                </Text>

                {/*  genres  */}
                <View className="flex-row justify-center m-4 space-x-2">
                    <Text className="text-neutral-400 font-semibold text-base text-center">Action *</Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">Thrill *</Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">Comedy</Text>
                </View>

            {/*  description  */}
                <Text className="text-neutral-400 mx-4 tracking-wider ">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nam, nobis. Animi, aspernatur cum dolor dolorum est excepturi expedita nobis quae ratione. Ab assumenda cum eaque earum eveniet expedita facere, harum id impedit labore maxime minus, nihil nobis pariatur possimus quo repellat reprehenderit sed suscipit tempora temporibus ullam ut vel.
                </Text>
            </View>

            {/* cast */}
            <Cast cast={cast} movie={movie}/>

        {/*  similar movies  */}
            <MovieList title="Similar Movies" hiddenSeeAll={true} data={similarMovies} />
        </ScrollView>
    );
};


export default MovieScreen;
