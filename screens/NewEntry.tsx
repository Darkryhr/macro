import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMacros } from '@utils/useMacros';
import { useUserData } from '@utils/useProvideUser';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const NewEntry = ({ navigation }) => {
  const [calories, setCalories] = useState('0');
  const { updateDailyMacros, dailyMacros } = useUserData();
  const { protein, carbs, fat, setProtein, setCarbs, setFat } = useMacros();

  const onSubmit = () => {
    const newEntry = {
      calories: +calories,
      macros: {
        ...(dailyMacros.macros?.carbs !== undefined && { carbs: +carbs }),
        ...(dailyMacros.macros?.protein !== undefined && { protein: +protein }),
        ...(dailyMacros.macros?.fat !== undefined && { fat: +fat }),
      },
    };
    updateDailyMacros(newEntry);
    setCalories('0');
    setCarbs('0');
    setProtein('0');
    setFat('0');
    navigation.navigate('Home');
  };

  const onCancel = () => {
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={['#16161d', '#100c08']}
      className='flex-1 items-center justify-center w-full'
    >
      <View className='w-full mb-3'>
        <TextInput
          keyboardType='numeric'
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
        <View className='h-[2px] bg-white w-56 mx-auto' />
      </View>
      <Text
        className='text-3xl font-light mt-2 mb-5 text-gray-50'
        style={{
          fontFamily: 'JosefinSans-Light',
        }}
      >
        Calories
      </Text>
      {dailyMacros.macros?.carbs !== undefined && <CarbsInput />}
      {dailyMacros.macros?.protein !== undefined && <ProteinInput />}
      {dailyMacros.macros?.fat !== undefined && <FatInput />}
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
  );
};

export default NewEntry;

const ProteinInput = () => {
  const { protein, setProtein } = useMacros();

  return (
    <View className='flex-row items-center justify-between px-3 border-2 border-gray-700 rounded py-2.5 w-32'>
      <Text
        className='text-lg text-gray-200 mb-1'
        style={{
          fontFamily: 'JosefinSans-Medium',
        }}
      >
        Protein:
      </Text>
      <TextInput
        keyboardType='numeric'
        className='text-lg text-center text-gray-50 bg-gray-800 rounded px-1 leading-5'
        underlineColorAndroid='transparent'
        placeholder='0'
        onFocus={() => setProtein('')}
        onChangeText={setProtein}
        autoComplete='off'
        autoCorrect={false}
        value={protein}
        style={{
          fontFamily: 'JosefinSans-Light',
        }}
      />
    </View>
  );
};

const FatInput = () => {
  const { carbs, setCarbs } = useMacros();

  return (
    <TextInput
      keyboardType='numeric'
      underlineColorAndroid='transparent'
      placeholder='0'
      onChangeText={() => setCarbs(+carbs)}
      value={carbs + ''}
    />
  );
};

const CarbsInput = () => {
  const { fat, setFat } = useMacros();

  return (
    <TextInput
      keyboardType='numeric'
      underlineColorAndroid='transparent'
      placeholder='0'
      onChangeText={() => setFat(+fat)}
      value={fat + ''}
    />
  );
};
