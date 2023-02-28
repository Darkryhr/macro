import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LimitStatus } from '@models/index';
import { useUserData } from '@utils/useProvideUser';

const HomeScreen = ({ navigation }) => {
  const [limitStatus, setLimitStatus] = useState<LimitStatus>(
    LimitStatus.NORMAL
  );
  const userData = useUserData();

  //TODO: convert to splash screen or something
  if (!userData) return <Text>Loading...</Text>;

  useEffect(() => {
    if (userData.dailyMacros.calories > userData.calorieLimit * 0.8) {
      setLimitStatus(LimitStatus.ALMOST);
    }
    if (userData.dailyMacros.calories > userData.calorieLimit) {
      setLimitStatus(LimitStatus.OVER);
    }
  });

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
          {userData.dailyMacros?.calories}
        </Text>
        <Text
          className='tracking-widest text-lg text-gray-100'
          style={{
            fontFamily: 'JosefinSans-Medium',
          }}
        >
          CALORIES
        </Text>
        {userData.dailyMacros?.macros !== undefined ? (
          <>
            {Object.keys(userData.dailyMacros?.macros).map((key, index) => (
              <MacroVisualiser
                key={key}
                macroKey={key}
                macroValue={userData.dailyMacros?.macros[key]}
              />
            ))}
          </>
        ) : null}
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
      {/* <View className='rounded-full m-4 absolute bottom-40 border-2 border-gray-500'>
        <Pressable
          className='p-3'
          onPress={async () => {
            await AsyncStorage.clear();
          }}
        >
          <MaterialIcons name='close' size={50} color='#f7f7f7' />
        </Pressable>
      </View> */}
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

const MacroVisualiser = ({ macroKey, macroValue }) => {
  return (
    <View className='opacity-70 mt-3'>
      <View className='h-[1px] bg-gray-100 w-16 mx-auto mb-3 mt-2'></View>
      <Text className='text-gray-50 font-light text-base'>
        <Text className='font-bold'>{macroValue}g </Text>
        of {macroKey}
      </Text>
    </View>
  );
};
