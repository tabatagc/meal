import {
  MealEntry,
  MealEntryRepository,
} from '../2_domain/mealEntryRepository';

export class InMemoryMealEntryRepository implements MealEntryRepository {
  private entries: MealEntry[] = [];

  async addMealEntry(mealEntry: MealEntry): Promise<MealEntry> {
    this.entries.push(mealEntry);
    return mealEntry;
  }
}
