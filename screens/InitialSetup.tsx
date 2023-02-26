import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUserData } from '@utils/useProvideUser';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InitialSetup = ({ navigation }) => {
  //* here the user will define his maintenance calories, type of goal, and later if additional macros should be recorded

  const [calorieLimit, setCalorieLimit] = useState('0');
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const { setDailyLimit, setMacros } = useUserData();
  const [proteinChecked, setProteinChecked] = useState(false);
  const [carbsChecked, setCarbsChecked] = useState(false);
  const [fatChecked, setFatChecked] = useState(false);

  const onSubmit = () => {
    const macros: string[] = [];
    if (proteinChecked) macros.push('protein');
    if (carbsChecked) macros.push('carbs');
    if (fatChecked) macros.push('fat');
    setMacros(macros);
    setDailyLimit(+calorieLimit);
  };

  return (
    <LinearGradient
      colors={['#16161d', '#100c08']}
      className='flex-1 justify-center items-center'
    >
      <Text
        className='text-6xl text-gray-50'
        style={{
          fontFamily: 'JosefinSans-Bold',
        }}
      >
        Hiya!
      </Text>
      <Text className='text-gray-50 mt-3 text-base ml-1'>
        First, set your caloric goal:
      </Text>
      <View className='border-b border-gray-400 w-36 my-4'>
        <TextInput
          onChangeText={setCalorieLimit}
          value={calorieLimit}
          placeholder='0'
          onFocus={() => setCalorieLimit('')}
          className='text-6xl text-center text-gray-100'
          style={{
            fontFamily: 'JosefinSans-Bold',
          }}
        />
      </View>
      <Pressable
        className='flex flex-row items-center'
        onPress={() => setAdvancedSettings(prev => !prev)}
      >
        <Text className='text-gray-300 text-base'>Additional macros</Text>
        <MaterialIcons name='expand-more' color='#fff' />
      </Pressable>
      {advancedSettings && (
        <View className='space-y-2 mt-4'>
          {/* protein */}
          <View className='flex-row w-52 justify-between px-2 border-2 border-gray-800 rounded py-2'>
            <View className='flex-row items-center'>
              <Checkbox
                value={proteinChecked}
                onValueChange={setProteinChecked}
                className='mr-2 rounded-xl'
                // color='#fff'
              />
              <Text className='text-gray-200'>Protein</Text>
            </View>
            <TextInput
              className={`bg-gray-800 appearance-none border border-gray-700 rounded w-10 text-center py-1 px-2 text-gray-100 leading-tight focus:bg-gray-900 ${
                !proteinChecked ? 'opacity-60' : ''
              }`}
              editable={proteinChecked}
            />
          </View>
          {/* carbs */}
          <View className='flex-row w-52 justify-between px-2 border-2 border-gray-800 rounded py-2'>
            <View className='flex-row items-center'>
              <Checkbox
                value={carbsChecked}
                onValueChange={setCarbsChecked}
                className='mr-2 rounded-xl'
              />
              <Text className='text-gray-200'>Carbs</Text>
            </View>
            <TextInput
              className={`bg-gray-800 appearance-none border border-gray-700 rounded w-10 text-center py-1 px-2 text-gray-100 leading-tight focus:bg-gray-900 ${
                !carbsChecked ? 'opacity-60' : ''
              }`}
              editable={carbsChecked}
            />
          </View>
          {/* fat */}
          <View className='flex-row w-52 justify-between px-2 border-2 border-gray-800 rounded py-2'>
            <View className='flex-row items-center'>
              <Checkbox
                value={fatChecked}
                onValueChange={setFatChecked}
                className='mr-2 rounded-xl'
              />
              <Text className='text-gray-200'>Fat</Text>
            </View>
            <TextInput
              className={`bg-gray-800 appearance-none border border-gray-700 rounded w-10 text-center py-1 px-2 text-gray-100 leading-tight focus:bg-gray-900 ${
                !fatChecked ? 'opacity-60' : ''
              }`}
              editable={fatChecked}
            />
          </View>
        </View>
      )}

      <Pressable
        onPress={onSubmit}
        className='bg-gray-50 w-full py-4 absolute bottom-0 left-0 flex justify-center items-center border-b border-gray-800'
      >
        <View className='flex flex-row mr-3'>
          <MaterialIcons name='done' size={28} />
          <Text
            style={{
              color: '#100c08',
            }}
            className='text-white font-semibold text-lg'
          >
            Ready!
          </Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

export default InitialSetup;
