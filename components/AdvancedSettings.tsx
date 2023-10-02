import Checkbox from 'expo-checkbox';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';

const AdvancedSettings = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      protein: '0',
      fat: '0',
      carbs: '0',
      IF: false,
    },
  });

  const onSubmit = data => console.log(data);

  return (
    <View className='space-y-2 mt-4'>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox onValueChange={onChange} value={value} />
        )}
        name='IF'
      />
      <Pressable onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AdvancedSettings;
