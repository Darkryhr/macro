export interface Macros {
  Protein: number;
  fat: number;
  carbs: number;
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
  setDailyLimit: (number) => void;
  setMacros: (string) => void;
}
