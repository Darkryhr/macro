export interface Macros {
  protein?: number;
  fat?: number;
  carbs?: number;
}
export interface NewEntry {
  calories: number;
  macros?: Macros;
}

export enum LimitStatus {
  NORMAL = 'normal',
  ALMOST = 'almost',
  OVER = 'over',
}

export interface User {
  name: string;
  calories: number;
  calorieLimit: number;
}

export interface CalorieContext {
  calorieLimit: number;
  dailyMacros: NewEntry;
  setDailyLimit: (number) => void;
  // setMacros: (string) => void;
  createDailyTrackingObj: (macros: string[]) => void;
  updateDailyMacros: (data: NewEntry) => void;
}

export interface MacroContext {
  protein: string;
  carbs: string;
  fat: string;
  setProtein: (string) => void;
  setCarbs: (string) => void;
  setFat: (string) => void;
}
