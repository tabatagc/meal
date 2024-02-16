// mealEntryController.test.ts
import { MealEntryController } from '../../0_interfaces/http/controller/mealEntryController';
import { LogMealEntry } from '../../1_application/logMealEntry';
import { GetAllPublicMealEntries } from '../../1_application/getAllPublicMealEntries';
import { GetAllMealEntries } from '../../1_application/getAllMealEntries';
import { GetMealEntryById } from '../../1_application/getMealEntryById';
import { UpdateMealEntry } from '../../1_application/updateMealEntry';
import { InMemoryMealEntryRepository } from '../../3_infrastructure/inMemoryMealEntryRepository';

describe('MealEntryController', () => {
  let controller: MealEntryController;
  let logMealEntry: LogMealEntry;
  let getAllPublic: GetAllPublicMealEntries;
  let getAll: GetAllMealEntries;
  let getById: GetMealEntryById;
  let update: UpdateMealEntry;

  let repo: InMemoryMealEntryRepository;
  let mockCtx: any;

  beforeEach(() => {
    repo = new InMemoryMealEntryRepository();
    logMealEntry = new LogMealEntry(repo);
    controller = new MealEntryController(logMealEntry,getAllPublic,getAll, getById,update);
    mockCtx = { request: { body: {} }, response: {}, state: {} };
  });

  it('should add a meal entry', async () => {
    mockCtx.request.body = {
      userId: 'test-user',
      description: 'Delicious pizza',
      timestamp: new Date().toISOString(),
      isPublic: true,
    };

    await controller.addMealEntry(mockCtx as any);

    expect(mockCtx.status).toBe(201);
    expect(mockCtx.body).toBeDefined();
    expect(mockCtx.body.message).toBe('Meal entry added successfully');
  });

  // Adicione mais testes conforme necessário
});
