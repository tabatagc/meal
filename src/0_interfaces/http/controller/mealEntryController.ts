//0_interfaces/http/controller/mealEntryController
import type { Context } from 'koa';
import type { MealEntryRepository } from '../../../2_domain/mealEntryRepository';
import { GetAllMealEntries } from '../../../1_application/getAllMealEntries';

export class MealEntryController {
  constructor(private getAllMealEntries: GetAllMealEntries) {}

  public async getAll(ctx: Context): Promise<void> {
    const mealEntries = await this.getAllMealEntries.execute();
    ctx.body = mealEntries;
  }
}
