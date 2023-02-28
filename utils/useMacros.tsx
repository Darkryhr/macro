import { MacroContext } from '@models/index';
import { createContext, useContext, useEffect, useState } from 'react';

const macroContext = createContext<MacroContext | undefined>(undefined);

export const useMacros = () => useContext(macroContext);

function provideMacros() {
  const [protein, setProtein] = useState('0');
  const [carbs, setCarbs] = useState('0');
  const [fat, setFat] = useState('0');

  return {
    protein,
    carbs,
    fat,
    setProtein,
    setCarbs,
    setFat,
  };
}

export function MacroProvider({ children }) {
  const data = provideMacros();

  return <macroContext.Provider value={data}>{children}</macroContext.Provider>;
}
