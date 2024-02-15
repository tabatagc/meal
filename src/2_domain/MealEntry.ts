//2_domain/mealEntry
export interface MealEntry {
  id?: string;
  userId: string;
  description: string;
  timestamp: Date;
  isPublic?: boolean;
}
