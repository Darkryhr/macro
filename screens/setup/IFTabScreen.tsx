import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Layout } from './TabLayout';

export const IFScreen = ({ route, navigation }) => {
  const { calories, goal, macros } = route.params;

  const Component = () => {
    const [ifChecked, setIfChecked] = useState(false);

    return (
      <View className='w-full h-full items-center justify-between'>
        <View className='w-full'>
          <Text className='text-zinc-500 text-center leading-5 px-4 pb-2'>
            Intermittent Fasting means setting a limited feeding window, outside
            of which you refrain from eating*
          </Text>
          <Pressable
            className={`items-start border ${
              ifChecked ? 'border-violet-500' : 'border-zinc-300'
            }  rounded-md w-full py-2 px-3 mt-4`}
          >
            <View className='flex-row w-full justify-between items-center'>
              <Text className='text-xl pl-2' style={styles.checkBoxLabel}>
                Opt-in
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#0866C4' }}
                thumbColor={ifChecked ? '#FBF9EF' : '#D6D6D6'}
                value={ifChecked}
                onValueChange={() => setIfChecked(prev => !prev)}
              />
            </View>
          </Pressable>
        </View>
        <View className='w-full'>
          <Text className='text-zinc-500 leading-5 mb-3'>
            * Certain things do not break a fast, such as: water, tea & coffee
            (without milk and sugar)
          </Text>

          <Pressable
            className='bg-black disabled:bg-zinc-600 py-4 rounded-md w-full'
            onPress={() => {
              navigation.navigate('Done', {
                calories,
                goal,
                macros,
                fasting: ifChecked,
              });
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
      </View>
    );
  };

  return (
    <Layout heading='Setup intermittent fasting?'>
      <Component />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Inter-Black',
    fontSize: 32,
    width: 300,
    textAlign: 'center',
  },
  checkBoxLabel: {
    fontFamily: 'Inter-Bold',
  },
  button: {
    fontFamily: 'Inter-Bold',
  },
});
