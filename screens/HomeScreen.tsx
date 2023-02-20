import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const [totalDailyCalories, setTotalDailyCalories] = useState(0);

  useEffect(() => {
    if (route.params?.calories) {
      setTotalDailyCalories(prev => prev + parseInt(route.params?.calories));
    }
  }, [route.params?.calories]);

  return (
    <View className='flex-1 items-center justify-center bg-gray-100'>
      <Text className='text-8xl text-gray-700'>{totalDailyCalories}</Text>
      <Text className='text-base'>Calories</Text>
      <View className='border-4 border-violet-500 rounded-full m-4'>
        <Pressable
          className='p-3'
          onPress={() => navigation.navigate('NewEntry')}
        >
          <MaterialIcons name='add' size={40} color='#25292e' />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
