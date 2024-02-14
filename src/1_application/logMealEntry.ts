//1_application/logMealEntry
import type { MealEntry } from '../2_domain/mealEntry';
import type { MealEntryRepository } from '../2_domain/mealEntryRepository';

export class LogMealEntry {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(mealEntryData: MealEntryData): Promise<MealEntry> {
    if (!this.isValidMealEntryData(mealEntryData)) {
      throw new Error('Invalid meal entry data');
    }

    const mealEntry: MealEntry = {
      id: Math.random().toString(), 
      userId: mealEntryData.userId,
      description: mealEntryData.description,
      timestamp: new Date(mealEntryData.timestamp),
    };

    return this.mealEntryRepository.addMealEntry(mealEntry);
  }

  private isValidMealEntryData(mealEntryData: MealEntryData): boolean {
    // Adicione sua lógica de validação aqui
    //return mealEntryData && mealEntryData.description && mealEntryData.timestamp;
    return true;
  }
}

export interface MealEntryData {
  userId: string;
  description: string;
  timestamp: string;
}
