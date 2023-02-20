import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View className='border-b border-gray-400 w-36 mb-2'>
        <TextInput
          onChangeText={setCalories}
          value={calories}
          placeholder='0'
          onFocus={() => setCalories('')}
          className='text-5xl text-center text-gray-700'
        />
      </View>
      <Text className='text-base mb-2'>Calories</Text>
      <View className='flex flex-row space-x-2'>
        <Pressable
          className='border-2 border-green-500 rounded-full p-2.5'
          onPress={onSubmit}
        >
          <MaterialIcons name='done' size={30} color='green' />
        </Pressable>
        <Pressable
          className='border-2 border-gray-400 rounded-full p-2.5'
          onPress={onCancel}
        >
          <MaterialIcons name='close' size={30} color='#25292e80' />
        </Pressable>
      </View>
    </View>
  );
};

export default NewEntry;
