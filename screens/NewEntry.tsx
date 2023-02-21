import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
    <SafeAreaView className='flex-1 items-center justify-center bg-gray-900 text-white'>
      <View className='border-b border-gray-400 w-36 mb-2'>
        <TextInput
          onChangeText={setCalories}
          value={calories}
          placeholder='0'
          onFocus={() => setCalories('')}
          className='text-5xl text-center text-gray-500'
        />
      </View>
      <Text className='text-base mb-2 text-gray-300'>Calories</Text>
      <View className='flex flex-row absolute bottom-0'>
        <Pressable
          className='bg-green-600 flex-1 items-center justify-center py-4'
          onPress={onSubmit}
        >
          <MaterialIcons name='done' size={30} color='#ffffff' />
        </Pressable>
        <Pressable
          className='bg-red-600 flex-1 items-center justify-center py-4'
          onPress={onCancel}
        >
          <MaterialIcons name='close' size={30} color='#ffffff' />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default NewEntry;
