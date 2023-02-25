export interface NewEntry {
  calories: number;
  time: Date;
  isFirst: boolean;
  isLast: boolean;
  macros: {
    Protein: number;
    fat: number;
    carbs: number;
  };
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
}
