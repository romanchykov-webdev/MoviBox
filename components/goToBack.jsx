import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {router} from "expo-router"
import {getStyles, styles} from "../theme";
import {ChevronLeftIcon} from "react-native-heroicons/outline";

const GoToBack = () => {

    // theme
    const colorScheme = useColorScheme();  // Получаем текущую тему (light или dark)
    const themeStyles = getStyles(colorScheme);  // Получаем стили на основе темы
    // theme

  return (
      <TouchableOpacity
          onPress={() => router.back()}  // Возврат на предыдущий экран
          style={themeStyles.backgroundAccent}
          className="rounded-xl p-1 "
      >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
      </TouchableOpacity>
  );
};


export default GoToBack;
