//1_application/getAllMealEntries
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';
import type { MealEntry } from '../2_domain/mealEntry';

export class GetAllMealEntries {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(): Promise<MealEntry[]> {
    return this.mealEntryRepository.getAllMealEntries();
  }
}
