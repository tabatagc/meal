export interface MealEntryRepository {
  addMealEntry(mealEntry: MealEntry): Promise<MealEntry>;
}
