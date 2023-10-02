import NumberInput from '@components/NumberInput';
import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

const TestScreen = () => {
  const [value, setValue] = useState('0');

  return (
    <View className='flex-1 justify-center items-center'>
      <NumberInput value={value} handleChange={setValue} />
    </View>
  );
};

export default TestScreen;
