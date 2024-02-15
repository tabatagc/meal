//3_infrastructure/inMemoryMealEntryRepository
import { METHODS } from 'http';
import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class InMemoryMealEntryRepository implements MealEntryRepository {
  private entries: MealEntry[] = [];

  async addMealEntry(mealEntry: MealEntry): Promise<MealEntry> {
    this.entries.push(mealEntry);
    return mealEntry;
  }

  async getAllPublicMealEntries(): Promise<MealEntry[]> {
    return this.entries.filter(entry => entry.isPublic === true);
  }

  async getAllMealEntries(): Promise<MealEntry[]> {
    return this.entries;
  }

  async find(id: string): Promise<MealEntry | undefined> {
    return this.entries.find(entry => entry.id === id);
  }
  
  async update(id: string, meal: Partial<MealEntry>): Promise<MealEntry> {
    const entryIndex = this.entries.findIndex(entry => entry.id === id);
    if (entryIndex === -1) {
      throw new Error('Meal entry not found');
    }
    
    //All fields are being validated, none will be empty!
    const updatedEntry: MealEntry = {
      id: id,
      userId: meal.userId ?? '',
      description: meal.description ?? '',
      timestamp: meal.timestamp ?? new Date(),
      isPublic : meal.isPublic
    };
    //   this.entries[entryIndex] = {
    //     ...this.entries[entryIndex],
    //     ...meal,
    //   };
  
    this.entries[entryIndex] = updatedEntry;
  
    return updatedEntry;
  }
  
  
}
