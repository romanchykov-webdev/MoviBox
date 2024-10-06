import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {router} from "expo-router"
import {styles} from "../theme";
import {ChevronLeftIcon} from "react-native-heroicons/outline";

const GoToBack = () => {
  return (
      <TouchableOpacity
          onPress={() => router.back()}  // Возврат на предыдущий экран
          style={styles.background}
          className="rounded-xl p-1 "
      >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
      </TouchableOpacity>
  );
};


export default GoToBack;
