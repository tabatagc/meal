//3_infrastructure/inMemoryMealEntryRepository
import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class InMemoryMealEntryRepository implements MealEntryRepository {
  private entries: MealEntry[] = [];

  async addMealEntry(mealEntry: MealEntry): Promise<MealEntry> {
    this.entries.push(mealEntry);
    return mealEntry;
  }

  async getAllMealEntries(): Promise<MealEntry[]> {
    return this.entries;
  }

  async getAllPublicMealEntries(): Promise<MealEntry[]> {
    return [];
  }
}
