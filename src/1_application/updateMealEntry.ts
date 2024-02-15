// 1_application/updateMealEntry.ts

import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryData } from '../2_domain/MealEntryData';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class UpdateMealEntry {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(id: string, mealEntryData: Partial<MealEntryData>): Promise<MealEntry> {
    
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);

    const mealEntryToUpdate = await this.mealEntryRepository.find(id);

    //validation
    const validationResult = this.isValidMealEntryUpdateData(mealEntryToUpdate, mealEntryData);
    if (validationResult) {
      throw new Error(validationResult);
    }

    //mapping new meal - //all fields are being validated, none will be empty!
    const mealEntry: MealEntry = {
      id: id ?? '',
      userId: mealEntryData.userId ?? '',
      description: mealEntryData.description ?? '',
      timestamp: oneMinuteAgo,
    };

    //update
    return this.mealEntryRepository.update(id, mealEntry);

  }

  private isValidMealEntryUpdateData(mealEntryToUpdate: MealEntry | undefined, mealEntryData: Partial<MealEntryData>): string | null {
    
    const now = new Date();

    if (!mealEntryToUpdate || mealEntryToUpdate.id) {
      return "Meal entry not found";
    }

    if (mealEntryData.timestamp !== undefined && new Date(mealEntryData.timestamp as string) > now) {
      return "Timestamp cannot be in the future.";
    }

    if (mealEntryToUpdate && mealEntryToUpdate.timestamp) {
      const oneMinuteAgo = new Date(now.getTime() - 60000);
      if (mealEntryToUpdate.timestamp < oneMinuteAgo) {
        return "Meal entry is read only after the first minute";
      }
    }

    if (!mealEntryData.userId) {
      return "UserId is required.";
    } 

    if (mealEntryData.description !== undefined && mealEntryData.description.length === 0) {
      return "Description is required.";
    }

    if (mealEntryData.description !== undefined && mealEntryData.description.length > 255) {
      return "Description is too long.";
    }

    if (mealEntryData.timestamp !== undefined && isNaN(new Date(mealEntryData.timestamp as string).getTime())) {
      return "Invalid timestamp.";
    }

    if (mealEntryData.timestamp !== undefined && new Date(mealEntryData.timestamp as string) > now) {
      return "Timestamp cannot be in the future.";
    }

    return null; 
  }
}
