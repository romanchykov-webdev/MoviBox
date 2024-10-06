import {useState} from "react";

import * as Animatable from "react-native-animatable";
import {
    FlatList,
    Text,
    Image,
    TouchableOpacity, View,
} from "react-native";
import {images} from "../constants"
import {router} from "expo-router";


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


    const handlerClick = (item) => {
        router.push({
            pathname: '/(root)/movie',
            params: { movieData: JSON.stringify(item) }  // Конвертируем объект в строку для передачи
        });
    }

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item ? zoomIn : zoomOut}
            duration={500}
        >
            <TouchableOpacity
                className="relative flex justify-center items-center w-52 h-72 rounded-2xl mb-8
                    {/*border-2*/}
                    {/*border-red-500*/}
                    "
                activeOpacity={0.7}
                onPress={()=>handlerClick(item)}
            >
                <View className="relative items-center rounded-2xl overflow-hidden">
                    <Image
                        source={images.thumbnail}
                        resizeMode="cover"
                        className="w-52 h-72"
                    />
                    <Text className="absolute bottom-0  bg-gray-500 w-full text-center text-2xl text-white">
                        {
                            item.length>8 ? item.slice(0,8)+'...' :item
                        }
                    </Text>

                </View>

            </TouchableOpacity>

        </Animatable.View>
    );
};

const TrendingMovie = ({data}) => {
    const [activeItem, setActiveItem] = useState(data.length / 2);

    const viewableItemsChanged = ({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({item}) => (
                <MovieCard activeItem={activeItem} item={item}/>
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{x: 170}}
        />
    );
};

export default TrendingMovie;