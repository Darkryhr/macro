import { CalorieContext } from '@models/index';
import { createContext, useContext, useState } from 'react';

const calorieContext = createContext<CalorieContext | undefined>(undefined);

export const useUserData = () => useContext(calorieContext);

function useProvideUser() {
  const [calorieLimit, setCalorieLimit] = useState(0);

  const setDailyLimit = (data: number) => {
    setCalorieLimit(data);

    return calorieLimit;
  };

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
