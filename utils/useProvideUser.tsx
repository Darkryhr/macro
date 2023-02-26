import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

import { CalorieContext, Macros, NewEntry } from '@models/index';

const calorieContext = createContext<CalorieContext | undefined>(undefined);

export const useUserData = () => useContext(calorieContext);

function useProvideUser() {
  const [calorieLimit, setCalorieLimit] = useState(0);

  const [dailyMacros, setDailyMacros] = useState<NewEntry>({
    calories: 0,
  });

  //* initializes additional macros
  const setMacros = (macros: string[]) => {
    macros.forEach(macro => setDailyMacros(initial => initial.macros[macro]));
  };

  const setDailyLimit = async (data: number) => {
    setCalorieLimit(data);
    await AsyncStorage.setItem('@limit_Key', data + '');
  };

  const updateDailyMacros = (data: NewEntry) => {
    const newCalories = dailyMacros.calories + data.calories;
    let newMacros: Macros = {} as Macros;
    for (const [key, value] of Object.entries(data)) {
      newMacros[key] = dailyMacros[key] + value;
    }
    setDailyMacros({
      calories: newCalories,
      macros: newMacros,
    });
  };

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
    setMacros,
    updateDailyMacros,
  };
}

export function DataProvider({ children }) {
  const data = useProvideUser();

  return (
    <calorieContext.Provider value={data}>{children}</calorieContext.Provider>
  );
}
