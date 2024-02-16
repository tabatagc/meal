// tests/application/logMealEntry.test.ts

import { LogMealEntry } from '../../1_application/logMealEntry';
import { InMemoryMealEntryRepository } from '../../3_infrastructure/inMemoryMealEntryRepository';

describe('LogMealEntry', () => {
  it('should log a meal entry successfully', async () => {
    const repo = new InMemoryMealEntryRepository();
    const logMealEntry = new LogMealEntry(repo);
    const mealEntryData = {
      userId: 'user1',
      description: 'test meal',
      timestamp: new Date().toISOString(),
      isPublic: true,
    };

    const result = await logMealEntry.execute(mealEntryData);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
  });

  it('should throw an error if meal entry data is invalid', async () => {
    const repo = new InMemoryMealEntryRepository();
    const logMealEntry = new LogMealEntry(repo);
    const mealEntryData = {
      userId: '',
      description: '',
      timestamp: 'invalid-date',
      isPublic: true,
    };

    await expect(logMealEntry.execute(mealEntryData)).rejects.toThrowError();
  });
});
