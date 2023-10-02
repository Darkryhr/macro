import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Layout } from './TabLayout';

export const MacrosScreen = ({ route, navigation }) => {
  const { calories, goal } = route.params;

  const Component = () => {
    const [proteinChecked, setProteinChecked] = useState(false);
    const [carbsChecked, setCarbsChecked] = useState(false);
    const [fatChecked, setFatChecked] = useState(false);

    const createMacroObj = () => {
      const macros = [];
      if (proteinChecked) macros.push['protein'];
      if (carbsChecked) macros.push['carbs'];
      if (fatChecked) macros.push['fat'];
      return macros;
    };

    return (
      <View className='space-y-2 mt-4 w-full h-full justify-between'>
        <View>
          <Text className='text-zinc-500 text-center leading-5 px-4 pb-2'>
            If you're on a diet, bulking, or cutting, you might want to make
            sure you're getting enough of the right nutrients.
          </Text>
          <Pressable
            className={`items-center border flex-row justify-between ${
              proteinChecked ? 'border-violet-500' : 'border-zinc-300'
            }  rounded-md w-full p-5`}
            onPress={() => {
              setProteinChecked(prev => !prev);
            }}
          >
            <View className='w-3/4 pr-3'>
              <Text className='text-xl' style={styles.checkBoxLabel}>
                Protein
              </Text>
              <Text className='text-gray-500'>
                The building blocks of muscle, many see it as the most crucial
                of the big 3 macronutrients.
              </Text>
            </View>
            <Image
              source={require('../../assets/designs/protein.png')}
              style={{
                width: 72,
                height: 72,
                resizeMode: 'contain',
              }}
            />
          </Pressable>

          <Pressable
            className={`items-center border flex-row justify-between ${
              carbsChecked ? 'border-violet-500' : 'border-zinc-300'
            }  rounded-md w-full p-5`}
            onPress={() => {
              setCarbsChecked(prev => !prev);
            }}
          >
            <View className='w-3/4 pr-3'>
              <Text className='text-xl' style={styles.checkBoxLabel}>
                Carbs
              </Text>
              <Text className='text-gray-500'>
                To many, the largest portion of any plate and the biggest
                contributor to their weight issues.
              </Text>
            </View>
            <Image
              source={require('../../assets/designs/carb.png')}
              style={{
                width: 72,
                height: 72,
                resizeMode: 'contain',
              }}
            />
          </Pressable>

          <Pressable
            className={`items-center border flex-row justify-between ${
              fatChecked ? 'border-violet-500' : 'border-zinc-300'
            }  rounded-md w-full p-5`}
            onPress={() => {
              setFatChecked(prev => !prev);
            }}
          >
            <View className='w-3/4 pr-3'>
              <Text className='text-xl' style={styles.checkBoxLabel}>
                Fat
              </Text>
              <Text className='text-gray-500'>
                A sometimes overlooked, yet important part of any diet.
              </Text>
            </View>
            <Image
              source={require('../../assets/designs/fat.png')}
              style={{
                width: 72,
                height: 72,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        </View>

        <Pressable
          className='bg-black disabled:bg-zinc-600 py-4 rounded-md w-full'
          onPress={() => {
            // TODO:create submit func to check if any macros were chosen and create an object
            navigation.navigate('IF', {
              calories,
              goal,
              macros: createMacroObj(),
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
    );
  };

  return (
    <Layout heading='Setup additional macros'>
      <Component />
    </Layout>
  );
};

const styles = StyleSheet.create({
  checkBoxLabel: {
    fontFamily: 'Inter-Bold',
  },
});
