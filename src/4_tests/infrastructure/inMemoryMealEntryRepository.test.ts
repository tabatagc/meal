// tests/infrastructure/inMemoryMealEntryRepository.test.ts
import { InMemoryMealEntryRepository } from '../../3_infrastructure/inMemoryMealEntryRepository';

describe('InMemoryMealEntryRepository', () => {
  it('should add a meal entry', async () => {
    const repo = new InMemoryMealEntryRepository();
    const mealEntry = {
      id: '1',
      userId: 'user1',
      description: 'test meal',
      timestamp: new Date(),
      isPublic: true,
    };

    const result = await repo.addMealEntry(mealEntry);
    expect(result).toEqual(mealEntry);
  });
});
