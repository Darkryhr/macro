import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ route, navigation }) => {
  const [totalDailyCalories, setTotalDailyCalories] = useState(0);

  useEffect(() => {
    if (route.params?.calories) {
      setTotalDailyCalories(prev => prev + parseInt(route.params?.calories));
      route.params.calories = 0;
    }
  }, [route.params?.calories]);

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-gray-100'>
      <Text
        className='text-gray-800 pt-8 text-center'
        style={{
          fontFamily: 'Teko-Bold',
          fontSize: 100,
          lineHeight: 80,
          flexWrap: 'wrap',
        }}
      >
        <Text className='text-blue-500'>{totalDailyCalories}</Text>
        {'\n'}Calories
      </Text>

      <View className='border-4 border-violet-500 rounded-full m-4'>
        <Pressable
          className='p-3'
          onPress={() => navigation.navigate('NewEntry')}
        >
          <MaterialIcons name='add' size={40} color='#25292e' />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
