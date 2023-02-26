import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LimitStatus } from '@models/index';
import { useUserData } from '@utils/useProvideUser';

const HomeScreen = ({ route, navigation }) => {
  const [totalDailyCalories, setTotalDailyCalories] = useState(0);
  const [limitStatus, setLimitStatus] = useState<LimitStatus>(
    LimitStatus.NORMAL
  );
  const userData = useUserData();

  //* updates values on new entry
  useEffect(() => {
    if (route.params?.calories) {
      const newTotal = totalDailyCalories + parseInt(route.params?.calories);
      setTotalDailyCalories(newTotal);
      storeData(newTotal + '');
      if (newTotal > userData?.calorieLimit * 0.8)
        setLimitStatus(LimitStatus.ALMOST);
      if (newTotal > userData?.calorieLimit) setLimitStatus(LimitStatus.OVER);
      route.params.calories = 0;
    }
  }, [route.params?.calories, totalDailyCalories]);

  //* updates values on midnight
  useEffect(() => {
    const checkDay = async () => {
      const currentMidnight = new Date().setHours(0, 0, 0, 0);
      const jsonMidnight = JSON.stringify(currentMidnight);
      let storedDay = await AsyncStorage.getItem('@day_Key');
      if (storedDay !== null) {
        if (storedDay !== jsonMidnight) {
          setTotalDailyCalories(0);
          setLimitStatus(LimitStatus.NORMAL);
          await storeData('0');
          await AsyncStorage.setItem('@day_Key', jsonMidnight);
        }
      } else {
        setTotalDailyCalories(0);
        setLimitStatus(LimitStatus.NORMAL);
        await storeData('0');
        await AsyncStorage.setItem('@day_Key', jsonMidnight);
      }
    };

    checkDay();
  });

  //* updates values based on local storage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@calories_Key');
        if (value !== null) {
          setTotalDailyCalories(+value);
          if (+value > userData?.calorieLimit * 0.8)
            setLimitStatus(LimitStatus.ALMOST);
          if (+value > userData?.calorieLimit) setLimitStatus(LimitStatus.OVER);
        } else {
          setTotalDailyCalories(0);
          await storeData('0');
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  //TODO: convert to splash screen or something
  if (!userData) return <Text>Loading...</Text>;

  return (
    <LinearGradient
      colors={['#16161d', '#100c08']}
      className='flex-1 items-center justify-center w-full'
    >
      <View className='flex-1 justify-center items-center'>
        <Text
          style={[
            limitStatus === LimitStatus.NORMAL
              ? styles.normal
              : limitStatus === LimitStatus.ALMOST
              ? styles.almost
              : limitStatus === LimitStatus.OVER && styles.over,
            styles.heading,
          ]}
        >
          {totalDailyCalories}
        </Text>
        <Text
          className='tracking-widest text-xl text-gray-50'
          style={{
            fontFamily: 'JosefinSans-Medium',
          }}
        >
          CALORIES
        </Text>
      </View>
      <View className='rounded-full m-4 absolute bottom-4 border-2 border-gray-500'>
        <Pressable
          className='p-3'
          onPress={() => navigation.navigate('NewEntry')}
        >
          <MaterialIcons name='add' size={50} color='#f7f7f7' />
        </Pressable>
      </View>
      {/* quick cache clear */}
      <View className='rounded-full m-4 absolute bottom-40 border-2 border-gray-500'>
        <Pressable
          className='p-3'
          onPress={async () => {
            await AsyncStorage.clear();
          }}
        >
          <MaterialIcons name='close' size={50} color='#f7f7f7' />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  normal: {
    color: '#fff',
  },
  almost: {
    color: '#F1A208',
  },
  over: {
    color: '#F0544F',
  },
  heading: {
    fontSize: 100,
    fontFamily: 'JosefinSans-Bold',
  },
});

//* to create the daily run, store 1 key value pair locally, delete and create new one? - maybe create another value called lastAccesed, if the current time is past midnight, and lastAccesed is before, reset the main key-value pair

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@calories_Key', value);
  } catch (e) {
    // saving error
  }
};
