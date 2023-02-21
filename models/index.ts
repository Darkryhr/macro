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
  calorieLimit: number;
  calories: number;
}
