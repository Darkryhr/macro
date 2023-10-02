import { CalorieGoal } from '@models/index';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import { Layout } from './TabLayout';

export const GoalScreen = ({ route, navigation }) => {
  const [goal, setGoal] = useState<CalorieGoal>(CalorieGoal.STAY);

  const { calories } = route.params;

  const Component = () => {
    return (
      <View className='w-full h-full justify-between'>
        <View>
          <Text className='text-zinc-500 text-center leading-5 px-4 pb-2'>
            Next, what's your goal?
          </Text>
          <View className='pt-4'>
            <FlatList
              data={[
                {
                  title: 'Lose weight',
                  desc: 'Need to lose a few pounds? dont we all, make sure you keep an eye on your nutrients',
                  goal: CalorieGoal.CUT,
                },
                {
                  title: 'Gain weight',
                  desc: 'Looking to bulk for strength or health? Just be sure you gain that weight in muscle, not fat.',
                  goal: CalorieGoal.BULK,
                },
                {
                  title: 'Stay the course',
                  desc: "Satisfied the way you are? Good, let's help you keep it that way.",
                  goal: CalorieGoal.STAY,
                },
              ]}
              renderItem={({ item }) => (
                <Pressable
                  className={`px-3 py-3 border ${
                    goal === item.goal ? 'border-violet-600' : 'border-zinc-300'
                  } rounded-md w-full mb-2`}
                  onPress={() => {
                    setGoal(item.goal);
                  }}
                >
                  <Text
                    className='text-lg mb-1'
                    style={{ fontFamily: 'Inter-Bold' }}
                  >
                    {item.title}
                  </Text>
                  <Text className='text-zinc-500'>{item.desc}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>

        <Pressable
          className='bg-black disabled:bg-zinc-600 py-4 rounded-md w-full'
          onPress={() => {
            navigation.navigate('Macros', { calories, goal });
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
