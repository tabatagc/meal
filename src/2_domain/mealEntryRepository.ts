//2_domain/mealEntryRepository
import type { MealEntry } from './mealEntry';

export interface MealEntryRepository {
  addMealEntry(mealEntry: MealEntry): Promise<MealEntry>;
  getAllPublicMealEntries(): Promise<MealEntry[]>;
  getAllMealEntries(): Promise<MealEntry[]>;
  find(id: string): Promise<MealEntry | undefined>;
  update(id: string, mealEntryData: Partial<MealEntry>): Promise<MealEntry>;
}
