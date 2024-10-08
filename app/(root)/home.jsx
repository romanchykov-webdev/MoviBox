import {
    View,
    Text,
    SafeAreaView,
    Platform,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    RefreshControl,  // Добавляем RefreshControl
    useColorScheme
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {getStyles, styles} from "../../theme";
import TrendingMovies from "../../components/trendingMovies";
import {useState, useEffect} from "react";
import MovieList from "../../components/movieList";
import {images} from "../../constants";
import {router} from "expo-router";
import LoadingScreen from "../../components/loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../../api/moviedb";

const ios = Platform.OS === 'ios';

const Home = () => {

    // loading
    const [loading, setLoading] = useState(true)
    // loading

    // refresh
    const [refreshing, setRefreshing] = useState(false);
    // refresh


    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы

    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        // Перерисовка при смене темы
    }, [colorScheme]);


    // get trending movies ,upcoming topRated

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const [trendingData, upcomingData, topRatedData] = await Promise.all([
                fetchTrendingMovies(),
                fetchUpcomingMovies(),
                fetchTopRatedMovies(),
            ]);

            if (trendingData && trendingData.results) setTrending(trendingData.results);
            if (upcomingData && upcomingData.results) setUpcoming(upcomingData.results);
            if (topRatedData && topRatedData.results) setTopRated(topRatedData.results);

            // Задержка перед отключением загрузки
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Ошибка загрузки фильмов:", error);
            setLoading(false); // Отключаем загрузку в случае ошибки
        }
    };

    useEffect(() => {
        fetchMovies();  // Загружаем фильмы при монтировании компонента
    }, []);




    // useEffect(() => {
    //     getTrendingMovies()
    //     getUpcomingMovies()
    //     getTopRatedMovies()
    //
    // }, [])

    // const getTrendingMovies = async () => {
    //     const data = await fetchTrendingMovies();
    //     // console.log('got trending movies', data);
    //
    //     // if (data && data.results) setTrending(data.results);
    //     if (data && data.results) setTrending(data.results);
    //     // console.log('data.result', data.results)
    //
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 1000)
    //
    // }
    //
    // const getUpcomingMovies = async () => {
    //     const data = await fetchUpcomingMovies();
    //     // console.log('got trending movies', data);
    //
    //     // if (data && data.results) setTrending(data.results);
    //     if (data && data.results) setUpcoming(data.results);
    //     // console.log('data.result', data.results)
    //     //
    //     // setTimeout(()=>{
    //     //     setLoading(false)
    //     // },1000)
    //
    // }
    //
    // const getTopRatedMovies = async () => {
    //     const data = await fetchTopRatedMovies();
    //     // console.log('got trending movies', data);
    //
    //     // if (data && data.results) setTrending(data.results);
    //     if (data && data.results) setTopRated(data.results);
    //     // console.log('data.result', data.results)
    //
    //     // setTimeout(()=>{
    //     //     setLoading(false)
    //     // },1000)
    //
    // }

    // get trending movies ,upcoming topRated

    // refresh
    // const onRefresh = async () => {
    //     // setLoading(true)
    //     setRefreshing(true);
    //     await getTrendingMovies()
    //     await getUpcomingMovies()
    //     await getTopRatedMovies()
    //     setRefreshing(false);
    //     // setTimeout(() => {
    //     //     setLoading(false)
    //     // }, 1000)
    // }

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMovies();  // Используем функцию загрузки
        setRefreshing(false);
    };

    // refresh


    return (
        <View className="flex-1"
              style={{backgroundColor: themeStyles.bgColorTheme.backgroundColor}}
        >
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style={colorScheme === 'dark' ? "light" : "dark"}/>

                {/* search bar and logo */}
                <View className="flex-row justify-between items-center mx-4 mt-5 mb-8">
                    <Bars3CenterLeftIcon size={30} color={themeStyles.textColorTheme.color} strokeWidth={2}/>
                    <Text className="text-white text-3xl font-bold">
                        <Text style={themeStyles.textAccent}>M</Text>
                        <Text style={themeStyles.textColorTheme}>Box</Text>
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/(root)/searchScreen")}
                    >
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={themeStyles.textColorTheme.color}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading
                    ? (
                        <LoadingScreen/>
                    )
                    : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: 10}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing} // Передаем текущее состояние рефреша
                                    onRefresh={onRefresh}    // Указываем функцию для обновления
                                    tintColor={themeStyles.textAccent}  // Устанавливаем цвет для индикатора
                                />
                            }
                        >
                            {/*    Trending movies carousel */}
                            {
                                trending.length > 0 && <TrendingMovies data={trending}/>
                            }


                            {/*    upcoming movies row */}
                            {
                                upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming}/>
                            }


                            {/*    top rated movies row */}
                            {
                                topRated.length > 0 && <MovieList title="Top Rated" data={topRated}/>
                            }

                        </ScrollView>
                    )
            }


        </View>
    );
};

export default Home;
