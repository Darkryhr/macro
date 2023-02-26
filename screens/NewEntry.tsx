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
      colors={['#16161d', '#100c08']}
      className='flex-1 items-center justify-center w-full'
    >
      <View className='w-full mb-2'>
        <TextInput
          onChangeText={setCalories}
          value={calories}
          placeholder='0'
          onFocus={() => setCalories('')}
          underlineColorAndroid='transparent'
          autoComplete='off'
          autoCorrect={false}
          className='text-8xl text-center text-gray-50 leading-none w-full'
          style={{
            fontFamily: 'JosefinSans-Medium',
          }}
        />
        <View className='h-[2px] bg-white w-56 mx-auto mb-2' />
      </View>
      <Text
        className='text-3xl font-light mt-2 text-gray-50'
        style={{
          fontFamily: 'JosefinSans-Light',
        }}
      >
        Calories
      </Text>
      <View className='flex flex-row absolute bottom-5 px-3 space-x-3'>
        <Pressable
          className='flex-[2] items-center justify-center py-2 rounded-full bg-gray-100'
          onPress={onSubmit}
        >
          <MaterialIcons name='done' size={40} color='#808000' />
        </Pressable>
        <Pressable
          className='flex-[1] items-center justify-center py-2 rounded-full bg-gray-300'
          onPress={onCancel}
        >
          <MaterialIcons name='close' size={40} color='#e32636' />
        </Pressable>
      </View>
    </LinearGradient>
    // </SafeAreaView>
  );
};

export default NewEntry;
