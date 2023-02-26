import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

import { CalorieContext, NewEntry } from '@models/index';

const calorieContext = createContext<CalorieContext | undefined>(undefined);

export const useUserData = () => useContext(calorieContext);

function useProvideUser() {
  const [calorieLimit, setCalorieLimit] = useState(0);
  const [dailyMacros, setDailyMacros] = useState<NewEntry>({
    calories: 0,
    time: new Date(),
    isFirst: false,
    isLast: false,
  });

  const setDailyLimit = async (data: number) => {
    setCalorieLimit(data);
    await AsyncStorage.setItem('@limit_Key', data + '');
  };

  const updateDailyMacros = async (data: NewEntry) => {};

  useEffect(() => {
    const checkStorage = async () => {
      const storedValue = await AsyncStorage.getItem('@limit_Key');
      if (!storedValue) setCalorieLimit(0);
      else setCalorieLimit(+storedValue);
    };

    checkStorage();
  }, []);

  return {
    calorieLimit,
    setDailyLimit,
  };
}

export function DataProvider({ children }) {
  const data = useProvideUser();

  return (
    <calorieContext.Provider value={data}>{children}</calorieContext.Provider>
  );
}
