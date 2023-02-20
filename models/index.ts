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
