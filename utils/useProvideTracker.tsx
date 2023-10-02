import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const trackerContext = createContext(undefined);
export const useTrackerData = () => useContext(trackerContext);

function useProvideTracker() {
  //* defines the users preferences
  const [controlObj, setControlObj] = useState({});

  //* defines the users metrics each day
  const [dailyObj, setDailyObj] = useState({
    calories: 0,
    macros: {},
    lastUpdated: '',
  });

  //* initializes the tracker
  const onFirstSetup = userPref => {
    //* initializes the control object
    setControlObj(userPref);

    //* create the macro object for daily tracking
    let dailyMacroObj = {};
    userPref.macros.forEach(macro => {
      dailyMacroObj[macro] = 0;
    });

    //* initializes the daily object
    setDailyObj({ calories: 0, macros: dailyMacroObj, lastUpdated: '' });
  };

  //* update the daily stats object upon new entry
  const updateDailyObj = entry => {
    let newMacroValues = {};

    Object.entries(dailyObj.macros).forEach(([key, value]) => {
      newMacroValues[key] = dailyObj.macros[key] = value + entry.macros[key];
    });

    setDailyObj(prev => ({
      calories: prev + entry.calories,
      macros: newMacroValues,
      lastUpdated: new Date() + '',
    }));
  };

  return {
    onFirstSetup,
    controlObj,
    dailyObj,
    updateDailyObj,
  };
}

export function TrackingDataProvider({ children }) {
  const data = useProvideTracker();

  return (
    <trackerContext.Provider value={data}>{children}</trackerContext.Provider>
  );
}
