// 1_application/getMealEntryById.ts
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';
import type { MealEntry } from '../2_domain/mealEntry';

export class GetMealEntryById {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(id: string): Promise<MealEntry | null> {
    const mealEntry = await this.mealEntryRepository.find(id);
    if (!mealEntry) {
      throw new Error('Meal entry not found');
    }
    return mealEntry;
  }
}
