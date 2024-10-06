import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

const MovieCard = ({item}) => {
  return (
    <View >
      <TouchableWithoutFeedback>
          <Text className="text-white">Movies</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};


export default MovieCard;
