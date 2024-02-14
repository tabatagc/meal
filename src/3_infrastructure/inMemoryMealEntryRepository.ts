//3_infrastructure/inMemoryMealEntryRepository
import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class InMemoryMealEntryRepository implements MealEntryRepository {
  private entries: MealEntry[] = [];

  async addMealEntry(mealEntry: MealEntry): Promise<MealEntry> {
    this.entries.push(mealEntry);
    return mealEntry;
  }

  async getAllPublicMealEntries(): Promise<MealEntry[]> {
    return [];
  }

  async getAllMealEntries(): Promise<MealEntry[]> {
    return this.entries;
  }

  async find(id: string): Promise<MealEntry | undefined> {
    return this.entries.find(entry => entry.id === id);
  }
  
  async update(id: string, mealEntryData: Partial<MealEntry>): Promise<MealEntry> {
    const entryIndex = this.entries.findIndex(entry => entry.id === id);
    if (entryIndex === -1) {
      throw new Error('Meal entry not found');
    }
    const updatedEntry: MealEntry = { ...this.entries[entryIndex], ...mealEntryData };
    this.entries[entryIndex] = updatedEntry;
    return updatedEntry;
  }
}
