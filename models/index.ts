export interface Macros {
  protein?: number;
  fat?: number;
  carbs?: number;
}
export interface NewEntry {
  calories: number;
  macros?: Macros;
}

//* gets created with every new entry
export interface FeedingSchedulde {
  //* the first entry will be the first and last initially,
  //* for the first, just check that there are no previous values, i.e. daily macros are 0, check on entry if calories are 0
  isFirst?: boolean;
  //* every new entry will be set to true, while the previous will be set to false
  //* last will be state, and updated every time an entry is made
  isLast?: boolean;
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
  createControlObj: (macros: string[]) => void;
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

export interface IntermittentFasting {
  createdAt: Date;
  isFirst: boolean;
  isLast: boolean;
}

export enum CalorieGoal {
  BULK = 'bulk',
  CUT = 'cut',
  STAY = 'stay',
}
