import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUserData } from '@utils/useProvideUser';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InitialSetup = ({ navigation }) => {
  //* here the user will define his maintenance calories, type of goal, and later if additional macros should be recorded

  const [calorieLimit, setCalorieLimit] = useState('0');
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const { setDailyLimit } = useUserData();

  const onSubmit = () => {
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
        />
      </View>
      <Pressable
        className='flex flex-row items-center'
        onPress={() => setAdvancedSettings(prev => !prev)}
      >
        <Text className='text-gray-200'>Additional macros</Text>
        <MaterialIcons name='expand-more' color='#fff' />
      </Pressable>
      {advancedSettings && (
        <View>
          <Text className='text-gray-50'>additional</Text>
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
