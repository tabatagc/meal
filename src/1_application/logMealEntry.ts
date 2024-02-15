//1_application/logMealEntry
import type { MealEntryData } from '../2_domain/MealEntryData';
import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class LogMealEntry {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(mealEntryData: MealEntryData): Promise<MealEntry> {
    
    //validation
    const validationResult = this.isValidMealEntryData(mealEntryData);
    if (validationResult) {
      throw new Error(validationResult);
    }

    //mapper
    const mealEntry: MealEntry = {
      id: Math.random().toString(), 
      userId: mealEntryData.userId,
      description: mealEntryData.description,
      timestamp: new Date(mealEntryData.timestamp),
    };

    //add
    return this.mealEntryRepository.addMealEntry(mealEntry);
  }

  private isValidMealEntryData(mealEntryData: MealEntryData): string | null {

    if (!mealEntryData.description || mealEntryData.description.length === 0) {
      return "Description is required.";
    }
    if (mealEntryData.description.length > 255) {
      return "Description is too long.";
    }
    if (!mealEntryData.userId || mealEntryData.userId.length === 0) {
      return "UserId is required.";
    }    
    if (!mealEntryData.timestamp || isNaN(new Date(mealEntryData.timestamp).getTime())) {
      return "Invalid timestamp.";
    }
    if (new Date(mealEntryData.timestamp) > new Date()) {
      return "Timestamp cannot be in the future.";
    }

    return null;
  }
}


