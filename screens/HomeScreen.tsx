import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View className='flex-1 items-center justify-center bg-gray-100'>
      <Text className='text-8xl'>0</Text>
      <Text className='text-base'>Calories</Text>
      <Pressable
        className='bg-blue-400 p-4 m-4'
        onPress={() => navigation.navigate('Details')}
      >
        <MaterialIcons name='add' size={38} color='#25292e' />
      </Pressable>
    </View>
  );
};

export default HomeScreen;
