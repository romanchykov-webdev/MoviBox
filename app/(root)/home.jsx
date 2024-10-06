import {View, Text, SafeAreaView, Platform, ScrollView, FlatList, TouchableOpacity, Image} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {styles} from "../../theme"
import TrendingMovies from "../../components/trendingMovies";
import {useState} from "react";
import MovieList from "../../components/movieList";
import {images} from "../../constants";

const ios = Platform.OS === 'ios';

const Home = () => {

    const [trending, setTrending] = useState([1, 2, 3, 4, 5, 6]);
    const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6]);
    const [topRated, setTopRated] = useState([1, 2, 3, 4, 5, 6]);

    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light"/>
                {/*search bar and logo*/}
                <View className="flex-row justify-between items-center mx-4 mt-5 mb-8">
                    <Bars3CenterLeftIcon size={30} color="white" strokeWidth={2}/>
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>
                        Box
                    </Text>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color="white"/>
                </View>
            </SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                {/*    Trending movies carousel*/}
                <TrendingMovies data={trending}/>

                {/*    upcoming movies row*/}
                <MovieList title="Upcoming" data={upcoming}/>

                {/*    top rated movies row*/}
                <MovieList title="Top Rated" data={topRated}/>


            </ScrollView>
        </View>
    )
}
export default Home;