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

  //* sets up initial user goal tracking object
  const createDailyTrackingObj = async (macros: string[]) => {
    //* set macros
    const userGoals = appendMacros(macros);
    //* save obj to storage
    const jsonValue = JSON.stringify(userGoals);
    await AsyncStorage.setItem('@userGoalTracker_Key', jsonValue);
    await AsyncStorage.setItem('@trackedGoals_Key', jsonValue);
    //* save obj to state
    setDailyMacros(userGoals);
  };

  const appendMacros = (macros: string[]): NewEntry => {
    let macroObject = {};
    macros.forEach(macro => {
      macroObject[macro] = 0;
    });
    const dailyMacroObj = { calories: 0, macros: macroObject };
    return dailyMacroObj;
  };

  const setDailyLimit = async (data: number) => {
    setCalorieLimit(data);
    await AsyncStorage.setItem('@limit_Key', data + '');
  };

  const updateDailyMacros = async (data: NewEntry) => {
    const newCalories = dailyMacros.calories + data.calories;
    let newMacros: Macros = {} as Macros;
    for (const [key, value] of Object.entries(data.macros)) {
      newMacros[key] = parseInt(dailyMacros.macros[key] + value);
    }
    const userGoals = {
      calories: newCalories,
      macros: newMacros,
    };
    setDailyMacros(userGoals);
    const jsonValue = JSON.stringify(userGoals);
    await AsyncStorage.setItem('@userGoalTracker_Key', jsonValue);
  };

  useEffect(() => {
    const checkStorage = async () => {
      const storedValue = await AsyncStorage.getItem('@limit_Key');
      if (!storedValue) setCalorieLimit(0);
      else setCalorieLimit(+storedValue);
    };

    checkStorage();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@userGoalTracker_Key');
        if (value !== null) {
          const parsedObj: NewEntry = JSON.parse(value);
          setDailyMacros(parsedObj);
        } else {
          setDailyMacros({ calories: 0 });
          // await storeData('0');
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  //* updates values on midnight
  useEffect(() => {
    const checkDay = async () => {
      const currentMidnight = new Date().setHours(0, 0, 0, 0);
      const jsonMidnight = JSON.stringify(currentMidnight);
      let storedDay = await AsyncStorage.getItem('@day_Key');
      const trackedGoals = await AsyncStorage.getItem('@trackedGoals_Key');
      if (storedDay !== null) {
        if (storedDay !== jsonMidnight) {
          setDailyMacros(JSON.parse(trackedGoals));
          await AsyncStorage.setItem('@day_Key', jsonMidnight);
        }
      } else {
        setDailyMacros(JSON.parse(trackedGoals));
        await AsyncStorage.setItem('@day_Key', jsonMidnight);
      }
    };

    checkDay();
  });

  return {
    dailyMacros,
    calorieLimit,
    setDailyLimit,
    updateDailyMacros,
    createDailyTrackingObj,
  };
}

export function DataProvider({ children }) {
  const data = useProvideUser();

  return (
    <calorieContext.Provider value={data}>{children}</calorieContext.Provider>
  );
}
