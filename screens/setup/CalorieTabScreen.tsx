import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Layout } from './TabLayout';

export const CaloriesScreen = ({ navigation }) => {
  const Component = () => {
    const [calories, setCalories] = useState('0');
    return (
      <View className='w-full h-full justify-between'>
        <View className='justify-between'>
          <Text className='text-zinc-500 text-center leading-5 px-4 pb-2'>
            First off, input your daily caloric intake for maintenance, meaning
            to stay your current weight.
          </Text>
          <View className='w-full items-center justify-center'>
            <TextInput
              keyboardType='numeric'
              underlineColorAndroid='transparent'
              autoComplete='off'
              onChangeText={setCalories}
              value={calories}
              placeholder='0'
              onFocus={() => setCalories('')}
              autoCorrect={false}
              className='text-9xl text-center leading-none'
              style={{
                fontFamily: 'JosefinSans-Medium',
              }}
            />
          </View>
        </View>

        <Pressable
          className='bg-black disabled:bg-zinc-600 py-4 rounded-md w-full'
          disabled={calories === '0'}
          onPress={() => {
            navigation.navigate('Goal', { calories });
          }}
        >
          <Text
            className='text-white text-center text-lg'
            style={{
              fontFamily: 'Inter-Bold',
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Layout heading='Set your caloric intake'>
      <Component />
    </Layout>
  );
};
