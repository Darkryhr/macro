import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
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
    // <SafeAreaView className='flex-1 items-center justify-center'>
    <LinearGradient
      colors={['#09C6F9', '#045DE9']}
      className='flex-1 items-center justify-center w-full'
    >
      <Text
        className='text-gray-50 pt-8 text-center'
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
      <LinearGradient
        colors={['#ffffff', '#e4e4e4']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        className='rounded-full m-4 absolute bg-gray-100 bottom-2'
      >
        <Pressable
          className='p-3'
          onPress={() => navigation.navigate('NewEntry')}
        >
          <MaterialIcons name='add' size={40} color='#4c4b4d' />
        </Pressable>
      </LinearGradient>
    </LinearGradient>
    // </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  normal: {
    color: '#fff',
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
