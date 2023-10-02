import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { CalorieGoal } from '@models/index';
import { useTrackerData } from '@utils/useProvideTracker';
import { Layout } from './TabLayout';

export const DoneScreen = ({ route, navigation }) => {
  const { calories, goal, macros, fasting } = route.params;

  const { onFirstSetup } = useTrackerData();

  const onComplete = () => {
    //* create context obj
    let dailyCalories = calories;
    switch (goal) {
      case CalorieGoal.BULK:
        dailyCalories = dailyCalories * 1.2;
        break;
      case CalorieGoal.CUT:
        dailyCalories = dailyCalories * 0.8;
        break;
      default:
        break;
    }

    const userPreferences = {
      calories: dailyCalories,
      macros,
      fasting,
    };

    onFirstSetup(userPreferences);

    //* navigate to the home screen
    navigation.navigate('Home');
  };

  const Component = () => {
    return (
      <View className='items-center w-full h-full justify-between'>
        <Text
          className='text-2xl text-center px-3'
          style={{
            fontFamily: 'Inter-Bold',
          }}
        >
          You're ready to get started! Good Luck on your journey
        </Text>
        <Pressable
          className='bg-black disabled:bg-zinc-600 py-4 rounded-md w-full'
          onPress={() => onComplete()}
        >
          <Text
            className='text-white text-center text-lg'
            style={{
              fontFamily: 'Inter-Bold',
            }}
          >
            Let's get started!
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Layout heading='All done!'>
      <Component />
    </Layout>
  );
};
