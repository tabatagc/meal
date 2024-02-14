//1_application/logMealEntry
import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class LogMealEntry {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(mealEntry: MealEntry): Promise<MealEntry> {
    return this.mealEntryRepository.addMealEntry(mealEntry);
  }
}
