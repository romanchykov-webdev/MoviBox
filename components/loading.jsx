import React from 'react';
import * as Progress from 'react-native-progress';
import {View, Text, Dimensions, useColorScheme} from 'react-native';
import {getStyles} from "../theme";

const { width,height } = Dimensions.get('window');

const LoadingScreen = () => {

    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme


  return (
    <View
        style={{width,height}}
        className="justify-center items-center absolute flex-row"
    >
        <Progress.CircleSnail thickness={12} size={160} color={themeStyles.textAccent.color} />
    </View>
  );
};


export default LoadingScreen;
