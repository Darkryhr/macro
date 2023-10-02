import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const Layout = ({ children, heading, buttonAction = () => {} }) => {
  return (
    <View className={`flex-1 pb-6 pt-10 px-3`}>
      <View className='w-full items-center justify-center pt-6'>
        <Text style={styles.header}>{heading}</Text>
      </View>
      <View className='flex-1 w-full items-center justify-center py-3 px-2'>
        {children}
      </View>
    </View>
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
