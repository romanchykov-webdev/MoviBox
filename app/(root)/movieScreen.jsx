import React, {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    useColorScheme
} from 'react-native';
import {getStyles} from '../../theme'
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {LinearGradient} from "expo-linear-gradient"

import {images} from "../../constants"
import Cast from "../../components/cast";
import GoToBack from "../../components/goToBack";
import MovieList from "../../components/movieList";
import LoadingScreen from "../../components/loading";
import {fetchMovieCredits, fetchMovieDetails, fetchMovieSimilar, image500} from "../../api/moviedb";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? "" : "my-5"

const MovieScreen = () => {

    // loading
    const [loading, setLoading] = useState(false)
    // loading

    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // Определение цветов градиента в зависимости от темы
    const gradientColors = colorScheme === 'dark'
        ? ['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']  // Для тёмной темы
        : ['transparent', 'rgba(255,255,255,0.8)', 'rgba(215,212,212,1)'];  // Для светлой темы
    // theme

    //
    const [cast, setCast] = useState([])
    //

    // similar
    const [similarMovies, setSimilarMovies] = useState([])
    // similar

    const [isFavorite, setIsFavorite] = useState(false)
    // Декодируем переданные данные
    const {movieData} = useLocalSearchParams();  // Используем useLocalSearchParams
    const movieId = movieData ? JSON.parse(movieData) : {};
    // console.log('movie movieId', movieId)

    const [movieDetails, setMovieDetails] = useState({})

    const fetchDetailsCreditsSimilar = async () => {
        setLoading(true)

        try {

            const [detailsData, creditsData, similarData] = await Promise.all([
                fetchMovieDetails(movieId),
                fetchMovieCredits(movieId),
                fetchMovieSimilar(movieId),
            ]);

            if (detailsData) setMovieDetails(detailsData);

            if (creditsData && creditsData.cast) setCast(creditsData.cast);

            if (similarData && similarData.results) setSimilarMovies(similarData.results);

            setTimeout(() => {
                setLoading(false)
            }, 1000)

        } catch (error) {
            console.error("Ошибка загрузки данных фильма:", error);
        }

    }

    useEffect(() => {
        fetchDetailsCreditsSimilar()
    }, [movieId])

    // useEffect(() => {
    //
    //     setLoading(true)
    //     getMovieDetails(movieId)
    //     getMovieCredits(movieId)
    //     getSimilarMovies(movieId)
    //
    // }, []);
    //
    // // get details
    // const getMovieDetails = async id => {
    //     const data = await fetchMovieDetails(id)
    //
    //     if (data) setMovieDetails(data)
    //
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 1000)
    //
    // }
    // // get credits
    // const getMovieCredits = async id => {
    //     const data = await fetchMovieCredits(id)
    //     if (data && data.cast) setCast(data.cast)
    // }
    //
    // const getSimilarMovies = async id => {
    //     const data = await fetchMovieSimilar(id)
    //     if (data && data.results) setSimilarMovies(data.results)
    //     // console.log('getSimilarMovies',data)
    // }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
            className={`flex-1 ${ios ? "mb-2" : "mb-5 mt-5"}`}
            style={themeStyles.bgColorTheme}
        >

            {/*back button and movie post*/}
            <View className="w-full">
                <SafeAreaView
                    className={`absolute z-20 w-full  ${topMargin}`}>
                    <View className="w-full px-4 flex-row justify-between items-center mt-5">
                        <GoToBack/>

                        <TouchableOpacity
                            onPress={() => setIsFavorite(!isFavorite)}
                        >
                            <HeartIcon size="35"
                                       color={isFavorite ? themeStyles.backgroundAccent.backgroundColor : "white"}
                            />
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
                {
                    loading
                        ? (<LoadingScreen/>)
                        : (
                            <>
                                {/*    image block*/}
                                <View
                                    // className="border-2 border-red-500"
                                >
                                    <Image
                                        // source={{uri:image500(item.poster_path)}}
                                        source={movieDetails?.poster_path ? {uri: image500(movieDetails?.poster_path)} : images.fallbackMoviePoster}
                                        style={{width, height: height * 0.55}}
                                        // resizeMode="cover"
                                    />
                                    <LinearGradient
                                        colors={gradientColors}
                                        style={{width, height: height * 0.40}}
                                        start={{x: 0.5, y: 0}}
                                        end={{x: 0.5, y: 1}}
                                        className="absolute bottom-0"
                                    />
                                </View>

                                {/* movies details */}
                                <View
                                    style={{marginTop: -(height * 0.09)}}
                                >
                                    <Text className=" text-center text-3xl font-bold tracking-wider mb-5 flex-wrap px-2"
                                          style={themeStyles.textColorTheme}
                                    >
                                        {movieDetails?.original_title}
                                    </Text>
                                </View>

                                {/*  status release runtime  */}
                                <Text className="text-neutral-400 font-semibold text-base text-center">
                                    {movieDetails?.status}{" "} *{" "} {movieDetails?.release_date}{" "} * {" "}{movieDetails?.runtime} min
                                </Text>

                                {/*  genres  */}
                                <View className="flex-row justify-center m-4 space-x-2 flex-wrap">
                                    {
                                        movieDetails?.genres?.map((item, index) => {
                                            let showDot = index + 1 !== movieDetails.genres.length
                                            return (
                                                <Text key={index}
                                                      className="text-neutral-400 font-semibold text-base text-center">
                                                    {item.name} {showDot ? "*" : null}
                                                </Text>
                                            )
                                        })
                                    }
                                </View>

                                {/*  description  */}
                                <Text className="text-neutral-400 mx-4 tracking-wider ">
                                    {movieDetails?.overview}
                                </Text>


                                {/* cast */}
                                {
                                    cast.length > 0 && <Cast cast={cast}/>
                                }


                                {/*  similar movies  */}
                                {
                                    similarMovies.length > 0 &&
                                    <MovieList title="Similar Movies" hiddenSeeAll={true} data={similarMovies}/>
                                }

                            </>
                        )
                }
            </View>

        </ScrollView>
    );
};


export default MovieScreen;
