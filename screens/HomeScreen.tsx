import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LimitStatus } from '@models/index';

const HomeScreen = ({ route, navigation }) => {
  const [totalDailyCalories, setTotalDailyCalories] = useState(0);
  const [limitStatus, setLimitStatus] = useState<LimitStatus>(
    LimitStatus.NORMAL
  );

  //* updates values on new entry
  useEffect(() => {
    if (route.params?.calories) {
      const newTotal = totalDailyCalories + parseInt(route.params?.calories);
      setTotalDailyCalories(newTotal);
      storeData(newTotal);
      if (newTotal > 2000) setLimitStatus(LimitStatus.ALMOST);
      if (newTotal > 2600) setLimitStatus(LimitStatus.OVER);
      route.params.calories = 0;
    }
  }, [route.params?.calories, totalDailyCalories]);

  //* updates values on midnight
  useEffect(() => {
    const currentMidnight = new Date().setHours(0, 0, 0, 0);
    const interval = setInterval(() => {
      const newMidnight = new Date().setHours(0, 0, 0, 0);
      if (newMidnight !== currentMidnight) {
        setTotalDailyCalories(0);
        setLimitStatus(LimitStatus.NORMAL);
        storeData(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //* updates values based on local storage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@calories_Key');
        if (value !== null) {
          setTotalDailyCalories(+value);
          if (+value > 2000) setLimitStatus(LimitStatus.ALMOST);
          if (+value > 2600) setLimitStatus(LimitStatus.OVER);
        } else {
          setTotalDailyCalories(0);
          storeData(0);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-gray-900'>
      <Text
        className='text-gray-100 pt-8 text-center'
        style={{
          fontFamily: 'Teko-Bold',
          fontSize: 100,
          lineHeight: 80,
          flexWrap: 'wrap',
        }}
      >
        <Text
          style={[
            limitStatus === LimitStatus.NORMAL
              ? styles.normal
              : limitStatus === LimitStatus.ALMOST
              ? styles.almost
              : limitStatus === LimitStatus.OVER && styles.over,
          ]}
        >
          {totalDailyCalories}
        </Text>
        {'\n'}Calories
      </Text>
      <View className='border-2 border-gray-700 rounded-full m-4 absolute bg-gray-800 bottom-2'>
        <Pressable
          className='p-3'
          onPress={() => navigation.navigate('NewEntry')}
        >
          <MaterialIcons name='add' size={40} color='#797680' />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  normal: {
    color: '#1B5299',
  },
  almost: {
    color: '#E89005',
  },
  over: {
    color: '#ef233c',
  },
});

//* to create the daily run, store 1 key value pair locally, delete and create new one? - maybe create another value called lastAccesed, if the current time is past midnight, and lastAccesed is before, reset the main key-value pair

const storeData = async (value: number) => {
  try {
    await AsyncStorage.setItem('@calories_Key', value + '');
  } catch (e) {
    // saving error
  }
};
