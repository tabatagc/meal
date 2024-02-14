// 1_application/updateMealEntry.ts

import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryData } from '../2_domain/mealEntryData';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class UpdateMealEntry {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(id: string, mealEntryData: Partial<MealEntryData>): Promise<MealEntry> {
    const mealEntryToUpdate = await this.mealEntryRepository.find(id);

    if (!mealEntryToUpdate) {
      throw new Error('Meal entry not found');
    }

    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);

    // if (mealEntryToUpdate.timestamp < oneMinuteAgo) {
    //   throw new Error('Meal entry is read only after the first minute');
    // }

    // if (mealEntryData.userId !== undefined) {
    //     updatedEntry.userId = mealEntryData.userId;
    //   }
    //   if (mealEntryData.description !== undefined) {
    //     updatedEntry.description = mealEntryData.description;
    //   }
    //   if (mealEntryData.timestamp !== undefined) {
    //     updatedEntry.timestamp = mealEntryData.timestamp;
    //   }
    return this.mealEntryRepository.update(id, mealEntryData);
  }
}
