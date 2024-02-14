//2_domain/mealEntryRepository
import type { MealEntry } from './mealEntry';

export interface MealEntryRepository {
  addMealEntry(mealEntry: MealEntry): Promise<MealEntry>;
  getAllMealEntries(): Promise<MealEntry[]>; 
}
