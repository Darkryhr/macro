import { useUserData } from '@utils/useProvideUser';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InitialSetup = ({ navigation }) => {
  //* here the user will define his maintenance calories, type of goal, and later if additional macros should be recorded

  const [calorieLimit, setCalorieLimit] = useState('0');
  const { setDailyLimit } = useUserData();

  const onSubmit = () => {
    setDailyLimit(+calorieLimit);
  };

  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Text className='text-4xl'>Hello There!</Text>
      <Text>Please tell us your caloric goal:</Text>
      <View className='border-b border-gray-400 w-36 my-4'>
        <TextInput
          onChangeText={setCalorieLimit}
          value={calorieLimit}
          placeholder='0'
          onFocus={() => setCalorieLimit('')}
          className='text-6xl text-center text-gray-600'
        />
      </View>

      <Pressable
        onPress={onSubmit}
        className='bg-blue-500 py-3 px-6 rounded-full'
      >
        <Text className='text-white font-semibold text-md'>Accept</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default InitialSetup;
