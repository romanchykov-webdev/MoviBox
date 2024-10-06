import React, {useState} from 'react';
import {View, Text,Image, SafeAreaView, TouchableOpacity, Dimensions, Platform, ScrollView} from 'react-native';
import { useLocalSearchParams} from "expo-router"
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import GoToBack from "../../components/goToBack";
import {HeartIcon} from "react-native-heroicons/solid";
import {theme} from "../../theme";
import {images} from '../../constants'

var{width, height} = Dimensions.get("window");
const ios = Platform.OS === 'ios'
const verticalMargin=ios ? "" :"my-3"

const Person = () => {



    // Декодируем переданные данные
    const {movieData} = useLocalSearchParams();  // Используем useLocalSearchParams
    const movie = movieData ? JSON.parse(movieData) : {};
    console.log('movie',movie)
    const [isFavorite, setIsFavorite] = useState(false)

    return (
       <ScrollView
           contentContainerStyle={{paddingBottom: 20}}
           className="flex-1 bg-neutral-900"
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

       {/*  personal datails  */}
           <View>
               <View className="flex-row justify-center">
                   <View className="items-center w-72 h-72 rounded-full overflow-hidden border border-red-500">
                       <Image
                           source={images.thumbnail}
                           style={{height:height*0.43,width:width*0.74,}}
                           // resizeMode="cover"
                       />

                   </View>
               </View>
           </View>

       </ScrollView>
    );
};


export default Person;
