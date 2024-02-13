import {
  MealEntry,
  MealEntryRepository,
} from '../2_domain/mealEntryRepository';

export class LogMealEntry {
  constructor(private mealEntryRepository: MealEntryRepository) {}

  async execute(mealEntry: MealEntry): Promise<MealEntry> {
    // Aqui poderiam ser adicionadas validações ou lógicas de negócio adicionais
    return this.mealEntryRepository.addMealEntry(mealEntry);
  }
}
