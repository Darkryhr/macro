import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewEntry = ({ navigation }) => {
  const [calories, setCalories] = useState('0');

  const onSubmit = () => {
    navigation.navigate('Home', {
      calories,
      merge: true,
    });
  };

  const onCancel = () => {
    navigation.navigate('Home', {
      calories: null,
      merge: true,
    });
  };

  return (
    // <SafeAreaView className='flex-1 items-center justify-center text-white'>
    <LinearGradient
      colors={['#09C6F9', '#045DE9']}
      className='flex-1 items-center justify-center w-full'
    >
      <View className='border-b border-gray-50 w-36 mb-2'>
        <TextInput
          onChangeText={setCalories}
          value={calories}
          placeholder='0'
          onFocus={() => setCalories('')}
          className='text-5xl text-center text-gray-50'
        />
      </View>
      <Text className='text-lg font-light mt-1 text-gray-50'>Calories</Text>
      <View className='flex flex-row absolute bottom-5 px-3 space-x-3'>
        <Pressable
          className='flex-[2] items-center justify-center py-2 rounded-full bg-gray-50'
          onPress={onSubmit}
        >
          <MaterialIcons name='done' size={40} color='#1d1d1d' />
        </Pressable>
        <Pressable
          className='flex-[1] items-center justify-center py-2 rounded-full bg-gray-50'
          onPress={onCancel}
        >
          <MaterialIcons name='close' size={40} color='#1d1d1d' />
        </Pressable>
      </View>
    </LinearGradient>
    // </SafeAreaView>
  );
};

export default NewEntry;
