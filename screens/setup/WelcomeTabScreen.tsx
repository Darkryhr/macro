import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Layout } from './TabLayout';

export const WelcomeScreen = ({ navigation }) => {
  const Component = () => (
    <View className='w-full h-full justify-between'>
      <View>
        <Image
          source={require('../../assets/designs/onboard.png')}
          style={{
            width: '100%',
            height: '90%',
            resizeMode: 'cover',
          }}
        />
      </View>
      <Pressable
        className='bg-black disabled:bg-zinc-600 py-4 rounded-md w-full'
        onPress={() => {
          navigation.navigate('Calories');
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
  return (
    <Layout
      heading='Welcome to Macro!'
      buttonAction={() => navigation.navigate('Calories')}
    >
      <Component />
    </Layout>
  );
};
